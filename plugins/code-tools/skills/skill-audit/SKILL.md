---
name: skill-audit
description: "Audits Claude Code skills (SKILL.md files) for correctness and best practices — dead shell fallbacks in pre-fetched context, description/triggering quality, name collisions across plugins, stack leakage, context-budget risks, and tool scoping. Use when asked to audit skills, review a skill, check a plugin's skills, lint SKILL.md files, or assess skill or plugin quality."
allowed-tools: Bash, Read, Glob, Grep
---

Audit the Claude Code skills in this repository. Focus, if given: $ARGUMENTS

## Skill inventory (pre-fetched)

**SKILL.md files:** !`out=$(find . -name SKILL.md -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null | sort); echo "${out:-none found — nothing to audit; tell the user and stop}"`
**Plugin manifests:** !`out=$(find . -name plugin.json -path "*/.claude-plugin/*" -not -path "*/node_modules/*" 2>/dev/null | sort); echo "${out:-none}"`
**Marketplace manifest:** !`out=$(ls .claude-plugin/marketplace.json 2>/dev/null); echo "${out:-none}"`

## Pipeline

Read every SKILL.md in full before reporting anything — findings about collisions and consistency only emerge from seeing the whole set.

### 1. Frontmatter and structure

For each skill check:

- `name` present and matching its directory name
- `description` present (it is the only thing the triggering mechanism ever sees)
- `allowed-tools` scoped to what the body actually does: Write/Edit only if the skill writes files, Agent only if it fans out subagents. Over-scoping widens the blast radius of a misfire; under-scoping breaks the skill at runtime.
- consistency across sibling skills (e.g. a `license` field on some but not others)

### 2. Descriptions and triggering

The description must carry both what the skill does and the concrete phrases that should trigger it — Claude undertriggers skills, so vague descriptions mean the skill never fires. Check each for:

- trigger phrases a real user would type, not just a capability summary
- **collisions**: two skills (across plugins too) with the same name or near-identical descriptions give the trigger mechanism no basis to choose. Differentiators must live in the description, not the body — the body is only read after triggering.
- **over-breadth**: a stack-specific skill whose description matches generic requests ("build a UI element") will misfire in repos using a different stack. The description should name its stack or scope.

### 3. Execute the pre-fetched context commands

This is the highest-yield step, and eyeballing is not enough — run the commands. Extract every `` !`...` `` command from each skill and:

- **Run it in this repo** and read the actual output. Watch for stdout pollution: commands like `git rev-parse --verify <ref>` print a SHA to stdout, so "check then echo a label" chains emit both.
- **Run it where its happy path fails** (a scratch temp dir, or the repo when the probed file is absent) and confirm the fallback actually fires. The classic bug: `cmd | filter || echo "none"` — a pipeline's exit status is its *last* command's, and `head`/`tail`/`sed`/`sort` exit 0 on empty input, so the `|| echo` is dead and the model sees a blank line with no explanation. The fix is capture-then-default: `out=$(cmd | filter); echo "${out:-none}"`.
- Check for missing `2>/dev/null` on probes that may hit nonexistent paths — raw stderr noise ends up in the model's context.

Label each shell finding **verified** with the observed output. A suspected bug you didn't run is a hypothesis, not a finding.

### 4. Context budget

Pre-fetched context is injected wholesale before the skill's instructions run, so unbounded commands can crowd out the instructions themselves. Flag:

- unbounded injections (`git diff` of a whole branch, uncapped `find`/`ls`) with no `head` limit or truncation notice
- pre-fetch lines that duplicate what a body step already reads

### 5. Portability and stack leakage

Compare each skill's claims (its own description, its plugin's manifest) against its contents. A skill that claims to be universal or to "degrade gracefully" must not hardcode one project's stack. Hunt for:

- package-manager or tool mandates ("use pnpm, never npm") that are wrong outside the author's repo
- framework-specific templates, frontmatter, or file layouts presented as universal defaults
- references to one specific project's artifacts (an ADR number, a named config) in a skill shipped for general use
- probes that only understand one ecosystem while the skill claims broader scope

Opinionated defaults are fine when the skill includes an escape hatch ("if the repo differs, follow the repo") — flag the ones that don't.

### 6. Report

Assessment only — the deliverable is the report. Use this structure:

1. **TLDR verdict** — overall health in two or three sentences
2. **Findings by severity** (high/medium/low), each cited as `file:line`, shell findings marked verified with observed output
3. **What's done well** — name the good patterns explicitly so a later fix pass doesn't refactor them away
4. **Priority order** — which fixes are mechanical and cross-cutting (do first) vs. which need a maintainer decision

## Rules

- **Do not fix anything.** The audit is the deliverable; the user decides what becomes a fix. Mid-audit edits also invalidate the line numbers in your own citations.
- A finding without a `file:line` location is an opinion — cite everything.
- Run, don't reason about, every shell command you report on. Shell semantics (pipeline exit codes, stdout vs stderr, glob behavior) are exactly where confident reading goes wrong.
- Findings that repeat across skills are one pattern, not N findings — report the pattern once with all affected locations, so the fix is understood as one change.
- Degrade gracefully: a repo with no plugin manifests but loose SKILL.md files is still auditable; no skills at all is a clean "nothing to audit", not an error.
- If skills here are meant to trigger alongside other installed plugins, note collisions you can see but can't fully verify (you can only read this repo) as unverified.
