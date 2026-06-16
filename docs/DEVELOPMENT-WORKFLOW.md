# Development Workflow

> Extended workflow context for AI agents. Referenced from AGENTS.md.
> **The MUST rules (TDD, branching, worktrees, incremental development, Sentinel) are enforced in AGENTS.md.**
> This document covers the detailed HOW.

---

## Git Worktrees for Isolation

Every increment MUST use a git worktree for isolation:

```bash
# Fetch latest main, create worktree with new branch
git fetch origin main
git worktree add .worktrees/feature-name -b feature/feature-name main

# Change into the worktree
cd .worktrees/feature-name

# If worktree already exists (retry/recovery), just cd into it
# git worktree list  # check existing worktrees

# List active worktrees
git worktree list

# Remove a worktree when done (after merge — cd back to main worktree first)
cd <main-worktree-root>
git worktree remove .worktrees/feature-name
git branch -D feature/feature-name
```

### Why Worktrees Are Required
- Prevents interference between parallel work
- Each agent/increment has a clean working directory
- No risk of uncommitted changes from one task affecting another
- Easy cleanup after merge

## Branching Details

### Branch Lifecycle
1. Fetch latest: `git fetch origin main`
2. Create worktree + branch from `main`: `git worktree add .worktrees/name -b feature/name main && cd .worktrees/name`
3. TDD: write failing tests, implement, refactor
4. Commit following the format in AGENTS.md
5. Push branch: `git push -u origin feature/name`
6. Open PR: `gh pr create` or via GitHub UI
7. Invoke Sentinel for review
8. Address any Sentinel feedback, re-submit
9. On Sentinel approval, merge to `main`
10. Cleanup: `cd <main-root> && git worktree remove .worktrees/name && git branch -D feature/name`

### Branch Naming Convention
| Prefix | Use For |
|--------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `refactor/` | Code refactoring |
| `docs/` | Documentation changes |
| `test/` | Test additions or fixes |
| `chore/` | Build, CI, dependency updates |

## Pull Request Process

### Before Opening a PR
1. All tests pass in the worktree
2. Linting passes
3. Commit messages follow the format
4. PR represents a single logical unit

### PR Title Format
`type(scope): Short description`

### Sentinel Review
→ See [`docs/SENTINEL.md`](./SENTINEL.md) for the full process and invocation methods.

### After Merge
```bash
cd <main-worktree-root>
git worktree remove .worktrees/feature-name
git branch -D feature/name
git pull origin main
```
- Start next increment from the plan
- If other worktrees are in progress, rebase them: `cd .worktrees/other && git fetch origin main && git rebase origin/main`

## Sub-Agent Delegation

### When to Delegate
- Complex research that requires deep analysis
- Documentation generation
- Test data creation or fixture generation
- Performance profiling and optimization analysis
- Security vulnerability assessment

### How to Delegate
- Provide the sub-agent with full context (requirements, constraints, relevant code)
- Each sub-agent works in its own context
- Integrate sub-agent output back into the main work
- All sub-agent output must follow AGENTS.md rules

## Environment Setup

- **Node.js 20+** (Stream Deck Node.js runtime) · **npm** · **Git** · **Elgato Stream Deck 6.0+** (for on-device testing).
- Install: `npm install`. Dev build: `npm run build`. Watch: `npm run watch`. Clean: `npm run clean`.
- Link the dev plugin once: `npm run streamdeck:link` (or `npm run dev`); restart after a rebuild: `npm run streamdeck:restart`.
- Debug mode is a **build-time** toggle: `STREAMDECK_DEBUG=1 npm run build` enables TRACE logging + the PI debug panel (Rollup replaces `process.env.STREAMDECK_DEBUG` at build time). Use `STREAMDECK_DEBUG=0` for normal builds.
- Build output: `dist/com.pedrofuentes.ical.sdPlugin/` (dev) or `release/com.pedrofuentes.ical.sdPlugin/` (production).

## Release Process

> **Pre-release gate (HUMAN REQUIRED — see AGENTS.md):** never tag, push, or publish a
> release until the user has tested the build on a physical Stream Deck. The Stream Deck
> CLI validates only manifest schema + plugin loading — never runtime/UI/key-display behavior.

1. Bump version in **both** `manifest.json` (`"Version": "X.Y.Z.0"`, 4-part) and `package.json` (`"version": "X.Y.Z"`, 3-part) — they must match.
2. `npm test` green · `npx tsc --noEmit` clean · README/CHANGELOG updated.
3. `npm run build:production`, then `streamdeck pack release/com.pedrofuentes.ical.sdPlugin --output release`. **Never** zip manually (`Compress-Archive` produces invalid packages).
4. Tag `vX.Y.Z`, push, and `gh release create` with the `.streamDeckPlugin` package attached. Use `Closes #NN` keywords to auto-close issues.
5. Post-release: update the Elgato Marketplace listing — see [`content/CONTENT-GUIDE.md`](../content/CONTENT-GUIDE.md); run `npm run content:assets` if the key display changed.

## Stream Deck Template Ecosystem

This plugin participates in the **stream-deck-template** knowledge-sharing ecosystem
(<https://github.com/pedrofuentes/stream-deck-template>).

- **Before major work**, read the consolidated `LEARNINGS.md` from the template:
  `https://raw.githubusercontent.com/pedrofuentes/stream-deck-template/main/LEARNINGS.md`
  (SVG rendering, OLED-tested palettes, Property Inspector patterns, polling, testing helpers,
  a 23+ entry common-mistakes table). Companion guides:
  `scaffold/.github/TESTING-PROTOCOL.md` and `scaffold/.github/UI-DESIGN-GUIDE.md`.
- **After significant work**, proactively offer to contribute learnings back to
  `contributions/ical.md` in the template repo (commit `docs(ical): add learnings about <topic>`).
  Contribute reusable patterns/SDK quirks; do NOT contribute plugin-specific business logic.

> Note: this repo's own `LEARNINGS.md` (root) is for Sentinel/TDD rejection patterns; the
> template's `LEARNINGS.md` is the cross-plugin knowledge base. Keep them distinct.
