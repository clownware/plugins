---
name: audit-fix
description: "Applies the findings of an audit report (from arch-audit, security-audit, test-audit, design-audit, skill-audit, or any report with ranked findings): executes the mechanical fixes with exact-match edits, re-runs the report's own verification methods, and surfaces maintainer decisions as decisions instead of resolving them silently. Use when asked to apply audit findings, run the fix pass, make the recommended fixes or enhancements, or when handed an audit report and told to act on it."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Apply the audit report's findings. Report location or focus, if given: $ARGUMENTS

## Repo state (pre-fetched)

**Working tree:** !`if git rev-parse --git-dir >/dev/null 2>&1; then out=$(git status --short | head -10); echo "${out:-clean}"; else echo "not a git repo — fixes cannot be cleanly reverted; flag this to the user before editing"; fi`
**Branch:** !`b=$(git branch --show-current 2>/dev/null); echo "${b:-detached HEAD or not a git repo}"`

## The report is the contract

Locate the report first: $ARGUMENTS may name a file, or the report may be earlier in
the conversation. Read all of it before touching anything — the fix list, the
"what's done well" section (things you must NOT erode), and the verification methods
it used. If there is no report, stop and say so: this skill applies findings, it does
not find them. Run the matching audit skill first.

## Pipeline

### 1. Split the findings into three buckets

- **Mechanical** — the fix is fully specified or derivable with no judgment: a value
  the report computed, a literal to replace with a token, a dead fallback to rewrite,
  a documented-but-false claim to reword. Audit-suite reports separate these
  explicitly ("mechanical, no judgment required").
- **Decisions** — the report frames a choice (amend the rule vs change the code; add
  a variant vs document an exception). If the user's instruction resolved a decision
  ("use your recommended direction", "amend the rule"), record which way and why —
  otherwise leave it untouched and carry it to the final summary.
- **Out of scope** — found-work items and anything the report itself excluded. Never
  apply these silently, even when they look easy; list them at the end.

If the report doesn't separate mechanical from decisions, classify each item yourself
and say in the summary which bucket you put it in — misclassifying a decision as
mechanical is the main way a fix pass causes damage.

### 2. Apply mechanical fixes with exact-match edits

Work from the report's own citations. For each item: read the cited lines, build the
edit as an exact old-string → new-string replacement, and **assert the old string
exists before replacing** (a scripted pass should fail loudly on a stale citation,
not skip silently — the file may have changed since the audit). Batch related fixes
per file. Match the surrounding code's style; do not refactor beyond what the finding
requires, and do not "improve" anything the report praised.

When a fix needs a computed value (a contrast-passing color, a corrected constant),
recompute it — don't trust the report's arithmetic blindly, and don't eyeball your
own. If your computed value disagrees with the report's, use yours and note the
discrepancy.

### 3. Re-verify with the report's own methods

A fix pass is only done when the audit that produced the report would come back
clean on the fixed items. Re-run the verification the report used, scripted:

- computed checks (contrast ratios, sync parses, path resolution) — recompute against
  the new state, including any knock-on pairs your fixes created
- sweeps (hardcoded literals, dead tokens, dangling references) — re-run the sweep,
  not just a spot check of the lines you touched
- render/execution checks — re-run them if the report ran them; if the report skipped
  one for lack of tooling, skip it and say so

If a fix fails re-verification, iterate on that fix before moving on — never report
a failing item as applied.

### 4. Summarize as a ledger

End with a table the user can act on: **applied** (finding → change, verified how),
**skipped** (and why — stale citation, failed verification, blocked), **decisions
still open** (the choice, restated as a choice), **out of scope** (untouched
found-work). Offer a conventional commit (`fix(<scope>): apply <audit> findings`)
but only commit if the user has asked for commits in this session.

## Rules

- **The report's "what's done well" list is a do-not-touch list.** Fix passes erode
  good patterns by being thorough in the wrong direction.
- **Decisions stay decisions.** Applying a maintainer choice without instruction is
  the one unforgivable failure mode of this skill; when in doubt, put it in the
  open-decisions column.
- Assert-before-replace on every edit; a stale citation means re-read the file and
  re-derive the fix, not force the edit.
- Re-verify by the report's own methods before claiming anything is fixed — compute,
  sweep, render; never eyeball.
- Keep fixes minimal and in-style; the diff should read as "the audit findings,
  applied" and nothing else.
- If the working tree was dirty at start, say so in the summary — the user needs to
  know the fix diff is entangled with other changes.
