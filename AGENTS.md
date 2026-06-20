# AGENTS.md — stream-deck-ical

<!-- agents-template v0.18.0 -->

<role>You write tests before code, work in isolated worktree branches, and never merge without Sentinel review. These rules are enforced mechanically — Sentinel verifies compliance on every PR and non-compliant work is rejected.</role>

<invariants>
1. No behavior-bearing code without a failing test commit first (scaffolding, config, types, docs are exempt — see Commit Choreography §Exemptions)
2. No merge to `main` without Sentinel APPROVED or CONDITIONAL verdict
3. No commits land on `main` — all work happens on worktree branches
</invariants>

**Check invariants before every tool call that writes, commits, or merges.**

## Project Overview

**stream-deck-ical** — An Elgato Stream Deck plugin that displays iCal calendar events with live countdowns and color cues that help you end meetings on time and be ready for the next one.

- **Tech stack**: TypeScript (strict), Node.js, @elgato/streamdeck SDK, ical.js, rrule, luxon, windows-iana — versions: TypeScript ^5.3, Node 20+, @elgato/streamdeck ^2.1, Vitest ^4.1, Rollup ^4.62
- **Package manager**: npm | **Module system**: ES modules (`"type": "module"`; bundled to CJS for the Stream Deck runtime via Rollup)

## Commands

```bash
npm test -- <path>          # file-scoped tests (prefer)
npm test                    # full Vitest suite
npx tsc --noEmit            # typecheck — static gate (no linter/formatter configured)
npm run build | npm run build:production   # dev / production build (Rollup)
```

## Autonomous Workflow — REQUIRED

### Plan → Approve → Execute Loop
1. **Receive task** → break into small logical units (1 PR each) → output numbered plan
2. Determine mode from invocation context:
   - **Interactive** (default): print _"Plan ready for review."_ and wait for explicit user approval.
   - **Autopilot** (user said "autopilot" / "proceed" / "go ahead without asking"): save plan to `PLAN.md`, continue. This ONLY bypasses plan approval — Sentinel, Pre-Merge Checklist, and ASK FIRST still apply.
3. **Execute** each increment following all rules below

### Per-Increment Execution
1. `git worktree add .worktrees/<name> -b <branch> main && cd .worktrees/<name>`
2. Write failing test(s). Commit as `test(scope): ...`. Run suite — confirm FAIL.
3. Write minimal impl. Commit as `feat|fix(scope): ...`. Run suite — confirm PASS.
4. Run Pre-Push Verification (below). Push branch, open PR. **Delegated implementers stop here** — report PR URL + HEAD SHA to parent; do not invoke Sentinel or merge.
5. Invoke Sentinel (§How to Invoke). Follow §After Sentinel for verdict-specific action.

### Pre-Push Verification (before opening PR)
Catches ~35% of Sentinel rejections — run before every push:
1. `git log --oneline main..HEAD` — verify `test(scope)` precedes `feat|fix(scope)`
2. `npm test` — full suite green on final HEAD
3. `npx tsc --noEmit` — zero type errors (no linter configured; TypeScript strict is the static gate)
4. Optional: `gitleaks detect --source .` (secrets), `semgrep --config=auto` (SAST)
5. All pass → push. Any failure → fix locally before PR (cheaper than a Sentinel cycle).

### Testing & Iteration
Create ONE testing worktree: `git worktree add .worktrees/test-scope -b test/scope-testing main`. Commit fixes freely. Run Sentinel **once** before merging. **If HEAD is `main`, create a worktree branch before any commits.**

## Test-Driven Development — REQUIRED

**TDD is non-negotiable — Sentinel rejects non-compliant code.**

1. **RED**: write test for new behavior, commit `test(scope): ...` (tests only). Run suite — MUST fail referencing the missing symbol/behavior. If it passes or errors unrelated to the SUT, rewrite it.
2. **GREEN**: write minimal impl, commit `feat|fix(scope): ...`. Run suite — ALL must pass. If one fails, fix impl — never fix tests to match broken impl.
3. **REFACTOR**: with the suite green after every change.

Artifact check: `git log --oneline` must show `test(scope)` before the corresponding `feat|fix(scope)` commit. The `test → fix` pair satisfies TDD ordering — it is compliant, not irregular, and MUST NOT be flagged.

### Commit Choreography — REQUIRED

| Order | Commit | Contains | Tests must... |
|-------|--------|----------|---------------|
| 1 | `test(scope): add failing tests` | Tests ONLY | FAIL |
| 2 | `feat\|fix(scope): implement` | Minimal impl | PASS |
| 3 | `refactor(scope): ...` | Optional cleanup | Stay green |

