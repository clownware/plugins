---
name: devops-audit
description: "Audits CI/CD pipelines and deploy configuration: GitHub Actions workflow hygiene (action pinning, least-privilege permissions, untrusted-input injection, secret handling, cache/concurrency correctness), deploy configs (Dockerfile, docker-compose, wrangler, fly.toml), release and migration workflow safety, and drift between local quality gates and what CI actually enforces. Use when asked to audit CI/CD, review GitHub Actions or workflows, check a Dockerfile or deploy config, assess pipeline or release security, or answer whether CI actually enforces the project's gates. Assessment only — it reports and ranks, it does not edit workflows or configs."
allowed-tools: Bash, Read, Glob, Grep
---

Audit this repository's CI/CD and deploy surface. Focus, if given: $ARGUMENTS

## DevOps surface (pre-fetched)

**Workflows:** !`out=$(find .github/workflows -maxdepth 1 \( -name "*.yml" -o -name "*.yaml" \) 2>/dev/null | head -12); echo "${out:-none found — no CI surface; if deploy configs below are also absent, say so and stop}"`
**Deploy configs:** !`out=$(find . -maxdepth 2 \( -name "Dockerfile*" -o -name "docker-compose*.yml" -o -name "wrangler.toml" -o -name "wrangler.jsonc" -o -name "fly.toml" -o -name "netlify.toml" -o -name "vercel.json" -o -name "Procfile" \) -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null | head -8); echo "${out:-none — CI-only surface}"`
**Update automation:** !`out=$(ls .github/dependabot.yml .github/dependabot.yaml renovate.json .github/renovate.json 2>/dev/null | head -2); echo "${out:-none — no dependency-update automation (finding candidate, severity by repo activity)}"`
**Local gates:** !`out=$({ [ -d .husky ] && echo ".husky/ present"; ls Taskfile.yml Makefile 2>/dev/null; grep -oE "\"(quality|ci|check)[^\"]*\"[[:space:]]*:" package.json 2>/dev/null | head -4; } | head -6); echo "${out:-none found — no local gate surface to compare CI against}"`

## Scope

Everything here reads; nothing edits a workflow, config, or secret. The workflow
files and deploy configs are the source of truth — findings come from parsing
them, not from recalling best-practice lists. No network calls are required; if a
check would need one (e.g. resolving whether a pinned SHA matches its tag), label
it unverified rather than guessing.

## Pipeline

### 1. Inventory and trigger surface

Map every workflow: name, triggers, jobs, what each job actually runs. Then check
the triggers against the repo:

- `paths:` filters that exclude files the workflow is supposed to guard — a gate
  that doesn't fire on the code it gates (script the comparison against the tree)
- workflows triggered on `push` to main only, where the same checks never run on
  `pull_request` — enforcement after merge is observation, not enforcement
- `pull_request_target` with a checkout of the PR head — privileged token +
  attacker-controlled code; this is critical when present

### 2. Action supply chain

For every `uses:` line (script the extraction — don't eyeball):

- third-party actions pinned to a mutable tag or branch instead of a full commit
  SHA — severity scales with the job's `permissions` and secret access
- first-party (`actions/*`) on a major tag is accepted practice; report as
  informational only if the repo pins everything else
- missing `permissions:` block at workflow or job level where the job doesn't
  need write — the default token is broadly scoped; least-privilege is the bar
  for anything touching untrusted input or publishing artifacts

### 3. Injection and secret handling

- `${{ github.event.* }}` (or any attacker-influenced context: PR titles,
  branch names, issue bodies) interpolated directly into `run:` — command
  injection; **critical**. The safe pattern routes untrusted values through
  `env:`. Verify each hit by reading the surrounding step, not just the grep.
- secrets echoed, logged, passed to `docker build --build-arg`, written into
  artifacts, or exposed to fork PRs (`pull_request_target`, `workflow_run`)
- secrets referenced in workflows but consumed by steps that don't need them —
  over-scoping to flag, not a vulnerability to declare

### 4. Cache and concurrency correctness

- deploy/release jobs without a `concurrency` group — two merges can race to
  deploy out of order (severity by whether the target tolerates it)
- PR CI without `cancel-in-progress` — waste, informational
- `actions/cache` keys that never include the lockfile hash — stale-cache
  correctness risk, not just a speed issue

### 5. Deploy configs

Read each config found in the pre-fetch:

- **Dockerfile:** base image on `:latest` or unpinned major; missing multi-stage
  where a build toolchain ships in the runtime image; no `USER` (runs as root);
  secrets in `ENV`/`ARG` layers; missing `.dockerignore` with a fat context
- **wrangler.toml/jsonc:** plaintext values that belong in `wrangler secret`;
  missing `compatibility_date`; account/zone ids are fine (not secrets — don't
  false-positive them)
- **fly.toml:** no health checks on a service; `auto_stop`/min-machines settings
  that contradict the app's availability claims if the repo states any
- **docker-compose:** privileged containers, host-network, ports exposed beyond
  what the README/docs claim the service needs

### 6. Release and migration safety

Workflows that publish, tag, deploy, or migrate a database get a stricter pass:

- what can trigger them (a tag push anyone with write can create? manual
  `workflow_dispatch` with no environment protection?)
- database migration jobs: gated on an environment/approval or fired on every
  merge; whether a rollback path exists or is at least documented
- release jobs: token scope, provenance of what's published vs what CI tested
  (publishing a rebuild instead of the tested artifact is a finding)

### 7. Local-vs-CI gate drift

The generalization of test-audit's enforcement theme: compare the repo's own
quality gates (package.json `quality:ci`-style scripts, Taskfile/Makefile `ci`
targets, husky hooks) against what the workflows actually run — script the
command-list diff. A check that exists locally but never runs in CI is
observation; a check CI runs that local gates don't is a surprise waiting for
contributors. Report both directions.

### 8. Report

House audit shape: **TLDR verdict** → **findings by severity** cited
`file:line`, labeled verified / unverified → **what's done well** → **priority
order** with mechanical fixes (pin this SHA, add this permissions block)
separated from decisions (environment protection policy, release provenance).

## Rules

- **Assessment only.** No workflow, config, or secret edits — /audit-fix or the
  user acts on the report.
- **Verified means parsed or diffed**, not pattern-matched: an injection finding
  quotes the exact interpolation and the step context; a drift finding shows
  both command lists. A grep hit alone is unverified.
- **Severity follows reachability**, not checklist dogma: untrusted-input
  injection and `pull_request_target`+checkout are critical; an unpinned
  third-party action in a no-secrets, read-only job is medium at most; missing
  dependabot on a low-churn repo is informational. Say which reading applies.
- Don't penalize platform conventions (first-party actions on major tags,
  wrangler account ids, compose port mappings the docs claim) — the bar is the
  repo's own stated posture first, general practice second.
- Monorepos/multi-config repos: report per workflow and per config — a rollup
  hides which pipeline owns the problem.
- Report out-of-scope discoveries (committed secrets, dependency issues, test
  gaps) in a Found Work section pointing at the sibling audit that owns them.
