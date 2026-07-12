---
name: perf-budget-check
description: "Runs the astro-performance-starter's own budget gates against the current working tree and reports pass/fail with deltas: raw-size budgets (budgets.json via perf:budgets), budget-override validation, the image gate, and — only when explicitly asked — the Lighthouse CI floors. Use in Astro projects built on the astro-performance-starter when asked to check performance budgets, verify the perf gates before a PR, see if the branch blows the budget, or compare bundle size against the baseline."
allowed-tools: Bash, Read, Glob, Grep
---

Check this branch against the project's performance budgets. Focus, if given: $ARGUMENTS

## Budget tooling (pre-fetched)

**Budget configs:** !`out=$(ls budgets.json budget-overrides.json lighthouserc.json lighthouserc.mobile.json 2>/dev/null); echo "${out:-none — this repo does not carry the starter budget tooling; report that and stop (perf-audit is the universal alternative)}"`
**Gate scripts:** !`out=$(python3 -c "import json; s=json.load(open('package.json')).get('scripts',{}); print('\n'.join(f'{k}: {v}' for k,v in s.items() if k in ('perf:budgets','budgets:validate','images:gate','perf:baseline','perf:lhci','build')))" 2>/dev/null); echo "${out:-package.json missing or no gate scripts}"`
**Build output:** !`out=$(ls -d dist 2>/dev/null && find dist -name "*.js" -path "*_astro*" 2>/dev/null | head -1 >/dev/null && echo "dist/ present"); echo "${out:-no dist/ — a build is required before size gates mean anything}"`
**Branch:** !`b=$(git branch --show-current 2>/dev/null); echo "${b:-detached or not a git repo}"`

## What this skill is

The starter already owns its budget logic — `budgets.json` enforced by
`perf:budgets`, overrides validated by `budgets:validate`, the image gate, and the
Lighthouse CI floors. This skill **orchestrates the repo's own gates and interprets
the results**; it never re-implements the arithmetic, because the repo's script is
the gate CI will apply. If the four configs aren't here, this isn't a starter-derived
repo: stop and point at `/perf-audit`.

## Pipeline

### 1. Ensure the thing being measured exists

Size gates measure `dist/`. If `dist/` is missing or older than the newest source
change (`git log -1 --format=%ct -- src/` vs the dist mtime), build first —
`pnpm run build` — and say you did. Never measure a stale build silently; that is
how a passing report lies.

### 2. Run the gates, capture everything

In order, time-bounded, capturing full output:

1. `pnpm run budgets:validate` — the overrides file must itself be coherent before
   its numbers mean anything
2. `pnpm run perf:budgets` — the raw-size budgets; per-budget pass/fail with
   actual vs limit
3. `pnpm run images:gate` — the image budget

Report each gate's own verdict verbatim (the repo's script is the authority),
then translate: per budget, actual size, limit, headroom or overage, and which
files are the biggest contributors to any overage (`find dist/_astro` + sizes,
matched against the budget's path/ignore rules — read `budgets.json` for the
basis: these are RAW bytes, not gzipped; don't mix).

### 3. Diff against main

If the current branch isn't main and main is available, compare: check out
nothing — use the baseline mechanism (`perf:baseline` artifacts if the repo keeps
them) or, when absent, report branch-absolute numbers and say the delta is
unavailable without a main build. Never rebuild main into the same working tree;
a worktree build is allowed only if the user asks for the delta explicitly (it is
slow and writes a second node_modules-sized footprint).

### 4. Lighthouse floors — only on request

`perf:lhci` builds, serves, and runs Lighthouse over every configured URL —
minutes, not seconds, and flaky in sandboxes. Run it only when $ARGUMENTS asks
for Lighthouse explicitly; otherwise report the configured floors
(`lighthouserc.json` + mobile: perf/a11y/BP/SEO minimums) as declared-and-CI-gated
without re-running them, citing where CI runs them.

### 5. Report

Compact and decision-shaped: **verdict line** (all gates green / N gates failing)
→ per-gate table (gate, verdict, actual vs limit, top contributors for failures)
→ what changed on this branch that moved the numbers (`git diff main --stat` on
src/public when main is local) → next actions, distinguishing "shrink the asset"
items from "raise the budget" decisions (budget raises go through
`budget-overrides.json` and its validator, and deserve a written why).

## Rules

- The repo's gate scripts are the authority; this skill's own arithmetic only
  explains their verdicts, never overrides them.
- Never measure a stale or missing build; build first and say so.
- Raw vs gzipped basis comes from `budgets.json`'s own documentation — state it
  in every number you print.
- Lighthouse runs are opt-in per invocation; everything else must finish in
  build-time + seconds.
- A budget overage is a finding; raising a budget is a decision — present it that
  way, pointing at the overrides file and its validation gate.
- Read-only toward configs: never edit budgets, overrides, or thresholds.
