---
name: gate-check
description: "Runs a Rust repo's own quality gates exactly as its CI defines them — cargo fmt --check, clippy -D warnings, cargo test, cargo-deny (advisories/licenses/bans/sources), plus special legs like wasm builds or coverage floors found in the workflows — and interprets each verdict. Use in Rust projects when asked to check the gates, verify CI will pass, run clippy or cargo deny, or answer will-this-branch-pass before pushing."
allowed-tools: Bash, Read, Glob, Grep
---

Run this Rust repository's quality gates and interpret the verdicts. Focus, if given: $ARGUMENTS

## Gate surface (pre-fetched)

**CI-defined legs:** !`out=$(find .github/workflows -maxdepth 1 -name "*.yml" -exec grep -hoE "cargo [a-z-]+( [^\"]*)?" {} + 2>/dev/null | sort -u | head -10); echo "${out:-no CI workflows found — fall back to the standard legs: cargo fmt --all -- --check; cargo clippy --all-targets -- -D warnings; cargo test}"`
**deny config:** !`out=$(ls deny.toml 2>/dev/null); echo "${out:-none — skip the cargo-deny leg (note its absence in the report)}"`
**Fuzz targets:** !`out=$(ls fuzz/fuzz_targets 2>/dev/null | head -5); echo "${out:-none}"`
**Toolchain:** !`out=$(command -v cargo >/dev/null 2>&1 && cargo --version 2>/dev/null); echo "${out:-cargo not on PATH — report every gate as unrunnable; do not guess verdicts}"`

## Scope

Run the repo's own gates, in the repo's own configuration — the CI workflow is
the source of truth for which legs exist and their exact flags. Read-only with
respect to the tree: gates may build into `target/`, but never fix, format, or
edit source. Interpretation belongs to this skill; fixes belong to the user (or
a follow-up request).

## Steps

### 1. Establish the leg list

Parse the pre-fetched CI commands. Run each leg with the exact flags CI uses
(`--all-targets`, `--workspace`, `-D warnings`, feature flags, target triples).
If a leg needs a tool that isn't installed (cargo-deny, cargo-llvm-cov, a wasm
target), report that leg as **not runnable locally** — never substitute a
weaker approximation silently.

### 2. Run, capture, attribute

Run legs in CI's order, capturing output. Time-bound anything that can hang.
For each failure, attribute to `file:line` from the tool's own output — clippy
and rustc give exact spans; deny gives the offending crate and the rule
(advisory id, license, ban, source).

### 3. Interpret, don't just relay

- **fmt:** which files diverge; note the hook/`cargo fmt` fix but don't run it
- **clippy:** group by lint; distinguish new-code lints from pre-existing debt
  (`git stash`-free heuristic: does the lint's span overlap the branch diff?)
- **test:** failing test names and the assertion text; flaky-suspect if a rerun
  of just that test passes — say so rather than averaging
- **deny:** an advisory on a transitive dep is a decision (bump the parent,
  ignore with reason, or wait) — present the options, don't pick silently
- **special legs** (wasm build, MSRV, coverage floor): report the number against
  the floor, not just pass/fail — headroom matters
- **fuzz targets:** presence-only unless asked; a full fuzz run is not a gate
  check. If targets exist and the diff touches parsing/decoding, recommend a
  bounded run (`-max_total_time=60`) as follow-up.

### 4. Verdict

One line per leg: **pass / fail / not runnable locally**, then the CI-parity
statement — which legs ran exactly as CI runs them, and which CI legs could not
be reproduced (those are the residual risk on push).

## Rules

- The repo's flags, not generic ones: `clippy` without `-D warnings` when CI
  uses `-D warnings` is a different gate — never soften a leg.
- Never edit, format, or fix anything — report only. A gate-check that mutates
  the tree can't be trusted as a gate-check.
- Missing tools make legs "not runnable locally", stated in the verdict — a
  skipped leg reported as pass is the worst outcome this skill can produce.
- Workspaces: run at workspace scope like CI does; per-crate focus only when
  $ARGUMENTS asks for it.