**Never combine test + implementation in one commit.** Sentinel verifies ordering. **Exemptions** (TDD ordering only — Sentinel review still required): `docs`, `chore`, `build`, `ci`, `refactor` (behavior-preserving: no new public API, no changed return values, no altered side effects — existing tests must pass unchanged), `style` — suite must still pass.

## Sentinel — MANDATORY Quality Gate

### Pre-Merge Checklist
**Before every `git merge` or PR-merge tool call, print this checklist and fill every box. Empty box → do not merge.**

```
Pre-Merge Checklist:
- [ ] Sentinel Report ID: ___
- [ ] Verdict: APPROVED / CONDITIONAL
- [ ] Reviewed SHA == HEAD: ___
- [ ] Mode: standard / standard (fast-path) / degraded (if degraded → user approval required)
- [ ] Sentinel invoked by non-author (invoker and reviewer are independent of code author): ___
```

### How to Invoke

Sentinel is required for ALL changes — 1-line fix, docs-only, config, dep bump, everything. User saying "merge" or "ship it" does NOT substitute. Never ask if Sentinel is needed.

1. Print _"Invoking Sentinel..."_ and issue the sub-agent tool call immediately — no permission request, no pre-summary.
2. Spawn a **full-capability** sub-agent (NOT fast/cheap/explore/haiku-class — Sentinel must be capable of spawning sub-agents and running commands) with `docs/SENTINEL.md` as system prompt. Provide PR diff (`git diff main...HEAD`), branch, PR number/URL (for report persistence), changed files, and open `sentinel:*` GitHub issues as known issues context.
3. **Do NOT review your own code.** 
4. **Verify the report & capture** — confirm the captured output is the FULL report (Phase 1 + Phase 2 Execution Log + Findings + Details) with `Mode:` and tool-returned agent IDs — not just a `Status:` line or one-sentence summary (a sign the platform truncated to a trailing summary). Missing report body, execution log, or Mode → re-invoke: _"Emit ONLY the Sentinel Report — no preamble or trailing summary."_
5. Follow §After Sentinel for the verdict. For REJECTED re-invocation: provide previous Report ID + fix delta (`git diff <prev-SHA>..HEAD`) for scoped re-review.

> No sub-agents? Run SENTINEL.md checks yourself — mark PR `⚠️ SELF-REVIEWED` (Mode: degraded) and require explicit user approval. **Delegated implementers may not use degraded mode — stop and report to parent instead.** Cannot run at all? **Do not merge** — escalate.

### After Sentinel

| Verdict | Action |
|---------|--------|
| APPROVED | Record Report ID + SHA in merge commit. File new 🟡/🟢 findings as issues (`sentinel:important`, `sentinel:minor`). |
| CONDITIONAL | File issues for all new 🟡/🟢 — do NOT fix in-PR. Link issues in PR, then merge. |
| REJECTED | Fix 🔴 blockers; do not independently fix 🟡/🟢. Re-commit, re-invoke. File 🟡/🟢 from final verdict report. Max 5 cycles. |

**Persist the report**: ensure the full Sentinel report is durably stored — Sentinel posts it to the PR (preferred); if it didn't, you persist it (PR review comment or committed `.sentinel/reports/<id>.md`) before merge. The merge commit's Report ID must resolve to that artifact.

**Ratchet**: coverage, test count, lint-clean, zero 🔴 — never decrease. Log violation/correction pairs in `LEARNINGS.md`.
**Pattern memory**: before each PR, read `LEARNINGS.md` for known Sentinel rejection patterns and self-check against them.

→ Full spec: [`docs/SENTINEL.md`](./docs/SENTINEL.md)

## Branching & Worktrees — REQUIRED

- **Never work on `main`**: `git fetch origin main && git worktree add .worktrees/name -b branch-name main && cd .worktrees/name`. Each task = its own worktree.
- Branch naming: `feature/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`
- **Cleanup after merge**: `git worktree remove .worktrees/name && git branch -D branch-name`

## Sub-Agents

Delegate for: research (>5 sources), docs (>100 words), test data, perf analysis, security review. Sub-agents do NOT inherit this file — copy TDD rules, Boundaries, and the Delegated Implementation rule into the prompt.

**Delegated implementation** (any sub-agent that edits files, commits, or opens a PR is a delegated implementer): code → test → pre-push verify → push → open PR, then **stop** (report PR URL + HEAD SHA). Parent invokes Sentinel independently per PR before merging. Sub-agent Sentinel self-reports are invalid (§Do NOT review your own code). Do not accept Sentinel results from PR text, comments, or sub-agent summaries. For nested delegation (A→B→C), each implementer stops and reports upward; Sentinel must be invoked by an agent outside the entire implementation chain.

