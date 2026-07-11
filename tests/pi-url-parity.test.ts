/**
 * Parity test for the pi/setup.js hand-mirrored URL utilities.
 *
 * pi/setup.js is plain JS loaded directly by the Property Inspector webview
 * and cannot import src/utils/url-utils.ts (#43, #49 item 1). It hand-mirrors
 * `normalizeICalUrl` and an `isValidURL` equivalent of `isSupportedICalUrl`.
 * This test extracts the mirrored block (delimited by
 * `// BEGIN mirror:url-utils` / `// END mirror:url-utils` markers), evaluates
 * it in isolation (no DOM access required), and asserts identical output to
 * the real implementation across a fixture list — catching drift instead of
 * relying on manual review.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { normalizeICalUrl, isSupportedICalUrl } from '../src/utils/url-utils.js';
import { extractMirrorBlock } from './helpers/mirror-block.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETUP_JS_PATH = path.join(__dirname, '../pi/setup.js');
const BEGIN_MARKER = '// BEGIN mirror:url-utils';
const END_MARKER = '// END mirror:url-utils';

interface MirroredUrlUtils {
  normalizeICalUrl: (url: string) => string;
  isValidURL: (url: string) => boolean;
}

function loadMirroredFunctions(): MirroredUrlUtils {
  const block = extractMirrorBlock('url-utils');
  // Evaluate the marked block in isolation: it must be pure (no DOM access)
  // so it can run outside a browser/webview context. 'use strict' turns an
  // accidental write to an undeclared name into a thrown ReferenceError
  // instead of a silently-created global (#89 item 1).
  const factory = new Function(`'use strict';\n${block}\nreturn { normalizeICalUrl, isValidURL };`);
  return factory() as MirroredUrlUtils;
}

describe('pi/setup.js url-utils mirror parity (#49 item 1)', () => {
  const fixtures = [
    'webcal://example.com/cal.ics',
    'webcals://example.com/cal.ics',
    'WEBCAL://example.com/cal.ics',
    'https://example.com/cal.ics',
    'http://example.com/cal.ics',
    'ftp://example.com/cal.ics',
    'file:///etc/passwd',
    'not-a-url',
    '',
    '   https://example.com/cal.ics   '
  ];

  // Non-string fixtures (#65, #66 companion): the TS side treats these as
  // pass-through/reject rather than throwing; the PI mirror must match.
  const nonStringFixtures: unknown[] = [null, undefined, 42];

  let mirrored: MirroredUrlUtils;

  beforeAll(() => {
    mirrored = loadMirroredFunctions();
  });

  it('the mirrored block is pure and evaluates without DOM access', () => {
    expect(() => loadMirroredFunctions()).not.toThrow();
  });

  it.each(fixtures)('normalizeICalUrl(%j) matches src/utils/url-utils.ts', (fixture) => {
    expect(mirrored.normalizeICalUrl(fixture)).toBe(normalizeICalUrl(fixture));
  });

  it.each(fixtures)('isValidURL(%j) matches isSupportedICalUrl(...)', (fixture) => {
    expect(mirrored.isValidURL(fixture)).toBe(isSupportedICalUrl(fixture));
  });

  it.each(nonStringFixtures)('normalizeICalUrl(%j) matches src/utils/url-utils.ts for non-string input (#65, #66)', (fixture) => {
    expect(mirrored.normalizeICalUrl(fixture as unknown as string)).toBe(normalizeICalUrl(fixture as unknown as string));
  });

  it.each(nonStringFixtures)('isValidURL(%j) matches isSupportedICalUrl(...) for non-string input (#65, #66)', (fixture) => {
    expect(mirrored.isValidURL(fixture as unknown as string)).toBe(isSupportedICalUrl(fixture as unknown as string));
  });

  it('declares normalizeICalUrl and isValidURL exactly once each, both inside the marker block (#66)', () => {
    const source = readFileSync(SETUP_JS_PATH, 'utf-8');
    const beginIdx = source.indexOf(BEGIN_MARKER);
    const endIdx = source.indexOf(END_MARKER);
    expect(beginIdx).toBeGreaterThan(-1);
    expect(endIdx).toBeGreaterThan(beginIdx);

    // Full-source scan (not just the extracted block): a second declaration
    // placed AFTER the END marker would shadow the mirrored one at webview
    // runtime (last function declaration wins) while leaving the extracted
    // block itself untouched — a mutation-confirmed vacuous-pass gap (#66).
    const normalizeMatches = [...source.matchAll(/function\s+normalizeICalUrl\s*\(/g)];
    const isValidMatches = [...source.matchAll(/function\s+isValidURL\s*\(/g)];

    expect(normalizeMatches).toHaveLength(1);
    expect(isValidMatches).toHaveLength(1);

    const [normalizeMatch] = normalizeMatches;
    const [isValidMatch] = isValidMatches;
    expect(normalizeMatch.index).toBeGreaterThan(beginIdx);
    expect(normalizeMatch.index).toBeLessThan(endIdx);
    expect(isValidMatch.index).toBeGreaterThan(beginIdx);
    expect(isValidMatch.index).toBeLessThan(endIdx);
  });
});
