---
name: test-audit
description: "Audits a repo's test suite: coverage gaps ranked by risk, test infrastructure (CI wiring, enforcement vs observation, local-vs-CI divergence), test quality, and whether mutation testing is warranted. Use when asked to audit tests or test coverage, review the test suite or testing infrastructure, find untested code, assess test quality, or decide if mutation testing is worth adopting. Assessment only — for generating test stubs use test-scaffold."
allowed-tools: Bash, Read, Glob, Grep, Agent, WebSearch
---

Audit this repository's test suite and testing infrastructure. Focus, if given: $ARGUMENTS

## Repo context (pre-fetched)

**Toolchain:** !`out=$(ls go.mod package.json pyproject.toml setup.py Cargo.toml pom.xml build.gradle Gemfile mix.exs 2>/dev/null); echo "${out:-unrecognized — infer from source file extensions}"`
**Test files:** !`out=$(find . \( -name "*_test.go" -o -name "*.test.*" -o -name "*.spec.*" -o -name "test_*.py" -o -name "*_test.py" -o -name "*_spec.rb" -o -name "*Test.java" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/vendor/*" -not -path "*/target/*" 2>/dev/null | wc -l | tr -d ' '); echo "$out files matching common test patterns (0 may mean an ecosystem this probe misses — verify before reporting 'no tests')"`
**CI:** !`out=$(ls .github/workflows/ .gitlab-ci.yml .circleci/config.yml Jenkinsfile 2>/dev/null); echo "${out:-none found}"`
**Quality gate:** !`out=$(ls Taskfile.yml Makefile justfile 2>/dev/null; grep -l '"scripts"' package.json 2>/dev/null); echo "${out:-none}"`
**Coverage config:** !`out=$(ls codecov.yml .codecov.yml .coveragerc 2>/dev/null; grep -ril "coverage" .github/workflows/ 2>/dev/null | head -3); echo "${out:-none found}"`
**Stated conventions:** !`out=$(grep -ril "test" CLAUDE.md CONTRIBUTING.md docs/adr/ docs/decisions/ .claude/ 2>/dev/null | head -5); echo "${out:-none — no written testing conventions (itself a finding)}"`

## Pipeline

Scale to repo size: for large repos, fan out parallel read-only agents (one per lens below); for small repos (<50 source files) work inline.

### 1. Establish the repo's own bar first

Read the stated conventions (pre-fetched above) before measuring anything. Audit against the repo's *own* rules before generic standards — "the repo promised handlers-first coverage and hasn't done it" is a stronger finding than any percentage. Note decisions the repo made deliberately (e.g. an ADR rejecting coverage thresholds as gameable) so you don't recommend re-litigating them.

### 2. Infrastructure lens — what actually runs

- **CI wiring:** which jobs run tests, with what flags (race detector, coverage mode), against what services (real database vs mocks). A test job exists ≠ the load-bearing tests ran in it.
- **Enforcement vs observation:** coverage uploaded but nothing fails on regression, soft-fail flags (`fail_ci_if_error: false`), thresholds declared that nothing checks. Observed-not-enforced is a state to report, not necessarily a bug — the repo may have chosen behavioral rules over numbers.
- **Local-vs-CI divergence:** env-gated integration tests (skip without `DATABASE_URL` etc.) mean the local gate passes while exercising a fraction of the suite. Quantify the fraction and say it explicitly.
- **The always-skipped sweep:** tests that skip in *every* environment, conditional CI jobs whose triggers can't fire, suites present but absent from every pipeline. Anything that has never once run is broken until proven otherwise.

### 3. Measure coverage at function granularity

Run the suite with the repo's own coverage command (from its gate/scripts; fall back to the ecosystem default). Per-package numbers hide the story — get per-function or per-file, and exclude generated code (sqlc/protobuf/templ/codegen output) before reading anything. What remains at 0% in clusters is the map of real gaps. If the suite doesn't run at all, stop measuring — that's the top finding.

### 4. Rank gaps by risk, not by percentage

Order: auth/session/crypto and security boundaries · input validation at system boundaries · money and data-mutation paths · concurrent code (untested workers never meet the race detector) · pure logic with subtle branches · render-only and glue code last — deprioritize it honestly instead of padding the count.

For each significant gap, find the **root cause of untestability**, not just the absence: usually a missing seam — a concrete dependency where the consumer needs an interface/fake, global state, a client that can't be stubbed. A gap that has persisted usually has a structural reason; a finding that names it comes with its own fix.

### 5. Sample test quality

Read the strongest and weakest test files, don't just count them: parameterized/table-driven or copy-paste? Both success *and* error paths? Real assertions or smoke ("doesn't crash")? Shared mutable state coupling test order? Cases named for behavior or for implementation?

### 6. Mutation testing verdict

Mutation testing answers exactly one question — do the tests assert enough, or merely execute lines? — so it is only worth its runtime where that question is live:

- **Warranted:** well-covered, fast, deterministic, *pure* logic whose bugs are consequential — security comparisons, rate/boundary arithmetic, validation, parsers, config.
- **Not warranted:** generated code and templates (mutants are noise) · anything whose tests are env-gated (they skip, every mutant survives, the score is meaningless) · low-coverage packages (the score is coverage restated at many times the runtime).
- **Sequencing:** coverage gaps close first; mutation testing is the second-order check on suites that already pass the first-order one.
- **Tooling:** verify the candidate tool's maintenance state (last release/commit) with a web search before recommending — mutation tools go stale faster than test frameworks; don't trust memory.
- **Placement:** scoped per-module, run manually or on a schedule — not in the PR gate, where it slows every iteration for second-order signal.

## Report

1. **TLDR verdict** — two or three sentences: infrastructure state, the shape of the gap, mutation-testing yes/no/not-yet.
2. **What's working** — name the good patterns explicitly so a later fix pass doesn't refactor them away.
3. **Gaps ranked by risk** — each with `file:line`, coverage evidence, and the structural root cause.
4. **Mutation testing** — where, which tool (maintenance-verified), how to invoke it, and what must land first.
5. **Found Work** — out-of-scope discoveries (bugs noticed, doc drift), reported, not fixed.

## Rules

- **Assessment only.** Do not write tests or fix code unless the user asks afterward; recommend the fix, cite the seam.
- Run, don't estimate: coverage numbers come from executing the suite during the audit. Label anything you couldn't run **unverified**.
- A gap without a `file:line` location is an opinion — cite everything.
- Distrust green: a passing local gate with silently-skipped integration tests is not the CI gate. Check what each green actually exercised.
- Degrade gracefully: a repo with no tests gets a risk-ranked "what to test first" plan, not an error; no conventions doc is a finding plus inferred conventions from the tests that exist.
