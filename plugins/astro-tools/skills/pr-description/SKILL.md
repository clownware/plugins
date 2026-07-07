---
name: pr-description
description: "Writes pull request descriptions following the project's PR template, for Astro projects built on the astro-performance-starter template. Use when creating a PR, writing a PR, or summarizing changes for a pull request in an Astro project."
allowed-tools: Bash, Read, Grep, Glob
license: MIT
---

Write a pull request description for the current branch.

## Branch context (pre-fetched)

**Base branch:** !`git rev-parse -q --verify develop >/dev/null 2>&1 && echo develop || { git rev-parse -q --verify main >/dev/null 2>&1 && echo main || echo master; }`

**Commits on this branch:**
!`BASE=$(git rev-parse -q --verify develop >/dev/null 2>&1 && echo develop || { git rev-parse -q --verify main >/dev/null 2>&1 && echo main || echo master; }); out=$(git log "$BASE"...HEAD --oneline 2>/dev/null); echo "${out:-(no commits diverged from $BASE)}"`

**Changed files:**
!`BASE=$(git rev-parse -q --verify develop >/dev/null 2>&1 && echo develop || { git rev-parse -q --verify main >/dev/null 2>&1 && echo main || echo master; }); out=$(git diff "$BASE"...HEAD --stat 2>/dev/null); echo "${out:-(no diff found)}"`

**Full diff:**
!`BASE=$(git rev-parse -q --verify develop >/dev/null 2>&1 && echo develop || { git rev-parse -q --verify main >/dev/null 2>&1 && echo main || echo master; }); d=$(git diff "$BASE"...HEAD 2>/dev/null); if [ -z "$d" ]; then echo "(no diff found)"; else printf %s "$d" | head -c 20000; [ ${#d} -gt 20000 ] && printf "\n[diff truncated at 20k chars - run git diff \"$BASE\"...HEAD for the rest]\n"; fi`

## Steps

### 1. Read the PR template

If `.github/PULL_REQUEST_TEMPLATE.md` exists, read it and follow its structure exactly. In starter-derived repos the template has these sections:

- **What** — brief description, link to issue
- **Why** — motivation, problem solved
- **How** — implementation approach, non-obvious design decisions
- **Testing** — checkboxes for `pnpm run check`, `pnpm run lint`, manual testing
- **Checklist** — ADR-035 scope, performance budgets, no `client:load` without ADR, design tokens, TypeScript strict, accessibility
- **Screenshots** — before/after for UI changes

If no template exists, use the **What / Why / How / Testing** sections above and skip the checklist.

### 2. Write the description

Read through ALL commits above, not just the latest. The PR description must cover the entire branch.

Fill out every section of the template. For the checklist, check each box that applies based on the actual changes.

Call out non-obvious design decisions in the **How** section. If there were alternatives you considered, mention why this approach was chosen.

### 3. ADR check

Check whether changes touch areas covered by existing ADRs in `docs/adr/`. If changes introduce a new architectural decision not covered by an existing ADR, add a note:

> **Note:** This PR introduces [decision]. Consider documenting this in a new ADR.

### 4. Output

Print the complete PR description in markdown, ready to paste into GitHub. Do not wrap it in a code fence — output raw markdown.
