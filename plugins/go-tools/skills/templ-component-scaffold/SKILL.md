---
name: templ-component-scaffold
description: "Scaffolds a new templ page, partial, or component in internal/view/ following the typed-props conventions from go-performance-starter (ADR-017). Use in Go projects with templ when asked to create a templ page/partial/component, add a view, build a UI element, or scaffold a screen."
allowed-tools: Bash, Read, Write, Glob, Grep
license: MIT
---

Scaffold a new templ view for this project: $ARGUMENTS

## Current conventions (pre-fetched)

**View directory layout:**
!`out=$(find internal/view -type f -name "*.templ" 2>/dev/null | sort | head -40); echo "${out:-no internal/view/*.templ found — this repo is not laid out like the go-performance-starter; confirm where templ views live before scaffolding}"`
**Props + render helpers:**
!`out=$(ls internal/view/props.go internal/view/render.go 2>/dev/null); echo "${out:-no internal/view/props.go or render.go — read the repo layout for the props/render pattern before scaffolding}"`
**templ generate task:**
!`out=$( { grep -Eq "templ:generate" Taskfile.yml 2>/dev/null && echo "task templ:generate"; } || { command -v templ >/dev/null 2>&1 && echo "templ generate"; } ); echo "${out:-neither a templ:generate task nor the templ CLI found — install templ or find the generate step}"`

## Before scaffolding

1. Read one existing example of the kind you are creating (from the pre-fetched list) to match style.
2. Read `internal/view/props.go` (`BaseProps`, `NewBaseProps`) and `internal/view/render.go` (`Render`, `IsHTMXRequest`).

## Decide the kind

| Kind | Location | Wraps layout? | Use for |
|---|---|---|---|
| **page** | `internal/view/pages/` | Yes — `@layouts.Base(...)` | A full route rendered on direct navigation |
| **partial** | `internal/view/partials/` | No | An HTMX fragment swapped into a page |
| **component** | `internal/view/components/` | No | A reusable element (button, input, card) composed by pages/partials |

If the pre-fetched layout differs from this table, follow the existing layout instead of imposing this one.

## Rules

- Define a props struct with **concrete types**. Pages embed `view.BaseProps`. Never `map[string]interface{}` (ADR-017).
- Pages call `@layouts.Base(props.BaseProps) { ... }`. Partials and components render standalone so HTMX fragments are correct.
- Accessibility: semantic HTML, labelled inputs, ARIA only where semantics fall short. Mobile-first responsive Tailwind.
- Prefer server-rendered HTMX; add Alpine.js only for light client-only interactivity. Pages must work as progressive enhancement.
- Styling via Tailwind utility classes / existing semantic color tokens — no inline styles, no hardcoded colors.

## After scaffolding

1. Add the props struct to `internal/view/props.go` (or alongside the component) with concrete fields.
2. Run the templ generate step from the pre-fetched context to produce the `*_templ.go`. Never hand-edit generated files.
3. If it's a page, wire the handler to call `view.Render(w, r, status, pages.Foo(props))`, branching on `view.IsHTMXRequest(r)` when a partial variant exists.
4. Run `task ci` before claiming done (falls back to `go build ./... && go test ./...` if there is no Taskfile).
