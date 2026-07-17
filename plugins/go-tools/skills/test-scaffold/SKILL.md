---
name: test-scaffold
description: "Generates table-driven Go test stubs (_test.go) following go-performance-starter's testing conventions (ADR-023). Use in Go projects when asked to write tests for, scaffold tests, generate a test file, or add test coverage for a Go source file, function, or package."
allowed-tools: Bash, Read, Write, Glob, Grep
---

Generate table-driven test stubs for: $ARGUMENTS

## Project test context (pre-fetched)

**Module path:** !`out=$(sed -n "s/^module //p" go.mod 2>/dev/null | head -1); echo "${out:-no go.mod found — is this a Go module? confirm before scaffolding}"`
**Assertion style:** !`out=$( { grep -Rqs "github.com/stretchr/testify" go.mod 2>/dev/null && echo "testify present in go.mod (check the target package's existing tests for whether they actually use it)"; } || echo "stdlib testing (no testify in go.mod)" ); echo "${out}"`
**Existing test files:** !`out=$(find . -name "*_test.go" -not -path "./vendor/*" 2>/dev/null | head -8); echo "${out:-no _test.go files yet — this will be the first}"`
**Test task:** !`out=$( { grep -Eq "^\s*test:" Taskfile.yml 2>/dev/null && echo "task test"; } || echo "go test ./..." ); echo "${out}"`

## Steps

### 1. Read the source file

Read the file the user specified. Identify:
- Every exported function/method and its signature (params, returns, whether it returns an `error`)
- Whether functions are pure or depend on collaborators (DB, clock, network) that need a fake or an interface seam
- Table-worthy behaviors, not one test per function: happy path, zero values (`""`, `0`, `nil`, empty slice), boundary conditions, and each error path

### 2. Learn the package's conventions

Read ONE existing `_test.go` from the pre-fetched list (prefer one in or near the target package). Match:
- Package clause: same-package (`package foo`) vs black-box (`package foo_test`)
- Assertion style: stdlib `t.Errorf`/`t.Fatalf` (the starter's default) vs testify — do NOT introduce testify if the package uses stdlib
- Helper patterns: `t.Helper()`, `t.TempDir()`, `t.Run` subtests, `t.Parallel()`

### 3. Determine the test file location

Go requires the test beside the source: `path/to/foo.go` → `path/to/foo_test.go`. If it already exists, read it and only add missing cases — never overwrite.

### 4. Generate the table-driven test

One `Test<Func>` per exported function, each a `tests := []struct{...}` table iterated with `t.Run(tt.name, ...)`. Leave the body a `t.Skip` so the file compiles and `go test` runs green until the user fills assertions in — the analog of a todo stub. Name each case for the behavior it pins.

Example shape (stdlib, matching the starter):

```go
package foo

import "testing"

func TestParse(t *testing.T) {
	tests := []struct {
		name    string
		input   string
		want    int
		wantErr bool
	}{
		{name: "valid input", input: "42", want: 42},
		{name: "empty input", input: "", wantErr: true},
		{name: "non-numeric", input: "x", wantErr: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Skip("TODO: call Parse and assert want/wantErr")
		})
	}
}
```

### 5. Write the file

Write to `<source>_test.go`. Confirm it compiles: `go vet ./<pkg>` (or the pre-fetched test task with `-run TestNothing` to compile without running).

## Rules

- Table-driven with `t.Run` subtests — this repo's ADR-023 convention. No one-assertion-per-`func Test` sprawl.
- Bodies are `t.Skip("TODO: ...")` stubs ONLY. Do NOT write assertions — the user fills those in — but the file MUST compile and pass.
- Match the package's existing assertion library exactly; never add testify to a stdlib package.
- If the target has no exported symbols (a `main` package or side-effect-only file), say so and suggest the behavior worth an integration test instead.
- Generated code (`*_templ.go`, `internal/database/*.sql.go`) is not hand-tested — decline and point at the source of truth (`.templ`, `sql/queries/`).
