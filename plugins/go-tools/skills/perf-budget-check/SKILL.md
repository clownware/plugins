---
name: perf-budget-check
description: "Runs the go-performance-starter's own performance-budget gates against the current working tree and reports pass/fail with headroom: binary size, gzipped JS/CSS asset budgets, and the response-time/startup/memory budget tests (ADR-000). Use in Go projects built on the go-performance-starter when asked to check performance budgets, verify the perf gates before a PR, or see if the branch blows the binary/asset budget."
allowed-tools: Bash, Read, Glob, Grep
---

Check this branch against the project's performance budgets. Focus, if given: $ARGUMENTS

## Budget tooling (pre-fetched)

**Perf tasks:** !`out=$(grep -Eo "^\s+(test:performance|test:binary-size|test:asset-budgets):" Taskfile.yml 2>/dev/null | sed -E "s/^[[:space:]]+//; s/:$//" | tr "\n" " "); echo "${out:-no perf budget tasks in Taskfile.yml — this repo does not carry the starter budget tooling; report that and stop (the universal perf-audit skill is the alternative)}"`
**Budget source:** !`out=$(find internal/performance -name "*.go" 2>/dev/null | head -5); echo "${out:-no internal/performance package — the budget constants live elsewhere or are absent}"`
**Build output:** !`out=$(ls -l dist/app 2>/dev/null); echo "${out:-no dist/app yet — a stripped build is required before the binary gate means anything}"`
**Branch:** !`b=$(git branch --show-current 2>/dev/null); echo "${b:-detached or not a git repo}"`

## What this skill is

The starter already owns its budget logic — the `internal/performance` package (response-time, startup, memory, gzipped-asset checks) plus `scripts/check-binary-size.go`, all wired into `task test:performance`. This skill **orchestrates the repo's own gates and interprets the results**; it never re-implements the arithmetic, because the repo's task is the gate CI applies. If the perf tasks are not present, this is not a starter-derived repo: stop and point at `/perf-audit`.

## The budgets (ADR-000, for interpretation only — the tasks are authoritative)

| Metric | Budget | Basis |
|---|---|---|
| Binary size (linux, stripped `-s -w`) | < 20MB | `dist/app` |
| JavaScript | < 50KB | gzipped |
| CSS | < 30KB | gzipped |
| Memory (steady state) | < 128MB | runtime |
| P95 / P99 response | < 100ms / < 200ms | perf test |
| Startup | < 500ms | perf test |

## Pipeline

### 1. Ensure the thing being measured exists and is fresh

The binary and asset gates measure build artifacts. `task test:binary-size` and `task test:asset-budgets` build them fresh themselves (a stripped `dist/app`; `css:build` before the asset gate), so run the task rather than measuring a stale `dist/app` by hand. Never report a size off a stale artifact silently — that is how a passing report lies.

### 2. Run the gates, capture everything

Run `task test:performance` (binary size + gzipped asset budgets + the `internal/performance` budget tests) and capture full output. If `$ARGUMENTS` scopes to one gate, run just that task (`task test:binary-size` or `task test:asset-budgets`). Report each task's own verdict verbatim — the task is the authority — then translate: per budget, actual vs limit and headroom or overage.

### 3. Attribute any overage

For a binary overage, the usual movers are a heavy new dependency or dropped `-ldflags="-s -w"` — check `go build` flags and recent `go.mod` additions (`git diff main -- go.mod`). For an asset overage, identify the largest gzipped contributor under the built CSS/JS output. State the basis in every number: binary is raw stripped bytes; JS/CSS budgets are **gzipped** — never mix the two.

### 4. Report

Compact and decision-shaped: **verdict line** (all gates green / N failing) → per-gate table (gate, verdict, actual vs limit, headroom) → what on this branch moved the numbers (`git diff main --stat` when main is local) → next actions, separating "shrink the artifact" from "raise the budget". A budget raise is an ADR-000 change and a halt-worthy decision under this repo's constitution — present it as a decision needing a written why, not a quick edit.

## Rules

- The repo's tasks are the authority; this skill's arithmetic only explains their verdicts, never overrides them.
- Never measure a stale build; the tasks rebuild — run them, do not hand-measure `dist/app`.
- JS/CSS are gzipped budgets, binary is raw stripped bytes — state the basis in every figure.
- A budget overage is a finding; raising a budget is an ADR-000 decision — present it that way.
- Read-only toward budgets and thresholds: never edit the constants in `internal/performance` or the scripts to make a gate pass.
