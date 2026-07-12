# Roadmap

Light specs for upcoming skills. Each entry is a proposal, not a commitment — enough
shape to start building without re-deriving intent, small enough to change freely.
Specs graduate to a skill directory when work starts; entries here stay one screen or less.

Every new skill inherits the [house authoring standards](MAINTAINING.md#skill-authoring-standards)
regardless of what it does.

## Graduated

- **`audit-fix`** — shipped in code-tools v0.8.0; validated by a blind run against the
  design-audit report at the pre-fix commit (see MAINTAINING standard 5).
- **`plugin-release`** — shipped in code-tools v0.9.0; blind dry-run validation also
  surfaced the empty-delta guard (refuse to cut a release the git log doesn't support).
- **`a11y-audit`** — shipped in code-tools v0.10.0; blind validation caught all seeded
  fixture defects and the real pre-fix Checkbox/MetaRow with zero false positives on
  the fixed twins (including the legitimate-modal focus-trap exemption).
- **`skill-validate`** — shipped in code-tools v0.11.0; validated recursively by its own
  first production run (an agent followed it, blind sub-agents included, to validate
  deps-audit). Its observed stall mode (idling with unscored children) is codified.
- **`deps-audit`** — shipped in code-tools v0.11.0; 5/5 seeded defects, 5/5 correct
  absences, zero false positives, with config-referenced-dependency discrimination.
- **`perf-audit`** — shipped in code-tools v0.11.0; 5/5 seeds including running the
  fixture's own failing gate; enforced/observed/decorative classification exact.
- **`perf-budget-check`** — shipped in astro-tools v0.3.0; the blind run correctly
  refused to report stale-build numbers its own author's ground-truth run had
  accepted, and stopped gracefully on a non-starter repo.

## Later — worth doing, not yet urgent

*(empty — the full original slate has shipped; propose the next round when real
pain motivates it)*

## Open decisions (tracked, unscheduled)

- **`pr-description` name collision** — both plugins ship a skill with this name;
  descriptions now differentiate them, but a rename (`astro-pr-description`) remains
  the cleaner fix at the cost of breaking `/pr-description` muscle memory.
- **`license` frontmatter policy** — astro-tools skills carry `license: MIT`,
  code-tools skills carry none; pick one convention and apply it in a single pass.
- **`Bash` in `allowed-tools` for pre-fetch-only skills** — possibly removable where
  the body never shells out, but pre-fetch execution may depend on the grant. The
  controlled experiment is prepared and blocked only on a logged-in CLI: two probe
  skills exist at the session scratchpad's `bashprobe/.claude/skills/` (one with the
  Bash grant, one without, each with an `echo`-marker pre-fetch); from that directory
  run `claude -p "/probe-withbash"` then `claude -p "/probe-nobash"` and compare
  whether the marker output appears. If both execute, the grant is trimmable.
