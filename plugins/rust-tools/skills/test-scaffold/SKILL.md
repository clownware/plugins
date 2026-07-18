---
name: test-scaffold
description: "Generates table-driven Rust test stubs (#[cfg(test)] modules with case tables) following the tunes_protocol/gittunes workspace conventions. Use in Rust projects when asked to write tests for, scaffold tests, generate a test module, or add test coverage for a Rust source file, function, or crate."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Generate table-driven test stubs for: $ARGUMENTS

## Project test context (pre-fetched)

**Cargo manifest:** !`out=$(ls Cargo.toml 2>/dev/null); echo "${out:-no Cargo.toml at root — is this a Rust project? confirm before scaffolding}"`
**Layout:** !`out=$(grep -q "^\[workspace\]" Cargo.toml 2>/dev/null && echo "workspace — scaffold inside the member crate that owns the target" || grep -m1 "^name *=" Cargo.toml 2>/dev/null); echo "${out:-single file or unknown — read the tree first}"`
**Existing test modules:** !`out=$(grep -rl "#\[cfg(test)\]" --include="*.rs" crates src 2>/dev/null | head -6); echo "${out:-no inline test modules yet — this will set the pattern}"`
**Test command (from CI when present):** !`out=$(find .github/workflows -maxdepth 1 -name "*.yml" -exec grep -hoE "cargo (test|nextest)[^\"]*" {} + 2>/dev/null | sort -u | head -2); echo "${out:-cargo test (no CI workflow found)}"`

## Steps

### 1. Read the source file

Read the file the user specified. Identify:
- Every public function/method and its signature (params, returns, whether it returns `Result`/`Option`)
- Whether functions are pure or need collaborators injected (these repos inject clock/RNG/IO — never reach for ambient state in a test)
- Table-worthy behaviors, not one test per function: happy path, empty/zero inputs, boundary conditions, each `Err` variant

### 2. Learn the crate's conventions

Read ONE existing `#[cfg(test)]` module from the pre-fetched list, preferring the same crate. Match:
- Inline `mod tests` (the dominant pattern here) vs `tests/` integration files — follow what the crate already does
- Assertion style: `assert_eq!`/`assert!`/`matches!` (stdlib-first; do NOT introduce a test framework crate the workspace doesn't already have)
- Fixture/vector patterns: if the crate tests against committed vectors (e.g. a `vectors/` dir), new cases reference vectors — never invent protocol bytes inline

### 3. Determine the test location

Same-file `#[cfg(test)] mod tests` at the bottom of the target module unless the crate's convention says otherwise. If the module already has tests, add missing cases — never overwrite.

### 4. Generate the table-driven tests

One `#[test]` fn per public function, iterating a case table. Mark each stub `#[ignore = "TODO: fill assertions"]` so the crate compiles and `cargo test` stays green until the user fills them in.

Example shape (stdlib, matching these workspaces):

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[ignore = "TODO: call parse and assert want/want_err per case"]
    fn parse_cases() {
        struct Case {
            name: &'static str,
            input: &'static str,
            want: Option<u32>,
        }
        let cases = [
            Case { name: "valid input", input: "42", want: Some(42) },
            Case { name: "empty input", input: "", want: None },
            Case { name: "non-numeric", input: "x", want: None },
        ];
        for case in cases {
            let _ = (case.name, case.input, case.want);
            todo!("assert parse({}) == want", case.name);
        }
    }
}
```

### 5. Verify it compiles

`cargo check -p <crate>` (or plain `cargo check`). The scaffold must compile; ignored tests must not fail the suite.

## Rules

- Table-driven case structs with names — no one-assertion-per-`#[test]` sprawl.
- Stub bodies are `#[ignore]`d ONLY. Do NOT write assertions — the user fills those in — but the crate MUST compile and `cargo test` MUST stay green.
- Never add a dev-dependency (proptest, rstest, etc.) the workspace doesn't already carry; if property tests would fit, say so and stop.
- In `no_std` crates, the test module may use `std` only if the crate's existing tests do (`#[cfg(test)]` usually permits it) — check before importing.
- If the target is a protocol/wire-format path with committed vectors, point new cases at the vectors directory; hand-invented bytes in tests are how canonical-encoding bugs hide.
