---
name: a11y-audit
description: "Audits functional accessibility beyond color: keyboard operability (click handlers on non-focusable elements, fake buttons), focus traps and invisible focus, accessible names and ARIA integrity (unnamed icon buttons, dangling aria references, invalid roles), zoom blocking, heading structure, and media alternatives — with a live keyboard pass when a browser tool is available. Use when asked for an accessibility audit, a11y review, WCAG check, screen-reader review, or whether something is keyboard accessible. Complements design-audit, which owns computed color contrast."
allowed-tools: Bash, Read, Glob, Grep
---

Audit this repository's functional accessibility. Focus, if given: $ARGUMENTS

## Surface inventory (pre-fetched)

**Markup/component files:** !`out=$(find . \( -name "*.html" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.vue" -o -name "*.svelte" \) -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null | wc -l | tr -d ' '); echo "$out files (0 means no markup surface — say so and stop)"`
**Framework hints:** !`out=$(grep -lE '"react"|"preact"|"vue"|"svelte"' package.json 2>/dev/null; find . -maxdepth 2 -name "*.jsx" -o -maxdepth 2 -name "*.vue" 2>/dev/null | head -1); echo "${out:-plain HTML or undetected — sweep both attribute spellings}"`
**Interactive-handler density:** !`out=$(grep -rlE 'onClick|onclick=|@click|on:click' --include='*.html' --include='*.jsx' --include='*.tsx' --include='*.vue' --include='*.svelte' . 2>/dev/null | grep -v node_modules | head -8); echo "${out:-none found}"`

## Scope

This skill owns **functional** accessibility. Color contrast is design-audit's job —
computed, not eyeballed — so cross-reference it rather than duplicating it. Framework
awareness matters everywhere: JSX spells it `onClick`/`tabIndex`/`aria-*` props,
HTML spells it `onclick`/`tabindex`; sweep the spellings the inventory says exist.

Static analysis produces **candidates, not findings**. Before reporting anything,
read the surrounding code: a `div` with `onClick` whose only child is a real
`<button>` is a styling wrapper, not a violation; a `Tab`-capturing keydown inside a
`role="dialog"` with an Escape path is a correct modal, not a trap. The
zero-false-positive bar is the whole game — an a11y report that cries wolf gets
ignored, and then the real wolves get shipped.

## Pipeline

### 1. Keyboard operability sweep (WCAG 2.1.1)

Hunt elements that accept pointer input but exclude keyboards:

- click/press handlers (`onClick`, `onclick=`, `@click`, `on:click`) on elements that
  are not natively interactive (`div`, `span`, `svg`, `img`, `li`, `tr`) **without**
  all three of: `tabindex`/`tabIndex` reaching 0, an interactive `role`, and a key
  handler (or delegation to a native control inside)
- interactive `role`s (`button`, `checkbox`, `switch`, `tab`, `link`…) on
  non-focusable elements
- positive `tabindex` values (order hijacking) and `tabindex` on non-interactive
  content

For components (React/Vue/Svelte), audit the component source once, then treat every
render site as covered or broken with it — cite the component, list the sites.

### 2. Names and ARIA integrity (WCAG 4.1.2)

- buttons/links whose only content is an icon (`svg`, icon font, image) with no
  `aria-label`, `aria-labelledby`, `title`, or visually-hidden text
- `img` without `alt` (empty `alt=""` is valid for decoration — check intent);
  form controls without an associated label
- every `aria-labelledby`/`aria-describedby`/`aria-controls` id must resolve in the
  same document — script this, don't eyeball it
- `role` values that exist in ARIA; `aria-hidden="true"` on focusable elements
  (invisible-but-tabbable ghosts)

### 3. Focus: traps and visibility (WCAG 2.1.2, 2.4.7)

- keydown handlers that `preventDefault()` on `Tab`: legitimate only inside a
  modal context (`role="dialog"`/`aria-modal`) that also provides an escape route
  (Escape handler, close control) — anything else is a trap
- `outline: none`/`outline: 0` (and `outline-none` utility classes) without a
  visible replacement (`:focus`/`:focus-visible` styles, focus box-shadow) in the
  same component or stylesheet
- `autofocus` that hijacks page entry into a widget

### 4. Structure, zoom, media

- `<meta name="viewport">` containing `user-scalable=no` or `maximum-scale` below 2
  (zoom blocking, WCAG 1.4.4) — an instant high-severity finding
- missing `lang` on `<html>`; missing/empty `<title>`; heading-level jumps that
  skip levels (h1 → h3) in authored page flow
- `video`/`audio` without captions/controls; autoplaying media

### 5. Live keyboard pass (when a browser tool is available)

Serve and open the pages; Tab through each: every interactive element must receive
focus in a sensible order with a visible indicator, activate on Enter/Space, and
every overlay must release focus on Escape. When no browser is available, skip and
say so explicitly — static analysis cannot prove focus visibility or real tab order,
so those items are **unverified coverage, not a pass**.

### 6. Report

House audit shape: **TLDR verdict** → **findings by severity** cited `file:line`,
each labeled verified (read in context / scripted / operated live) or unverified,
with the WCAG criterion it fails → **what's done well** (name the components that
get it right so fixes copy them) → **priority order**, mechanical first, judgment
calls (e.g. "is this list decorative or content?") framed as decisions.

## Rules

- **Assessment only.** Report and rank; fixing is /audit-fix's job or the user's call.
- **Zero false positives beats total recall.** Read every candidate in context; when
  a pattern is defensible, either verify the defense holds or report it as a
  question, not a finding.
- Cite the component source for component-based findings and enumerate affected
  render sites — one fix, many sites is the useful framing.
- Script the mechanical checks (id-reference integrity, attribute sweeps); read the
  judgment calls. Label which was which.
- Static-only runs must say what a live pass would have added; never present
  unrendered keyboard behavior as verified.
- Report out-of-scope discoveries (contrast, performance, security) in a Found Work
  section — don't silently absorb or drop them.
