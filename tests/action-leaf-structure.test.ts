/**
 * Structural guard for the decorator-free base-class pattern (#70.1, ADR-008).
 *
 * combined-action.ts, next-meeting.ts, and time-left.ts are @action-decorated
 * "leaf" classes: the SDK requires the decorator, but vitest's esbuild transform
 * throws `SyntaxError: Invalid or unexpected token` on the TC39 stage-3 decorator
 * syntax, so these files can never be imported into the test runtime (#53). All
 * behavior therefore lives in the decorator-free *-base.ts classes exercised by
 * tests/action-display-wiring.test.ts; each leaf is meant to carry nothing but the
 * mandatory `onKeyUp()` override (ADR-003) delegating to `super`.
 *
 * Because the leaf can't be imported, `Object.getOwnPropertyNames(prototype)`
 * can't be used to police it at runtime. Instead this file reads each leaf as
 * TEXT and asserts, structurally, that its class body declares exactly one
 * method — `onKeyUp` — and nothing else. A future edit that adds any other
 * method to a leaf (logic that would then be permanently unreachable by vitest,
 * silently reopening #53) fails this test.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const srcActionsDir = path.resolve(here, '../src/actions');

const LEAF_FILES = ['combined-action.ts', 'next-meeting.ts', 'time-left.ts'];

/** Strip block and line comments so prose in a JSDoc can't be mistaken for a method signature. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

/**
 * Extract the body of the first `export class ... { ... }` block, matching
 * brace depth so nested braces inside onKeyUp's own body don't truncate the
 * search early.
 */
function extractClassBody(src: string): string {
  const classStart = src.indexOf('export class');
  if (classStart === -1) {
    throw new Error('extractClassBody: no "export class" found');
  }
  const openBrace = src.indexOf('{', classStart);
  let depth = 0;
  for (let i = openBrace; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) {
        return src.slice(openBrace + 1, i);
      }
    }
  }
  throw new Error('extractClassBody: unbalanced braces');
}

/**
 * Matches the start of a method definition: optional modifiers, a name, a
 * parameter list, an optional return type, then the opening brace of the
 * method body. This intentionally matches ANY method a future edit might add
 * to the leaf (not just onKeyUp) — the assertion below requires exactly one.
 */
const METHOD_SIGNATURE =
  /^\s*(?:public\s+|private\s+|protected\s+|static\s+|override\s+|async\s+)*[A-Za-z_$][\w$]*\s*\([^)]*\)\s*(?::\s*[^{]+)?\{/gm;

describe('decorated leaf structural guard (#70.1)', () => {
  it.each(LEAF_FILES)('src/actions/%s declares exactly one method (onKeyUp) in its leaf class', (file) => {
    const src = readFileSync(path.join(srcActionsDir, file), 'utf8');
    const body = extractClassBody(stripComments(src));

    const methodStarts = body.match(METHOD_SIGNATURE) ?? [];

    // The ONLY method the leaf may declare is the mandatory onKeyUp() override
    // (ADR-003). Any additional method here compiles fine but is unreachable by
    // vitest (#53) — this guards against logic silently landing there.
    expect(methodStarts).toHaveLength(1);
    expect(methodStarts[0]).toMatch(/^\s*(?:public\s+|private\s+|protected\s+)?(?:override\s+)?async\s+onKeyUp\s*\(/);
  });
});
