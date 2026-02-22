# Agent Instructions for Stream Deck iCal Plugin

This document provides guidance for AI agents working on this codebase.

## Project Context

This is a Stream Deck plugin that displays iCal calendar events. See `.github/copilot-instructions.md` for detailed SDK patterns, common issues, and project-specific guidance.

## Key Files

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | SDK patterns, common issues, release process |
| `src/actions/base-action.ts` | Base class with per-button state management |
| `src/services/calendar-manager.ts` | Multi-calendar support with reference counting |
| `src/services/recurrence-expander.ts` | RRULE expansion and RECURRENCE-ID handling |
| `tests/` | Vitest test files |
| `__fixtures__/` | Test fixtures organized by provider |

## Testing Requirements

Every code change MUST include corresponding tests:
- **New features**: Unit tests for happy path and edge cases
- **Bug fixes**: Regression tests that would have caught the bug
- **Refactoring**: Ensure existing tests pass

Always run `npm test` before completing work.

## Template Collaboration Protocol

This plugin is part of the **stream-deck-template** knowledge-sharing ecosystem.
All Stream Deck plugins share the same SDK, hardware constraints, and pitfalls.
Learnings discovered here benefit every other plugin.

- **Template repo**: https://github.com/pedrofuentes/stream-deck-template
- **This plugin's contributions**: `contributions/ical.md` in the template repo
- **Consolidated knowledge**: `LEARNINGS.md` in the template repo

### Reading Knowledge From the Template

Before starting major work on a new feature, refactor, or release, fetch and read
the latest `LEARNINGS.md` from the template:

```
https://raw.githubusercontent.com/pedrofuentes/stream-deck-template/main/LEARNINGS.md
```

This contains detailed, code-level patterns for:
- SVG rendering compatibility and OLED-tested color palettes
- Property Inspector patterns (popup windows, dropdown hydration, FilterableSelect, settings race conditions)
- Architecture patterns (global settings pub/sub, service layer isolation, PollingCoordinator, resource managers)
- Adaptive polling, rate limit handling, key-press cycling, short/long press detection
- Marquee animations, compact number formatting, accent bar layout, viewport-aware dropdowns
- Testing patterns (singleton store resets, fixture organization, SVG assertion helpers)
- Build pipeline, validate:consistency script, release checklist, PI verification gate
- Common mistakes table with 23+ entries

### Contributing Knowledge Back

After completing significant work, **proactively offer** to contribute new learnings
to the template. This is expected — not optional.

**How:**
1. Fetch the template's contribution file for this plugin:
   `https://raw.githubusercontent.com/pedrofuentes/stream-deck-template/main/contributions/ical.md`
2. Read it to understand what has already been contributed
3. Write new findings using the format below
4. Push to the template repo (clone it, or ask the user to switch workspaces)
5. Commit with: `docs(ical): add learnings about <topic>`

**Contribution format:**
```markdown
## [Category] — [Short Title]

**Discovered in**: ical
**Date**: <date>
**Severity**: critical | important | nice-to-know

**Problem**: What went wrong or what was unclear
**Solution**: What fixed it
**Code example** (if applicable)
**Prevention**: How to avoid this in the future
```

**When to offer a contribution:**
- After solving a non-obvious bug or hardware quirk
- After implementing a reusable pattern (polling, caching, UI component)
- After discovering a manifest or SDK constraint
- After a release (summarize what was learned)
- After refactoring something that other plugins also have
- When the session is wrapping up and the user asks "anything else?"

**When NOT to contribute:**
- Plugin-specific business logic (API response parsing unique to this plugin)
- Trivial fixes that don't generalize
- Things already covered in `LEARNINGS.md`

### Checking for Updates From Other Plugins

Other plugins may have discovered patterns that help this one. Before a release
or when troubleshooting, check if `LEARNINGS.md` has new entries by fetching and
scanning the sections relevant to the current task.

### Template Companion Guides

The template also maintains merged guides that this plugin may benefit from:

| Guide | URL |
|-------|-----|
| Testing Protocol | `https://raw.githubusercontent.com/pedrofuentes/stream-deck-template/main/scaffold/.github/TESTING-PROTOCOL.md` |
| UI/UX Design Guide | `https://raw.githubusercontent.com/pedrofuentes/stream-deck-template/main/scaffold/.github/UI-DESIGN-GUIDE.md` |

Read these before writing tests or making UI changes — they contain hardware-tested
patterns and failure logs from multiple plugins.
