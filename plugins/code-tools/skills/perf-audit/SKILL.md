---
name: perf-audit
description: "Audits performance posture: budgets declared vs actually enforced (the never-exercised sweep applied to performance), bundle and asset sizes against stated limits, unminified or unoptimized shipped assets, render-blocking patterns, and whether the repo's own perf tooling is wired into CI or just decorative. Runs the repo's own perf scripts when cheap. Use when asked to audit performance, check bundle size or budgets, review perf posture, find performance regressions, or assess whether stated performance claims are enforced. Assessment only."
allowed-tools: Bash, Read, Glob, Grep
---

Audit this repository's performance posture. Focus, if given: $ARGUMENTS

## Perf surface (pre-fetched)

**Budget/perf declarations:** !`out=$(find . -maxdepth 2 \( -name "budgets*.json" -o -name "lighthouserc*" -o -name ".size-limit*" -o -name "bundlesize*" -o -name "*.budget.*" \) -not -path "*/node_modules/*" 2>/dev/null | head -6; grep -l '"size-limit"\|"bundlesize"' package.json 2>/dev/null); echo "${out:-none found — posture is undeclared; the audit reports observed sizes without a stated bar}"`
**Perf scripts:** !`out=$(python3 -c "import json; s=json.load(open('package.json')).get('scripts',{}); print('\n'.join(f'{k}: {v}' for k,v in s.items() if any(w in k.lower() or w in str(v).lower() for w in ('perf','budget','lighthouse','lhci','size','bundle'))))" 2>/dev/null); echo "${out:-none}"`
**Build output present:** !`out=$(ls -d dist build .next out public 2>/dev/null | head -3); echo "${out:-no build output on disk — size checks need a build or are skipped (say which)}"`
**CI workflows:** !`out=$(ls .github/workflows/ 2>/dev/null | head -6); echo "${out:-none}"`

## The organizing question

Not "is it fast?" — that needs a lab. The auditable question is: **does anything
enforce what the repo claims about performance?** A budget file nothing reads, a
Lighthouse config no workflow runs, a perf script absent from CI — these are the
performance version of the never-exercised sweep, and they are where "we have
budgets" quietly becomes false.

## Pipeline

### 1. Declared vs enforced — trace every declaration to its enforcement

For each budget/threshold declaration found: which script consumes it → which CI
job runs that script → does that job actually gate (failure blocks merge) or only
observe (logs and continues) → can its trigger actually fire (branch names, path
filters). Report each declaration as **enforced** (cite the workflow line),
**observed only**, or **decorative** (nothing consumes it). Comments inside config
files often name their enforcing script — verify the claim, don't trust it.

### 2. Run the repo's own tooling when cheap

If a budget script exists and the build output it measures is on disk, run it
(time-bounded) and report its verdict as ground truth. Never trigger a full build
or a Lighthouse run uninvited — if enforcement requires one, say the check was
skipped and why. The repo's own tooling passing/failing outranks your independent
arithmetic; when both exist, do both and note disagreement.

### 3. Independent size checks against stated limits

Where declared limits exist and build output is present, script the comparison
yourself: per-file and total sizes (raw and gzipped — know which the budget means;
mixing them is a classic false pass) against each budget. Where no limits are
declared, report the top-N heaviest shipped assets as observations, not findings.

### 4. Shipped-asset hygiene (static, on build output / public assets)

- unminified JS/CSS in the shippable output (sourcemap-adjacent `.js` with
  whitespace and comments; long line-count heuristics — verify by reading)
- uncompressed image formats where modern ones are expected by the repo's own
  conventions; images dramatically larger than their display context
- source maps, licenses banners, or debug artifacts shipping to production
- duplicate embedded libraries (the same vendored payload in multiple bundles)

### 5. Render-blocking and loading patterns (source-level)

- synchronous third-party `<script>` in `<head>` without `defer`/`async`
- blocking `@import` chains in shipped CSS; fonts without `font-display`
- oversized above-the-fold images without dimensions (layout shift)

These are pattern candidates — check the framework's conventions before reporting
(many frameworks inline or reorder at build time; judge the *output* when it's on
disk, the source only when it ships as-is).

### 6. Report

House audit shape: **TLDR verdict** (the headline is the declared-vs-enforced
table) → **findings by severity**, cited `file:line`, labeled verified (script
run / computed size / read in output) or unverified → **what's done well** →
**priority order**, wiring gaps first (making an existing budget actually gate is
the cheapest real win), then size violations, then hygiene.

## Rules

- **Assessment only** — no config edits, no build tweaks; /audit-fix or the user
  acts on the report.
- Never present an observed-only or decorative budget as protection; the gap
  between claim and gate IS the finding.
- Raw vs gzipped is not a detail: state which every number is, and match the
  budget's own basis when comparing.
- Time-bound everything you run; a perf audit that hangs a build pipeline is
  worse than no audit.
- No lab metrics from a code read: never report LCP/CLS/TTI numbers you didn't
  measure — wire-level claims need the repo's own Lighthouse artifacts (cite the
  report file) or nothing.
- Out-of-scope discoveries (a11y, security, dead code) go to Found Work.
