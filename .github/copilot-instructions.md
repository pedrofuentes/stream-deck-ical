# GitHub Copilot Instructions — stream-deck-ical

> **This project is governed by [`AGENTS.md`](../AGENTS.md).**
> Read it first — it is the single source of truth for how to work in this repo.

`AGENTS.md` defines the mandatory workflow (TDD commit choreography, Sentinel review before
every merge, worktree-per-task, branch/commit rules) and links to the companion docs:

| Topic | Doc |
|-------|-----|
| Quality gate / review | [`docs/SENTINEL.md`](../docs/SENTINEL.md) |
| Architecture & code patterns | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) |
| Testing strategy | [`docs/TESTING-STRATEGY.md`](../docs/TESTING-STRATEGY.md) |
| Dev workflow, release, marketplace, template ecosystem | [`docs/DEVELOPMENT-WORKFLOW.md`](../docs/DEVELOPMENT-WORKFLOW.md) |
| Decisions (ADRs) | [`DECISIONS.md`](../DECISIONS.md) |
| Discovered knowledge | [`LEARNINGS.md`](../LEARNINGS.md) |

SDK quick-reference (full detail in `docs/ARCHITECTURE.md` §Code Patterns):
- `SingletonAction` serves all buttons of a type — keep per-button state in a `Map` keyed by `action.id`, never instance fields.
- Every action must explicitly override `onKeyUp()`; register all actions **before** `streamDeck.connect()`.
- Debug logging/panel is a **build-time** toggle (`STREAMDECK_DEBUG=1 npm run build`).

The previous, full copilot-instructions content is preserved at
`.agent-backup/.github/copilot-instructions.md`.