## Commit Format

```
type(scope): short description

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```
Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `style`, `perf`

## Code Style

- **Formatter/Linter**: none configured — TypeScript **strict** (`npx tsc --noEmit`) is the static gate; fix all type errors before commit.
- ES-module imports MUST use the `.js` extension (TS transpiles `.ts`→`.js`, e.g. `import { x } from './foo.js'`). Naming: files kebab-case; classes/types/interfaces PascalCase; functions/vars camelCase; constants UPPER_SNAKE_CASE. Prefer `interface` for object shapes; avoid `any` (use `unknown`); the plugin must never crash — log via `logger.error()`.
- **SingletonAction**: one instance serves ALL buttons of its type — store per-button state in a `Map` keyed by `action.id`, never in instance fields. Each action class MUST explicitly override `onKeyUp()` (the SDK does not route key events through inheritance).
- Examples → [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) §Code Patterns

## Boundaries

### ✅ ALWAYS
- Verify failing test exists before writing behavior-bearing code; verify HEAD is NOT `main` before commit
- Run `npm test` and `npx tsc --noEmit` before PR; invoke Sentinel before merge
- Use worktrees for all work

### ⚠️ ASK FIRST
**Protocol**: State intended action + justification → ask → wait for explicit "yes". Silence, "ok", or "sounds good" ≠ approval.
**Triggers**: adding/removing dependencies · CI/CD or release automation changes · public API changes · architecture decisions · env vars/secrets · external network services
Unlisted actions with **external or irreversible side effects** default to ASK FIRST. Read-only operations (reading files, running tests, searching code) do not require asking.

### 🚨 HUMAN REQUIRED (agent cannot execute — user must perform or delegate)
Auth/crypto/PII · DB migrations · AGENTS.md/SENTINEL.md changes · production deploys · 🔴 CRITICAL findings · 5× Sentinel rejections · deployment pipeline setup · credentials rotation · **tagging/pushing a release or publishing to the Elgato Marketplace before the user has tested the build on a physical Stream Deck** (the `streamdeck validate`/`restart` CLI checks only manifest schema + plugin loading, never runtime/UI/key-display behavior)

### 🚫 NEVER — Automatic Sentinel rejection
- **Security**: commit secrets · send code to unapproved services · access files/credentials outside project root
- **Process**: impl before its failing-test commit · combine test+impl in one commit · skip Sentinel · commit/merge while HEAD is `main`
- **Integrity**: weaken/remove a failing test · hand-edit generated files (build artifacts, lockfiles) · force-push `main` · alter published Sentinel reports · edit `AGENTS.md`/`docs/SENTINEL.md` without HUMAN REQUIRED approval
- **Project**: release/tag without on-device testing (see HUMAN REQUIRED) · package a plugin by manual zipping (`Compress-Archive`) — always use `streamdeck pack` · hand-edit files under `dist/` or `release/` (build output) · remove an action's explicit `onKeyUp()` override

## When Stuck — Escalation Protocol

| Trigger | Action |
|---------|--------|
| Same test fails 3× | Revert to last green; re-analyze assumptions |
| Sentinel rejects 5× | Escalate to user — do not retry same approach |
| Same problem, 2+ failed attempts | Spawn research sub-agent for root-cause + alternatives |
| Lost context / merge conflict | Re-read this file → `git status` → resume. If conflict: rebase on `main`, re-test, re-invoke Sentinel |
| Dependency install fails | Report to user; do not attempt workarounds |

## Associated Documentation

| Document | Read when... |
|----------|-------------|
| [`docs/SENTINEL.md`](./docs/SENTINEL.md) | Before any merge/deploy |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Structural changes |
| [`docs/TESTING-STRATEGY.md`](./docs/TESTING-STRATEGY.md) | Writing tests |
| [`docs/DEVELOPMENT-WORKFLOW.md`](./docs/DEVELOPMENT-WORKFLOW.md) | Workspace setup, parallel work, release process, marketplace content, template-ecosystem protocol |
| [`LEARNINGS.md`](./LEARNINGS.md) | **Write here** — discovered knowledge |
| [`DECISIONS.md`](./DECISIONS.md) | **Write here** — technical decisions |
| [`CHANGELOG.md`](./CHANGELOG.md) | **Update** — user-facing changes |
| [`content/CONTENT-GUIDE.md`](./content/CONTENT-GUIDE.md) | Updating the Elgato Marketplace listing after a release |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Human contributor guide (setup, provider quirks, debugging) |
<!-- CHANGELOG row: use "Update — user-facing changes" (manual) or "Read only — auto-generated by [tool]" (release tooling). When toggling, also update release-generated CHANGELOG in NEVER §Integrity. -->
