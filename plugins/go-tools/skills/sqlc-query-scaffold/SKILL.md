---
name: sqlc-query-scaffold
description: "Scaffolds a new sqlc query in sql/queries/ and its repository seam, following go-performance-starter's data-access pattern (ADR-003). Use in Go projects using sqlc when asked to add a query, add a database method, add a repository method, or add data access for a table."
allowed-tools: Bash, Read, Write, Glob, Grep
---

Add an sqlc query (and its repository method) for: $ARGUMENTS

## Data-access context (pre-fetched)

**sqlc config:** !`out=$(ls sqlc.yaml sqlc.yml sqlc.json 2>/dev/null | head -1); echo "${out:-no sqlc config found — this repo does not use sqlc; hand-written SQL in handlers is a different pattern, stop and confirm}"`
**Query files:** !`out=$(find sql/queries -name "*.sql" 2>/dev/null | sort | head -20); echo "${out:-no sql/queries/*.sql — read the sqlc config queries path before scaffolding}"`
**Schema files:** !`out=$(find sql/schema sql/migrations -name "*.sql" 2>/dev/null | sort | head -20); echo "${out:-no sql/schema or sql/migrations — locate the schema so column names are real}"`
**Generate task:** !`out=$( { grep -Eq "db:generate" Taskfile.yml 2>/dev/null && echo "task db:generate"; } || { command -v sqlc >/dev/null 2>&1 && echo "sqlc generate"; } ); echo "${out:-neither a db:generate task nor the sqlc CLI found — install sqlc or find the generate step}"`
**Repository seam:** !`out=$(find internal/repository -maxdepth 1 -name "*.go" 2>/dev/null | sort | head -20); echo "${out:-no internal/repository — the generated querier may be used directly; check how existing code reaches the DB}"`

## Rule this enforces

All DB access goes through sqlc-generated queries behind the repository interfaces (ADR-003). Hand-written SQL strings in handlers are forbidden. A new query means: SQL in `sql/queries/`, regenerate, then expose it through the repository interface — never a raw string in a handler.

## Steps

### 1. Confirm the schema backs the query

Read the relevant schema/migration file. Every column and table you reference must already exist. If the query needs a column that does not exist yet, stop — that is a migration (`sql/migrations/`), a separate and larger change; surface it, do not invent columns.

### 2. Read one existing query file to match style

Pick the query file for the same table (or the closest one). Match:
- The `-- name: XxxYyy :one|:many|:exec|:execrows` annotation form
- Explicit column lists vs `SELECT *` (this repo mixes both — follow the neighbouring file)
- Owner-scoping conventions (e.g. `WHERE id = $1 AND user_id = $2` for user-owned rows)
- Parameter numbering (`$1`, `$2`, …) and `RETURNING` shape on writes

### 3. Write the query

Append to the appropriate `sql/queries/<table>.sql`. Choose the annotation deliberately:

| Suffix | Returns | Use for |
|---|---|---|
| `:one` | single row | insert/update with `RETURNING`, get-by-id |
| `:many` | slice of rows | list/filter |
| `:exec` | nothing | delete, fire-and-forget update |
| `:execrows` | rows-affected count | when the caller needs the count |

### 4. Regenerate

Run the generate step from the pre-fetched context (`task db:generate`). This rewrites `internal/database/*.sql.go` and `querier.go`. Never hand-edit generated files. If generation fails, the SQL is wrong — fix the query, not the output.

### 5. Expose it through the repository

Add the method to the matching `internal/repository/<entity>.go` interface, then implement it in the concrete adapter (e.g. `internal/repository/postgres/`), delegating to the generated querier. Keep the interface signature in domain terms (`uuid.UUID`, domain structs), not raw `database.XxxParams`, when the surrounding interfaces do.

### 6. Verify

Run `task ci` (or `go build ./... && go test ./...`). If a table-driven test is expected for new repository logic (ADR-023), scaffold it — the `test-scaffold` skill covers that.

## Rules

- SQL lives in `sql/queries/`, never as a string literal in a handler or service (ADR-003).
- Do not hand-edit anything under `internal/database/` — it is generated; regenerate instead.
- Never add a column that the schema does not have — that is a migration, surfaced separately.
- Owner-scope user-owned rows in the `WHERE` clause; do not rely on the caller to filter.
