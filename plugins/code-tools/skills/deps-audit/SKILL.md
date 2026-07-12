---
name: deps-audit
description: "Audits dependency health from manifests and lockfiles: unused and duplicate dependencies, lockfile drift and unpinned manifests, last-publish staleness and deprecations (registry lookups when network is available), known advisories via OSV, and a license inventory. Use when asked to audit dependencies, check the lockfile, find unused or outdated packages, review dependency freshness or licenses, or assess supply-chain health. Assessment only — it reports and ranks, it does not install, update, or remove anything."
allowed-tools: Bash, Read, Glob, Grep
---

Audit this repository's dependencies. Focus, if given: $ARGUMENTS

## Dependency surface (pre-fetched)

**Manifests:** !`out=$(find . -maxdepth 3 \( -name package.json -o -name pyproject.toml -o -name requirements.txt -o -name go.mod -o -name Cargo.toml -o -name Gemfile -o -name composer.json \) -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null | head -8); echo "${out:-none found — no dependency surface; say so and stop}"`
**Lockfiles:** !`out=$(find . -maxdepth 3 \( -name package-lock.json -o -name pnpm-lock.yaml -o -name yarn.lock -o -name bun.lockb -o -name poetry.lock -o -name uv.lock -o -name go.sum -o -name Cargo.lock -o -name Gemfile.lock \) -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null | head -8); echo "${out:-none — every manifest is unpinned (itself a finding)}"`
**Network:** !`if curl -s -m 4 -o /dev/null -w "%{http_code}" https://registry.npmjs.org/ 2>/dev/null | grep -q "200"; then echo "available — registry freshness + OSV advisories in scope"; else echo "unavailable — freshness/advisories become unverified coverage, not findings"; fi`

## Scope

Everything here reads; nothing installs, updates, or removes. Findings must hold
without `node_modules` present — the lockfile and manifest are the source of truth,
with the registry as enrichment when the network allows. When the network is down,
say which pipeline steps were skipped: silence reads as "checked and clean."

## Pipeline

### 1. Manifest ↔ lockfile integrity

- manifest without a lockfile → unpinned installs (finding, severity scaled to
  whether this is an app or a library)
- lockfile drift: every manifest dependency must appear in the lockfile at a
  version satisfying its range — script the comparison, don't eyeball it
- lockfiles for a package manager the repo doesn't use (e.g. both `package-lock`
  and `pnpm-lock`) → two sources of truth, one is stale

### 2. Unused dependencies — candidates, then context

For each `dependencies`/`devDependencies` entry, sweep source for imports/requires
of the package (mind scoped names and subpath imports like `pkg/sub`). Zero hits
makes a **candidate**, not a finding — check the places imports don't reach before
reporting:

- config references: eslint/prettier/postcss/babel configs, `plugins:` arrays,
  framework config files, `package.json` `scripts` invoking the binary
- implicit runtimes: `@types/*` (paired to its runtime package), peer-dependency
  satisfaction, CSS/asset imports
- monorepo workspace references

Report what survives with severity by weight: an unused 2MB dependency outranks an
unused 2KB one. Label each `verified` (all reference surfaces checked) — a bare
grep miss is not verification.

### 3. Duplicate versions

Parse the lockfile (script it) for the same package resolved at multiple versions;
report count, versions, and which top-level dependents pull each. Duplicates of
heavyweight packages (frameworks, runtimes, polyfill suites) rank above leaf
utilities.

### 4. Freshness and deprecation (network-gated)

For each direct dependency, query the registry (`https://registry.npmjs.org/<pkg>`
or ecosystem equivalent) for last-publish date and `deprecated` flags — batch with
a small script, cache nothing, time-bound each request. Rank: deprecated > years
since last publish (2+ years on an actively-developed dependency deserves a look;
a stable finished utility does not — say which reading applies) > major versions
behind. Never guess dates offline.

### 5. Advisories (network-gated)

Query OSV (`https://api.osv.dev/v1/querybatch`) with the locked versions from the
lockfile — the locked version is what ships, not the manifest range. Report
advisory id, severity, affected range vs locked version, and whether a
range-compatible fix exists. If the repo has its own audit tooling
(`npm audit`, `pip-audit`, `cargo audit` on PATH), run it as corroboration and say
whether the two sources agree.

### 6. License inventory

Collect the license per direct dependency (registry metadata when online;
`node_modules/*/package.json` if present; lockfile metadata where the ecosystem
records it). Produce the inventory grouped by license. Copyleft in an
application context is a **decision to surface**, not a violation to declare —
frame it that way. Unknown/missing licenses are findings.

### 7. Report

House audit shape: **TLDR verdict** → **findings by severity** cited to
manifest/lockfile lines, labeled verified / unverified / network-skipped →
**what's done well** → **priority order** with mechanical items (remove verified-
unused, dedupe) separated from decisions (major upgrades, license posture,
deprecated-dependency replacements).

## Rules

- **Assessment only.** No installs, no updates, no lockfile edits — /audit-fix or
  the user acts on the report.
- A dependency is "unused" only after every reference surface is checked; false
  removals break builds, so discrimination beats recall here exactly as in the
  other audits.
- Locked versions, not manifest ranges, are the security truth — always query
  advisories against what the lockfile resolves.
- Time-bound and count-bound network calls; a hung registry must not hang the
  audit. Report partial network coverage explicitly.
- Monorepos: audit per workspace, report per workspace — a root-level rollup hides
  which package owns the problem.
- Report out-of-scope discoveries (committed secrets in configs, CI issues) in a
  Found Work section; don't silently absorb or drop them.
