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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETUP_JS_PATH = path.join(__dirname, '../pi/setup.js');
const BEGIN_MARKER = '// BEGIN mirror:url-utils';
const END_MARKER = '// END mirror:url-utils';

interface MirroredUrlUtils {
  normalizeICalUrl: (url: string) => string;
  isValidURL: (url: string) => boolean;
}

function extractMirrorBlock(): string {
  const source = readFileSync(SETUP_JS_PATH, 'utf-8');
  const beginIdx = source.indexOf(BEGIN_MARKER);
  const endIdx = source.indexOf(END_MARKER);

  if (beginIdx === -1 || endIdx === -1 || endIdx < beginIdx) {
    throw new Error(
      `pi/setup.js is missing the "${BEGIN_MARKER}" / "${END_MARKER}" markers ` +
      'that delimit the mirrored URL utilities (#49 item 1).'
    );
  }

  return source.slice(beginIdx + BEGIN_MARKER.length, endIdx);
}

function loadMirroredFunctions(): MirroredUrlUtils {
  const block = extractMirrorBlock();
  // Evaluate the marked block in isolation: it must be pure (no DOM access)
  // so it can run outside a browser/webview context.
  const factory = new Function(`${block}\nreturn { normalizeICalUrl, isValidURL };`);
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
});
