# Learnings — stream-deck-ical

> **This file is written by AI agents.** When you discover something about this project
> that isn't documented elsewhere, add it here. Do NOT write to AGENTS.md.
> Also log Sentinel rejection/correction pairs here (per the AGENTS.md Ratchet rule).
>
> Periodically, promote stable learnings into the appropriate companion doc
> (ARCHITECTURE.md, TESTING-STRATEGY.md, etc.). The **cross-plugin** knowledge base lives in
> the stream-deck-template repo's `LEARNINGS.md` (see DEVELOPMENT-WORKFLOW.md §Template Ecosystem).

## Format

```markdown
### [YYYY-MM-DD] Short description
**Context**: What were you doing when you discovered this?
**Learning**: What did you learn?
**Impact**: How should this affect future work?
```

## Known Gotchas (seeded from prior project notes)

| Symptom | Cause | Fix |
|---------|-------|-----|
| Key press not detected | Missing `onKeyUp` override | Add explicit `onKeyUp` in the action class |
| All-day recurring events leak through filter | `isAllDay` not preserved through expansion | Pass the flag through `expandRecurringEvent` / `processRecurringEvents` |
| State corrupts with 2+ buttons | Per-button data in instance fields | Use `Map` keyed by `action.id` (SingletonAction) |
| Outlook times wrong | Windows TZ name not mapped | Add mapping in `timezone-service.ts` |
| Buttons stuck on "Loading" | Startup cache race | `waitForCacheAndStart` polls every 500ms with `actionRef` fallback |
| Title shows too long | Duration multiplied by 1000 twice | `getTitleDisplayDuration()` returns seconds; multiply once |
| Debug panel always visible | Hardcoded `display:block` | Default `display:none`; show only when `isDebugMode` |
| Checkbox not visible in PI | Wrong SDPI HTML | `type="checkbox"` on parent div; label with a `<span>` |
| Button using a deleted calendar | Named calendar removed | Buttons auto-migrate to default via `migrateDeletedCalendars()` |

## Learnings

<!-- Add new learnings below this line, most recent first -->

### [2026-07-11] Log messages built from untrusted data are a CWE-117 forgery vector
**Context**: PR #86 (logger sanitization, following #71) and the R3 Sentinel review of it (SR-20260711-PR86-39115be) hardened `src/utils/logger.ts`.
**Learning**: Feed-controlled data (event titles, wrapped error text) reaches the log sink, so untrusted arguments are a CWE-117 log-forgery vector: a raw `\r`/`\n` in a non-Error argument can forge a fresh `[timestamp] [LEVEL]` record, so newlines in non-Error args must be escaped to their two-character literal forms and Error-stack continuation lines marked. Two throw-safety traps also surfaced: `String(x)` is NOT throw-safe for a null-prototype object or a throwing `toString` (fall back to `Object.prototype.toString.call`), and `Error.stack` is not guaranteed to be a string (a number or a throwing getter makes `raw.replace(...)` throw) — both must be guarded so the logger never throws. Redaction that must protect against forensic tampering has to be bounded to a single line (`[^\/\r\n]+`), or a greedy class crosses newlines and silently deletes genuine stack frames.
**Impact**: Any new log sink carrying feed data must route through the central sanitizer/`buildMessage` (never format-and-append ad hoc): that is the single place where newline escaping, control/spoof stripping, and home-path redaction are applied across all argument shapes. Do not re-add per-branch redaction — it re-opens the bypass the centralization closed.

### [2026-07-10] Sentinel rejection: fallback-path tests need discriminating oracles
**Context**: PR #46 (timezone-aware recurrence expansion) was REJECTED by Sentinel review SR-20260709-PR46-9dac11e.
**Learning**: The invalid-timezone fallback test asserted only `Array.isArray(expanded)` and `expanded.length === 0`; a mutation probe showed it stayed GREEN with the `isValidIANATimezone` guard deleted, because the crash path (invalid DateTime → rrulestr throws → catch) also returns `[]`. A 0-output oracle cannot discriminate "graceful fallback" from "crashed". Correction: assert exact NONZERO expected output through the fallback path (the reworked test pins 3 exact ISO instants + the logger.warn call) and mutation-verify (delete the guard → test must go RED).
**Impact**: Any test covering an error-fallback branch must use an oracle that fails when the branch is broken — verify with a quick mutation probe before committing.

### [2026-07-10] Recurrence must expand wall-clock in the event's timezone
**Context**: Issues #39 (weekly BYDAY events vanished) and #30 (1h off after DST) shared one root cause, fixed in PR #46.
**Learning**: Feeding rrule a UTC-component DTSTART breaks BYDAY for events whose local day differs from the UTC day (evening events in the Americas) and ignores DST when stepping weeks (Europe). The parser resolves `event.eventTimezone` (IANA) precisely so expansion can convert to wall-clock in that zone, expand naively, and convert occurrences back to real UTC.
**Impact**: Never do RRULE math on raw UTC components when the event has a timezone; regression fixtures exist at `__fixtures__/google-calendar/issue-39-evening-byday.ics` and `__fixtures__/outlook/issue-30-dst-weekly.ics`.

### [2026-07-10] Timer cleanup must not live only in onWillDisappear
**Context**: Issue #29 (100% CPU after macOS wake), fixed in PR #47.
**Learning**: The Stream Deck app can re-emit willAppear with NEW context IDs after wake without a matching willDisappear for the old IDs, so per-button timers whose only cleanup is onWillDisappear leak forever (each leaked 1s interval adds render/log work; calendarManager refCounts strand 10-min updaters too). Correction: a periodic orphan-reconciliation sweep compares tracked buttonStates against the SDK's action store (`streamDeck.actions.getActionById`) and reuses the disappear cleanup path.
**Impact**: Any per-context resource keyed by action id needs a reconciliation safety net, not just event-driven cleanup.

### [2026-06-16] Migrated to agents-template v0.16.0
**Context**: Adopted the agents-template governance system via the Migration path.
**Learning**: Workflow is now TDD-choreographed + Sentinel-gated on worktree branches; the
plugin's prior guidance moved from `.github/copilot-instructions.md` into AGENTS.md + `docs/`.
**Impact**: All future work must follow AGENTS.md (failing test first, Sentinel before merge,
no commits on `main`). The pre-release on-device test gate is HUMAN REQUIRED.
