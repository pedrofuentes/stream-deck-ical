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

### [2026-06-16] Migrated to agents-template v0.16.0
**Context**: Adopted the agents-template governance system via the Migration path.
**Learning**: Workflow is now TDD-choreographed + Sentinel-gated on worktree branches; the
plugin's prior guidance moved from `.github/copilot-instructions.md` into AGENTS.md + `docs/`.
**Impact**: All future work must follow AGENTS.md (failing test first, Sentinel before merge,
no commits on `main`). The pre-release on-device test gate is HUMAN REQUIRED.
