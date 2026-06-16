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
| On-device | Runtime / UI / key-display behavior | physical Stream Deck | Manual (no automated E2E runner) |

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

## CI Integration

There is **no CI pipeline** configured yet (no `.github/workflows/`). Until one exists:
- Run `npm test` and `npx tsc --noEmit` locally before every PR (Pre-Push Verification).
- Sentinel review (Method A sub-agent) is the merge gate.
- Flaky tests must be fixed immediately, not skipped.
