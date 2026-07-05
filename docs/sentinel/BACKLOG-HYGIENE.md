# Sentinel — Backlog Hygiene

> Companion to [`../SENTINEL.md`](../SENTINEL.md). The **§1 validity anchor is REQUIRED** by SENTINEL.md
> §Follow-ups & Actions in every filed issue; the **§2–§5** labels, sweep, and workflow stay **opt-in**. The
> Sentinel merge-gate is unchanged and stays read-only; **nothing here runs per-PR**. This doc keeps the
> **issues Sentinel produces** trustworthy over time — without ever letting automation silently drop a real finding.

## Why this exists
Sentinel files a GitHub issue for every new 🟡/🟢 finding and **never revisits it**, so issues accrete
**monotonically by design**. Over months a backlog fills with findings whose code was since changed,
refactored, incidentally fixed, duplicated, or that never mattered — and a large, untrusted backlog is its
own failure mode: real findings (including security) hide in the noise.

**The one rule — division of labor:** Sentinel/automation **emits signals**; a **human decides what closes.**
Staleness is a *signal to re-check*, never proof of resolution. **"Stale" ≠ "resolved."**

## 1. Validity anchor — REQUIRED by SENTINEL.md §Follow-ups (in every filed `sentinel:*` issue)
[`SENTINEL.md`](../SENTINEL.md) §Follow-ups & Actions **requires** this anchor in every filed issue — it is
**not** opt-in. So any issue can be re-checked cheaply, the orchestrator writes the anchor into the issue body
when filing — the data already exists in the Sentinel report (Evidence Standard snippet + Reviewed SHA). Each issue body carries:

1. a **human + machine readable anchor** (the HTML comment lets the optional sweep/Action parse it):

   ~~~text
   **Anchor:** `src/foo.ts:120-128` @ `a1b2c3d` · dim `A1`
   <!-- sentinel-anchor file="src/foo.ts" sha="a1b2c3d" -->
   ~~~

2. the **quoted ≤3-line evidence snippet** in a fenced code block (already produced by the finding);
3. the label **`sentinel:security`** when the finding came from dim-a1/a2 or a security-path 🟡.

Anchors are append-only: if a finding migrates, **re-attest** with the new line (§3) — never rewrite the original SHA.

## 2. Labels (create once per adopter)
```bash
gh label create sentinel:security          -c '#b60205' -d 'Security-relevant — never auto-closeable'
gh label create sentinel:candidate-stale   -c '#fbca04' -d 'Cited code changed since filing — human must verify'
gh label create sentinel:confirmed-present -c '#0e8a16' -d 'Re-validated: finding still applies at HEAD'
gh label create sentinel:needs-human       -c '#5319e7' -d 'Ambiguous on re-check — human triage required'
```

## 3. Re-validation sweep — FLAG, NEVER REAP (opt-in)
Run on demand or on a schedule — **never per-PR** (a per-issue sweep across a 700-item backlog is absurd
cost). It reads open `sentinel:*` issues, locates each anchor at current HEAD, and **relabels + comments. It
does not close.**

**Closure authority is asymmetric — this is the core safety control:**

| Issue class | The sweep may propose… | …but NEVER |
|---|---|---|
| `sentinel:security` | `confirmed-present` (update file:line if the sink **migrated**) or `needs-human` | propose closure — *ever* |
| non-security 🟡/🟢 | closure **only on positive resolution evidence** (a guard / escape / bound / regression test now exists at the sink) | close on **absence**, **age**, or a **moved line** |

- **Migration-aware:** match the vulnerable **pattern/sink**, not the original line number — refactors relocate
  sinks without fixing them, and a vuln can migrate to another file.
- **Default on doubt = keep open**, label `sentinel:needs-human`.
- **Audit trail:** every action posts a comment with the re-check SHA, the current `file:line`, and the specific
  evidence. Closing stays a **human** action (or an opt-in N-day auto-close window that **excludes**
  `sentinel:security`) and is always reversible by reopening.

### NEVER
- Auto-close anything labeled `sentinel:security`.
- Treat **age**, a **deleted/moved line**, or "couldn't find it" as resolution evidence.
- Run the sweep inside the merge gate, or grant it write access to source code.

## 4. Inflow discipline (prevention beats cleanup)
The cheapest backlog item is the one never filed — keep the gate's existing levers tight:
- File 🟢 minors as **one digest issue per review** (a standalone 🟢 only when the same polish recurs).
- Honor the **materiality floor** (SENTINEL.md Phase 3): omit findings whose own rationale calls the impact immaterial.
- 🟡 require a real trigger→mechanism→consequence chain, else they are 🟢.

## 5. Optional example Action (copy in only if you want scheduled flagging)
A deterministic, **flag-only** first pass: it labels `sentinel:candidate-stale` when an anchored file is gone
at HEAD. **It never closes and never adjudicates `sentinel:security`** — deeper re-validation (positive
evidence, cross-file migration) is left to the human/agent §3 sweep. Pin the action to a full SHA. **When you
copy it in, format the file to your repo's conventions (Prettier/ESLint/etc.) so your CI's lint/format check
passes — keep the pinned action SHA and the logic intact.**

```yaml
# .github/workflows/sentinel-backlog-hygiene.yml   (OPTIONAL — adopter opt-in)
name: Sentinel Backlog Hygiene
on:
  schedule: [{ cron: '0 6 * * 1' }] # weekly, Mondays 06:00 UTC
  workflow_dispatch:
permissions:
  contents: read
  issues: write
jobs:
  flag-stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - name: Flag candidate-stale (never closes)
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          short=$(git rev-parse --short HEAD)
          gh issue list --state open --limit 1000 --json number,body,labels \
            --jq '.[] | select(any(.labels[].name; test("^sentinel:(important|minor)$")))
                       | select(any(.labels[].name; . == "sentinel:candidate-stale") | not)
                       | "\(.number)\t\(.body | @base64)"' \
          | while IFS=$'\t' read -r num b64; do
              file=$(printf '%s' "$b64" | base64 -d | grep -oP '(?<=sentinel-anchor file=")[^"]+' | head -1)
              [ -n "$file" ] && [ ! -f "$file" ] || continue
              gh issue edit "$num" --add-label 'sentinel:candidate-stale'
              gh issue comment "$num" --body \
                "⚠️ Backlog hygiene: the anchored file \`$file\` no longer exists at HEAD ($short). **This does NOT mean the finding is resolved** — code (and vulnerabilities) migrate. A human must verify before closing."
            done
```

> The example checks only **file existence** (the cleanest objective signal). Snippet-level and migration-aware
> checks belong in the §3 human/agent sweep, which can read the snippet and reason about the sink. Keep it
> flag-only to preserve the safety guarantees above.

## Relationship to the gate
Nothing here changes a verdict. The only place backlog state already touches the gate is Phase 3 de-dup
("Known"): a new finding **more severe or newly reachable** than a matched open issue is **not** Known — it
escalates. Backlog hygiene keeps that signal honest; it does not relax it.
