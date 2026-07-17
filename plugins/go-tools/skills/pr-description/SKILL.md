---
name: pr-description
description: "Writes pull request descriptions for Go projects built on the go-performance-starter, aware of the task ci quality gate and the docs/adr constitution. Use when creating a PR, writing a PR, drafting a PR description, or summarizing changes for a pull request in a Go project."
allowed-tools: Bash, Read, Grep, Glob
license: MIT
---

Write a pull request description for the current branch.

## Branch context (pre-fetched)

**Base branch:** !`git rev-parse -q --verify main >/dev/null 2>&1 && echo main || { git rev-parse -q --verify master >/dev/null 2>&1 && echo master || echo develop; }`

**Commits on this branch:**
!`BASE=$(git rev-parse -q --verify main >/dev/null 2>&1 && echo main || { git rev-parse -q --verify master >/dev/null 2>&1 && echo master || echo develop; }); out=$(git log "$BASE"...HEAD --oneline 2>/dev/null); echo "${out:-(no commits diverged from $BASE)}"`

**Changed files:**
!`BASE=$(git rev-parse -q --verify main >/dev/null 2>&1 && echo main || { git rev-parse -q --verify master >/dev/null 2>&1 && echo master || echo develop; }); out=$(git diff "$BASE"...HEAD --stat 2>/dev/null); echo "${out:-(no diff found)}"`

**Full diff:**
!`BASE=$(git rev-parse -q --verify main >/dev/null 2>&1 && echo main || { git rev-parse -q --verify master >/dev/null 2>&1 && echo master || echo develop; }); d=$(git diff "$BASE"...HEAD 2>/dev/null); if [ -z "$d" ]; then echo "(no diff found)"; else printf %s "$d" | head -c 20000; [ ${#d} -gt 20000 ] && printf "\n[diff truncated at 20k chars - run git diff \"$BASE\"...HEAD for the rest]\n"; fi`

**PR template:** !`out=$(ls .github/PULL_REQUEST_TEMPLATE.md .github/pull_request_template.md 2>/dev/null | head -1); echo "${out:-none — use the default format below}"`

## Steps

### 1. Use the template if present

If the pre-fetched context found a PR template, read it and follow its structure exactly. Otherwise use this default:

```markdown
## What

[One-sentence summary. Link to related issue if one exists.]

## Why

[Motivation — the problem this solves or value it adds. 2-3 sentences.]

## How

[Implementation approach. Call out non-obvious design decisions and why this approach over alternatives. Organize by area if several were touched.]

## Testing

- [ ] `task ci` passes (fmt + lint + test -race -cover + agents:check + versions:check + binary-size + vuln)
- [ ] New/changed logic has table-driven tests (ADR-023)
- [ ] Manual testing completed

## Checklist

- [ ] Changes are in scope for this branch
- [ ] No new hand-written SQL in handlers — data access goes through sqlc + repository (ADR-003)
- [ ] Server-rendered HTML is templ with typed props, not `html/template` or `map[string]interface{}` (ADR-017)
- [ ] Performance budgets respected (ADR-000) — no binary/JS/CSS/memory budget regressions
- [ ] Config via environment only; no hardcoded secrets (ADR-015)
```

### 2. Write the description

Read through ALL commits above, not just the latest — the description must cover the whole branch. Fill every section. Check each box that the actual diff satisfies; leave unchecked (and note) anything the branch does not yet meet.

### 3. ADR check

If `docs/adr/` exists, check whether the changes touch an area an Accepted ADR governs. Under this repo's constitution, an architectural change that contradicts an Accepted ADR must be reconciled — if the diff introduces a decision no ADR covers, add:

> **Note:** This PR introduces [decision]. Consider recording it in a new ADR (the constitution requires architectural changes to check `docs/adr/` first).

### 4. Output

Print the complete PR description in markdown, ready to paste into GitHub. Do not wrap it in a code fence — output raw markdown.
