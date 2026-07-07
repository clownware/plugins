---
name: pr-description
description: "Writes pull request descriptions. Use when creating a PR, writing a PR, drafting a PR description, summarizing changes for a pull request, or when asked to describe what changed on this branch."
allowed-tools: Bash, Read, Grep, Glob
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

### 1. Check for a PR template

Look for `.github/PULL_REQUEST_TEMPLATE.md` in the repo root. If it exists, read it and use its structure exactly.

### 2. Write the description

Read through ALL commits above, not just the latest. The PR description must cover the entire branch.

If a PR template was found, follow its structure. Otherwise, use this default format:

```markdown
## What

[One-sentence summary. Link to related issue if one exists.]

## Why

[Motivation — what problem this solves or what value it adds. Keep it to 2-3 sentences max.]

## How

[Implementation approach. Call out non-obvious design decisions — why you chose this approach over alternatives. If multiple areas were changed, organize by area.]

## Testing

- [ ] Quality checks pass
- [ ] Manual testing completed
- [ ] [Add specific test items based on what changed]

## Checklist

- [ ] Changes are in scope for this branch
- [ ] No security vulnerabilities introduced
- [ ] Type checks pass (skip if not applicable)
- [ ] Tests added/updated for new functionality
```

### 3. ADR check

If `docs/adr/` exists in the repo, check whether any changes touch areas covered by existing ADRs. If changes introduce a new architectural decision that isn't covered by an existing ADR, add a note:

> **Note:** This PR introduces [decision]. Consider documenting this in a new ADR.

### 4. Output

Print the complete PR description in markdown, ready to paste into GitHub. Do not wrap it in a code fence — output raw markdown.
