# Architecture Decision Records — stream-deck-ical

> **Record every significant technical decision here.** When choosing between approaches,
> document what was chosen and why. This prevents future agents and developers from
> re-debating settled decisions or accidentally reversing them.
>
> Do NOT write decisions to AGENTS.md — they belong here.

## Format

```markdown
### ADR-NNN: Decision Title
**Date**: YYYY-MM-DD
**Status**: Proposed / Accepted / Superseded by ADR-NNN
**Context**: What problem or question prompted this decision?
**Decision**: What was decided?
**Alternatives considered**: What other options were evaluated?
**Consequences**: What are the trade-offs? What does this enable or prevent?
```

## Decisions

<!-- Add new decisions below this line, most recent first -->

### ADR-007: Adopt agents-template governance (TDD + Sentinel + worktrees)
**Date**: 2026-06-16
**Status**: Accepted
**Context**: The project's agent guidance lived in `AGENTS.md` + `.github/copilot-instructions.md`
with a lightweight, manual workflow and no enforced quality gate.
**Decision**: Migrate to agents-template v0.16.0 — strict TDD commit choreography, mandatory
Sentinel review (Method A sub-agent) before every merge, and worktree-per-task on `main`-protected branches.
**Alternatives considered**: (a) keep the lightweight process; (b) adopt the template but make
Sentinel manual/CI. Rejected to maximize release quality with low per-change overhead (Sentinel is
delta-scoped and fast-paths trivial/docs changes).
**Consequences**: Higher rigor and auditability; small ceremony per change. `copilot-instructions.md`
is now a pointer to AGENTS.md; project knowledge lives in AGENTS.md + `docs/`.

### ADR-006: Multi-calendar dedup by URL with reference counting
**Date**: 2026-02-01 (retroactive)
**Status**: Accepted
**Context**: Multiple buttons may reference the same iCal feed; naive per-button fetching would
duplicate network traffic and caches.
**Decision**: `calendar-manager.ts` keys caches by URL and reference-counts registered actions,
cleaning up a calendar when its last button disappears.
**Alternatives considered**: Per-button independent fetch/cache.
**Consequences**: Shared cache + automatic cleanup; manager must be the single registration point
(`registerAction(actionId, url, …)`).

### ADR-005: Map Windows timezone names to IANA for Outlook/O365
**Date**: 2026-02-01 (retroactive)
**Status**: Accepted
**Context**: Outlook/Office 365 emit Windows timezone names (e.g. "Eastern Standard Time"), often
quoted, which luxon/ical.js cannot resolve directly.
**Decision**: `timezone-service.ts` maps Windows TZ names to IANA via `windows-iana` before luxon conversion.
**Alternatives considered**: Assume UTC; ignore Outlook.
**Consequences**: Correct times across providers; the mapping table must be maintained as Windows adds zones.

### ADR-004: Build-time debug toggle via Rollup replace
**Date**: 2026-02-01 (retroactive)
**Status**: Accepted
**Context**: Verbose logging + the PI debug panel should ship only in debug builds.
**Decision**: `STREAMDECK_DEBUG` is replaced at build time by `@rollup/plugin-replace`; debug code
is dead-code-eliminated in production builds.
**Alternatives considered**: Runtime env/setting check.
**Consequences**: Zero runtime overhead in production; debug state is fixed at build time (rebuild to toggle).

### ADR-003: Each action explicitly overrides `onKeyUp()`
**Date**: 2026-02-01 (retroactive)
**Status**: Accepted
**Context**: The Stream Deck SDK does not route key events through inherited methods.
**Decision**: Every action class overrides `onKeyUp()` (delegating to `super`) rather than relying
on BaseAction inheritance.
**Alternatives considered**: Centralize key handling in BaseAction (does not work — events aren't dispatched).
**Consequences**: A small amount of boilerplate per action; reliable key handling. Removing an override
is a forbidden action (see AGENTS.md §NEVER).

### ADR-002: SingletonAction per-button state via `Map`
**Date**: 2026-02-01 (retroactive)
**Status**: Accepted
**Context**: A SingletonAction instance serves all buttons of its type; instance fields would be shared.
**Decision**: Store per-button state in a `Map<string, ButtonState>` keyed by `action.id`; methods take `actionId`.
**Alternatives considered**: One action instance per button (not how the SDK works).
**Consequences**: Correct multi-button behavior; all state access must go through the keyed Map.

### ADR-001: ical.js + rrule + luxon for calendar processing
**Date**: 2026-02-01 (retroactive)
**Status**: Accepted
**Context**: Need robust RFC 5545 parsing, recurrence expansion, and timezone handling across providers.
**Decision**: Parse with ical.js (Mozilla), expand recurrence with `rrule`, handle timezones with luxon.
**Alternatives considered**: Hand-rolled parsing; other iCal libraries.
**Consequences**: Mature, well-tested libraries; `rrule` emits harmless circular-dependency build warnings.
