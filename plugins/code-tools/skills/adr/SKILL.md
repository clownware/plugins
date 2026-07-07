---
name: adr
description: "Creates Architecture Decision Records. Use when asked to create an ADR, document a decision, record an architectural choice, or when a decision warrants formal documentation."
allowed-tools: Bash, Read, Write, Glob, Grep
---

Create an Architecture Decision Record for: $ARGUMENTS

## Project ADR context (pre-fetched)

**Highest existing ADR number:** !`out=$(ls docs/adr/ 2>/dev/null | grep -oE '^[0-9]+' | sort -n | tail -1); echo "${out:-none}"`
**Template exists:** !`test -f docs/adr/template.md && echo "yes — read it before writing" || echo "no — use default format"`
**Existing ADRs:** !`out=$(ls docs/adr/ 2>/dev/null | grep '\.md$' | grep -v template); echo "${out:-no existing ADRs}"`
**ADR directory exists:** !`test -d docs/adr && echo "yes" || echo "no — create docs/adr/ first"`

## Steps

### 1. Calculate the next ADR number

Take the highest existing number from above and add 1. Zero-pad to 3 digits (e.g., 036, 037).

If no ADRs exist, start at 001.

### 2. Load the template

If `docs/adr/template.md` exists, read it and follow its exact structure, frontmatter format, and section headings.

If no template exists, use this default format:

```markdown
---
title: "ADR-NNN: Title Here"
description: >-
  Plain text summary of the decision
lastUpdated: YYYY-MM-DDT00:00:00.000Z
---

## Status

Proposed

## Context

[What issue are we seeing that motivates this decision?]

## Decision Drivers

- **Driver 1**: [e.g., Performance requirements]
- **Driver 2**: [e.g., Developer experience]

## Considered Options

### Option 1: [Name]

**Pros:** ...
**Cons:** ...

### Option 2: [Name]

**Pros:** ...
**Cons:** ...

## Decision

We will go with **Option X** because [justification].

## Consequences

### Positive
- [What becomes easier]

### Negative
- [What becomes harder]

## Validation

- **Metric 1**: [How we'll know this was right]

## References

- [Related ADRs, docs, discussions]
```

### 3. Generate the ADR

- File name: `NNN-kebab-case-title.md` (e.g., `036-caching-strategy.md`)
- Use today's date for `lastUpdated`
- First heading must be `## Status` (h2, never h1 — most docs pipelines render the title from frontmatter). If existing ADRs carry pipeline-specific frontmatter (e.g. Starlight's `pagefind`/`tableOfContents`), copy those fields from them.
- Status should be `Proposed` unless the user says the decision is already accepted
- Cross-reference any related existing ADRs in the References section

### 4. Ask before writing

Show the user the proposed ADR content. Confirm before writing the file. They may want to adjust the context, add options, or change the decision.

## Rules

- Follow the project's template exactly if one exists. Don't add sections it doesn't have or skip sections it requires.
- The title in frontmatter must use the `ADR-NNN:` prefix with a hyphen (not a space or period).
- Use the repo's actual package manager in any script references — check the lockfile (pnpm-lock.yaml, package-lock.json, yarn.lock, bun.lockb) rather than assuming.
- If the user provides the decision but not the alternatives, still include a "Considered Options" section — ask what was considered or note the alternatives you can infer.
