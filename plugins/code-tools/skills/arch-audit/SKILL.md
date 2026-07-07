---
name: arch-audit
description: "Audits a repo's architecture decisions (ADRs) against its roadmap and actual code, then produces a phased readiness plan. Use when asked to audit architecture or design decisions, review ADRs, assess deployment or production readiness, check whether docs match the code, find gaps before shipping, or answer 'is this ready to deploy'."
allowed-tools: Bash, Read, Glob, Grep, Agent
---

Audit this repository's architecture decisions and readiness. Focus, if given: $ARGUMENTS

## Repo context (pre-fetched)

**Decision records:** !`out=$(ls docs/adr/ docs/decisions/ adr/ 2>/dev/null | head -5); echo "${out:-none found — infer decisions from configs, README, and code}"`
**Roadmap/product docs:** !`out=$(find . -maxdepth 2 \( -iname "roadmap*" -o -path "./docs/product/*" -o -path "./docs/updates/*" \) 2>/dev/null | head -5); echo "${out:-none found}"`
**CI workflows:** !`ls .github/workflows/ 2>/dev/null || echo "none"`
**Quality gate:** !`out=$(ls Taskfile.yml Makefile justfile 2>/dev/null; grep -l '"scripts"' package.json 2>/dev/null); echo "${out:-none found}"`
**Default branch:** !`b=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|.*/||'); [ -n "$b" ] || b=$(git branch --show-current 2>/dev/null); echo "${b:-unknown}"`
**Deploy config:** !`ls Dockerfile docker-compose.yml fly.toml render.yaml wrangler.toml vercel.json 2>/dev/null || echo "none"`

## Pipeline

### 1. Three-lens fan-out

Launch parallel read-only agents (Explore or general-purpose), one per lens. Scale breadth to repo size; for small repos (<50 files) do it inline instead.

- **Decisions lens** — read every decision record: status, one-line decision, contradictions between records, records still "Proposed", decisions a production system needs that no record covers (deploy target, TLS, sessions, backups, migration/deploy ordering).
- **Promises lens** — read roadmap, PRD, README, changelog: what does the project claim is done or planned? Which claims are checkable?
- **Code lens** — read the actual implementation: server setup (timeouts, graceful shutdown), middleware (security headers, CSRF, rate limiting), config validation, auth/session handling, DB pool settings, observability exposure, CI enforcement, container/deploy configs, dead code.

The findings live in the **diffs between lenses**: decision says X / code does Y; README claims done / nothing implements it; code exists / no decision authorized it.

### 2. Adversarial verification (mandatory)

Agents get things wrong and contradict each other. Before reporting, hand-verify with Read/Grep:

- every finding you'd label critical or high severity
- every claim where two lenses disagree
- every "X is missing" (search again yourself — absence claims are the easiest to get wrong)

Label each reported finding **verified** (you saw the code) or **unverified** (agent claim, cite why you believe it). Never present an unverified claim as fact.

### 3. The never-exercised sweep

The highest-yield detector: **anything that exists but has never once run is broken until proven otherwise.** Hunt explicitly for:

- workflows whose triggers can't fire (wrong branch name, wrong path filter)
- build artifacts never built in CI (Docker images, release binaries)
- declared budgets/thresholds nothing enforces
- secrets/config referenced but never consumed (or consumed by nothing that runs)
- security mechanisms proven in tests but never engaged at runtime (test harness sets up state the app never does)
- status tables/checklists marking things "done" with no corresponding code

### 4. Production-gap checklist

Check each; report state, not aspiration: deploy target decided and configured · TLS/HSTS story · session model · server timeouts · DB pool tuning · config fail-fast validation · CSRF · rate-limit tiers · metrics/debug endpoint exposure · logging consistency (one library, structured, no PII) · backup/recovery ownership · migration↔deploy ordering · dependency/toolchain vulnerabilities · dead code and duplicate implementations.

### 5. Phased plan

Order the remediation plan by dependency, not severity alone:

1. **Decisions** — write/amend the decision records first; code follows decisions
2. **Platform hardening** — timeouts, validation, security middleware
3. **Correctness** — make claimed guarantees real at runtime
4. **Features** — whatever the roadmap actually promises
5. **Consistency** — logging, dead code, doc drift
6. **Ship** — release pipeline, deploy config, version tag

Each phase must end at the repo's own quality gate (found in pre-fetched context). Note which items need decisions only the user can make (hosting spend, design gates, secret provisioning) and separate them from items you could execute.

## Rules

- **Assessment only.** The deliverable is the report and plan. Do not fix anything unless the user then asks.
- Cite findings as `file:line`. A finding without a location is an opinion.
- Never trust a ✅, "implemented", or "done" in any document — grep for the implementation.
- Distrust green CI: check that the load-bearing job actually *ran* the thing (tests can skip, jobs can be conditionally bypassed, triggers can be dead).
- Degrade gracefully: no ADRs is itself a finding, not a blocker — infer implicit decisions from configs and code, and recommend recording them.
- Lead the report with a TLDR verdict (ship-ready / blocked / blocked-on-user), then findings ranked by severity, then the phased plan.
- Report out-of-scope discoveries in a separate "Found Work" section; don't silently fix or silently drop them.
