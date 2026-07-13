# Testing Strategy

> Extended testing context for AI agents. Referenced from AGENTS.md.
> **The TDD mandate (tests before implementation) is enforced in AGENTS.md and verified by Sentinel.**
> This document covers the details of HOW to test.

---

## Test Types

| Type | Purpose | Location | Runner |
|------|---------|----------|--------|
| Unit | Parsers, services, utils, action logic | `tests/*.test.ts` | Vitest |
| Integration | Full pipeline (fetch → parse → expand → render) | `tests/integration/` | Vitest |
| Structural / text-reading | Assert source structure that can't be imported (e.g. `@action`-decorated leaves) | `tests/action-leaf-structure.test.ts`, `tests/pi-url-parity.test.ts` | Vitest (reads file as text) |
| DOM | Property Inspector DOM logic (`renderCalendarList`) against a real `document` | `tests/pi-render.test.ts` | Vitest + `happy-dom` |
| On-device | Runtime / UI / key-display behavior | physical Stream Deck | Manual (no automated E2E runner) |

### Structural / text-reading tests

Some code cannot be imported into the Vitest runtime. The `@action`-decorated leaf classes throw
`SyntaxError` under esbuild (see ADR-008), and `pi/setup.js` is plain browser JS with no module
system. These tests read the file as **text** and assert on its structure instead of importing it:

- `tests/action-leaf-structure.test.ts` — reads each leaf (`combined-action.ts`, `next-meeting.ts`,
  `time-left.ts`), extracts the class body, and asserts it declares exactly one method: `onKeyUp`.
  This catches display logic that would silently land somewhere Vitest can never execute.
- `tests/pi-url-parity.test.ts` — asserts the URL helpers mirrored into `pi/setup.js` stay in
  parity with `src/utils/url-utils.ts` (and are declared exactly once — see the marker-block
  pattern below).

### DOM tests

`tests/pi-render.test.ts` opens with `// @vitest-environment happy-dom` (a real devDependency,
`happy-dom` in `package.json`) so the Property Inspector's `renderCalendarList` — which builds DOM
via `createElement`/`textContent`/`dataset` — runs against a real `document`. It pins the DOM-XSS
fix (#67) by feeding malicious calendar names/URLs and asserting no script injection.

Provider quirks are covered by real fixtures under
`__fixtures__/{google-calendar,outlook,apple}/` — prefer realistic, anonymized `.ics`
fixtures over hand-built mocks, and include `PRODID` so provider detection is exercised.

## Coverage Requirements

- **New code**: ≥80% diff coverage **required** (lines added/modified in the PR).
- **Project-wide coverage**: must never decrease from the previous merge baseline (Ratchet).
- **Critical paths**: recurrence expansion, timezone conversion, all-day detection — keep high
  coverage; add a regression test for every bug fix.
- **Run coverage**: `npm run test:coverage` (Vitest `v8` provider; excludes `**/*.test.ts`,
  `__fixtures__/`, `dist/`, `node_modules/`).
- Sentinel enforces **≥80% diff coverage** on every PR (`vitest.config.ts` sets no numeric
  threshold of its own, so Sentinel's diff-coverage check is the gate).

## Test-Only PRs

PRs that only add tests to existing (untested) code use commit type `test(scope)` and are
exempt from test-first choreography ordering (there is no `feat`/`fix` to follow). Sentinel
verifies the tests are meaningful and pass.

## Testing Patterns

### Mocking
Mock the network (`fetch`) and silence the logger; drive parsing/recurrence/timezone logic
with real fixtures.

```typescript
import { vi, describe, it, expect } from 'vitest';

vi.mock('../src/utils/logger', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  isDebugMode: vi.fn(() => true),
}));

// Network: stub global fetch with a fixture body
globalThis.fetch = vi.fn(async () =>
  new Response(await readFixture('outlook/recurring.ics'), { status: 200 }),
) as unknown as typeof fetch;
```

### Test Naming
```typescript
describe('recurrence-expander', () => {
  it('preserves the isAllDay flag through RRULE expansion', () => {
    // Arrange → Act → Assert
  });
});
```

### What Must Be Tested
- All public service/util functions and action display logic
- Error/edge paths: network failure, malformed iCal, DST transitions, folded lines, escaped text
- Recurring events (RRULE / EXDATE / RECURRENCE-ID) and all-day detection
- Provider differences (Google / Outlook / Apple) via fixtures

### What Should NOT Be Tested
- Framework internals or third-party library behavior
- Implementation details (test behavior, not structure)

### Mutation-probe discipline

For any security or correctness **guard**, prove the test actually discriminates: in the working
tree, delete (or invert) the guard and confirm a test goes **RED** before committing. A test whose
oracle can't tell "guard present" from "guard removed" is non-discriminating and gives false
assurance — this was the campaign's core review-quality rule. It mirrors the LEARNINGS entry on
discriminating fallback oracles. The probe is a manual, uncommitted step; note in the test's
header (as `tests/pi-render.test.ts` does) that the discriminating check was performed and how.

### Marker-block extraction for plain-JS PI code

`pi/setup.js` is loaded directly by the Property Inspector webview and has no module system, so it
cannot import TypeScript sources — it hand-mirrors small pieces of `src/` logic (URL utilities,
`renderCalendarList`) inside `// BEGIN mirror:<label>` / `// END mirror:<label>` comment markers.
`tests/helpers/mirror-block.ts` (`extractMirrorBlock(label)`) reads `pi/setup.js`, slices out the
marked span, and the test evaluates it in isolation (injecting `document`, `calendars`, etc. as
`Function` parameters).

**Shadowing pitfall:** a duplicate definition **outside** the markers can make the extracted block
pass vacuously (the real code path is never what the test exercised). Guard against it two ways:
`extractMirrorBlock` asserts each BEGIN/END marker appears **exactly once** (a stray pair would
silently change the extracted span), and `tests/pi-url-parity.test.ts` asserts the mirrored symbol
is declared exactly once in `pi/setup.js` (#66).

### `noImplicitOverride` as a static regression net

`tsconfig.json` sets `"noImplicitOverride": true`. Every subclass hook that overrides a base method
(`cleanupButtonState`, `onKeyUp`, `updateDisplay`, …) must carry the `override` keyword, so a
mistyped or renamed hook — which would silently **detach** from the base contract and stop being
called — fails `npx tsc --noEmit` instead of shipping. This is a compile-time complement to the
structural leaf test above.

## CI Integration

There is **no CI pipeline** configured yet (no `.github/workflows/`). Until one exists:
- Run `npm test` and `npx tsc --noEmit` locally before every PR (Pre-Push Verification).
- Sentinel review (Method A sub-agent) is the merge gate.
- Flaky tests must be fixed immediately, not skipped.
