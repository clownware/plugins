---
name: design-audit
description: "Audits a design system or token-based UI codebase: token-bridge sync, dead/undefined/bypassed tokens, hardcoded colors (hex AND rgba/hsl literals) outside token files, WCAG contrast computed from the palette, the system's own stated brand rules checked against its code, reduced-motion gating, asset reference integrity, and drift between duplicated constants. Use when asked to audit a design system, review design tokens, check brand or style consistency, validate a component library's styling, or assess design accessibility."
allowed-tools: Bash, Read, Glob, Grep
---

Audit the design system in this repository. Focus, if given: $ARGUMENTS

## System inventory (pre-fetched)

**Token definition files:** !`out=$(grep -rl -- '--[a-zA-Z][a-zA-Z0-9-]*:' --include='*.css' . 2>/dev/null | grep -v node_modules | head -8); echo "${out:-none found — look for SCSS/JS token sources or hardcoded styling (itself a finding)}"`
**Token bridge (JSON):** !`out=$(find . -maxdepth 3 \( -name "base.json" -o -name "tokens.json" -o -name "design-tokens.json" -o -name "theme.json" \) -not -path "*/node_modules/*" 2>/dev/null | head -3); echo "${out:-none}"`
**Stated rules / brand docs:** !`out=$(ls SKILL.md readme.md README.md STYLE.md BRAND.md 2>/dev/null; find docs -maxdepth 2 -iname "*brand*" -o -iname "*design*" 2>/dev/null | head -3); echo "${out:-none — infer the rules from the tokens themselves}"`
**Theme scopes:** !`out=$(grep -rlE 'data-theme|prefers-color-scheme|\.dark\b|\.light\b|\.on-dark\b' --include='*.css' . 2>/dev/null | grep -v node_modules | head -5); echo "${out:-single theme}"`
**Specimen/preview pages:** !`out=$(find . \( -name "*.card.html" -o -name "*.stories.*" -o -iname "*specimen*" \) -not -path "*/node_modules/*" 2>/dev/null | head -8); echo "${out:-none found}"`

## Pipeline

### 1. Learn the system's own laws

Read the brand/design docs first and extract the system's OWN rules — accent or brand-color discipline, banned patterns (emoji, gradients, shadows), type-role assignments, motion policy, naming conventions. The audit judges the code against the system's stated intent, not your taste. Collect every checkable claim while reading (things "kept in sync", documented constants like path lengths or ratios, "always"/"never" statements): claims are the cheapest source of high-value findings, because nobody re-verifies them after they're written.

### 2. Integrity checks — script them, don't eyeball them

Write and run small scripts (Python/shell) for each; report only what the script output shows:

- **Bridge sync**: parse the token JSON and the CSS custom properties; compare value-by-value in both directions. "Hand-synced" bridges drift silently.
- **Dead and undefined tokens**: tokens defined but consumed nowhere; tokens consumed but defined nowhere. Dead semantic tokens deserve a second look — see bypass below.
- **Semantic bypass**: a semantic token that exists for a specific consumer (`--waveform` for the waveform, `--text-onAccent` for on-accent text) while that consumer uses the raw palette token directly. The indirection the system promises isn't real.
- **Asset reference integrity**: every relative `url()`, `src=`, `href=` resolves to a file on disk. Migrations (renames, format conversions) leave dangling refs.
- **Duplicate-constant drift**: constants embedded in multiple places (inline SVG paths, self-contained demo pages, magic numbers copied into components) — extract every copy and diff against the master. Copies drift the moment the master changes.

### 3. Hardcoded values sweep

Grep for hex literals AND `rgb()/rgba()/hsl()` literals AND named CSS colors outside the token files. A hex-only sweep misses `rgba(10,10,11,.6)` — which is a palette color hardcoded with an alpha, the exact thing channel-based tokens exist to replace. Two exemptions to check in context before reporting: displayed value labels in specimen/documentation pages (text content, not styling), and self-contained artifacts that cannot import tokens by design (note them, don't flag them).

### 4. Accessibility — compute, never eyeball

Convert the palette to RGB and compute WCAG relative-luminance contrast for every semantic foreground/background pairing in every theme: 4.5:1 for body text, 3:1 for large text and UI component boundaries. Judging contrast from how a ramp "looks" is how muted-but-unreadable ships. Report each failing pair with its computed ratio and the smallest token change that would clear the bar. Pay attention to link colors at rest and "muted"/"faint" text that carries real content.

### 5. Motion policy

Every `@keyframes`/`animation` must sit behind a `prefers-reduced-motion` gate (or a documented class-based mirror of it). If the system bans infinite loops in product UI, verify loops exist only in explicitly marked demo/capture contexts.

### 6. Render check (when a browser or preview tool is available)

Serve the folder (`python3 -m http.server`) and render every specimen/card page through a single iframe-harness page that collects JS errors and blank bodies — one navigation instead of dozens. If no browser access is available, skip and say so: unrendered specimens are unverified coverage, not a pass.

### 7. Report

1. **TLDR verdict** — overall health in two or three sentences
2. **Findings by severity** (high/medium/low), each cited as `file:line`, labeled **verified** (script output / computed ratio) or **unverified**
3. **What's done well** — name the good patterns so a later fix pass doesn't erode them
4. **Priority order** — mechanical fixes first; contradictions needing a maintainer decision separated and framed as the decision they are

## Rules

- **Assessment only.** The report is the deliverable; the user decides what becomes a fix. Mid-audit edits also invalidate your own line citations.
- A finding without a `file:line` location is an opinion — cite everything.
- Execute or compute every claim you report: contrast by math, sync by parsing, references by resolving, drift by diffing. Confident reading is where audits go wrong.
- The system's own rules are the yardstick. Where stated rules and code disagree, report the contradiction and frame the choice (amend the rule vs change the code) — that resolution belongs to the maintainer, not the audit.
- Degrade gracefully: no token bridge, no docs, or a single theme narrows scope — it isn't a blocker, and "no written rules" is itself a finding.
- Report out-of-scope discoveries in a separate "Found Work" section; don't silently fix or silently drop them.
