/**
 * Shared helper for extracting a marker-delimited "mirror" block from
 * pi/setup.js.
 *
 * pi/setup.js is plain JS loaded directly by the Property Inspector webview
 * and cannot import TypeScript sources (#49 item 1), so it hand-mirrors a
 * few small pieces of src/ logic (URL utilities, renderCalendarList) inside
 * `// BEGIN mirror:<label>` / `// END mirror:<label>` marker comments.
 * tests/pi-url-parity.test.ts and tests/pi-render.test.ts both extracted
 * this block via a verbatim-duplicated helper (#89 item 3) — this module is
 * the single shared implementation both files import.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETUP_JS_PATH = path.join(__dirname, '../../pi/setup.js');

/**
 * Count non-overlapping occurrences of `needle` in `haystack`.
 */
function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    count++;
    idx = haystack.indexOf(needle, idx + needle.length);
  }
  return count;
}

/**
 * Extract the `// BEGIN mirror:<label>` / `// END mirror:<label>` delimited
 * block from pi/setup.js.
 *
 * Asserts each marker appears exactly once before extracting: `indexOf`
 * only ever finds the first occurrence, so a stray duplicate BEGIN/END pair
 * would otherwise silently change (or truncate) the extracted span instead
 * of failing loudly (#89 item 2).
 *
 * @param label - The mirror label, e.g. `'url-utils'` or `'render'`
 * @returns The exact source text between the BEGIN and END markers
 */
export function extractMirrorBlock(label: string): string {
  const beginMarker = `// BEGIN mirror:${label}`;
  const endMarker = `// END mirror:${label}`;
  const source = readFileSync(SETUP_JS_PATH, 'utf-8');

  const beginCount = countOccurrences(source, beginMarker);
  const endCount = countOccurrences(source, endMarker);
  if (beginCount !== 1 || endCount !== 1) {
    throw new Error(
      `pi/setup.js must contain exactly one "${beginMarker}" and one "${endMarker}" marker ` +
      `(found ${beginCount} BEGIN, ${endCount} END) — a duplicate marker pair would silently ` +
      'change the extracted span instead of failing loudly (#89 item 2).'
    );
  }

  const beginIdx = source.indexOf(beginMarker);
  const endIdx = source.indexOf(endMarker);
  if (endIdx < beginIdx) {
    throw new Error(`pi/setup.js: "${endMarker}" appears before "${beginMarker}".`);
  }

  return source.slice(beginIdx + beginMarker.length, endIdx);
}
