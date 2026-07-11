# Roadmap

Light specs for upcoming skills. Each entry is a proposal, not a commitment — enough
shape to start building without re-deriving intent, small enough to change freely.
Specs graduate to a skill directory when work starts; entries here stay one screen or less.

Every new skill inherits the [house authoring standards](MAINTAINING.md#skill-authoring-standards)
regardless of what it does.

## Graduated

- **`audit-fix`** — shipped in code-tools v0.8.0; validated by a blind run against the
  design-audit report at the pre-fix commit (see MAINTAINING standard 5).

## Next — motivated by concrete pain already felt

### `a11y-audit` (code-tools)

design-audit computes contrast; it deliberately stops before functional accessibility.
Its own found-work (a `<span role="checkbox">` that no keyboard can operate) is the
motivating case.

- **Trigger:** "accessibility audit", "a11y review", "is this keyboard accessible",
  "WCAG check" (beyond color).
- **Pipeline:** interactive-element sweep (role/tabindex/handlers on non-focusable
  elements) → ARIA validity and name computation → focus order and visible focus →
  media/motion/zoom checks → live render pass with keyboard-only navigation when a
  browser tool is available.
- **Done when:** it catches the Checkbox case and a seeded focus-trap in a fixture,
  with zero false positives on the fixed versions.

### `plugin-release` (code-tools)

Releasing an in-repo plugin takes a five-step ritual (bump `plugin.json`, sync the
marketplace description, sync the README table, validate JSON, conventional commit).
Done by hand six times in one week; every step is mechanizable.

- **Trigger:** "release <plugin>", "bump <plugin>", "cut a version".
- **Pipeline:** read current version → semver bump from the change type → sync
  description strings across `plugin.json` / `marketplace.json` / README table →
  validate all JSON → `chore(release)` or `feat`-typed commit with a body summarizing
  the delta since the last bump.
- **Done when:** a release of any in-repo plugin is one invocation, and a dry-run mode
  prints the diff without committing.

## Later — worth doing, not yet urgent

- **`deps-audit` (code-tools)** — lockfile health: unused/duplicate dependencies,
  last-publish dates, known advisories, license inventory. Assessment-only, same
  report shape as the other audits.
- **`perf-audit` (code-tools)** — budgets declared vs enforced (the never-exercised
  sweep applied to performance): bundle size vs stated limits, unminified assets,
  render-blocking patterns; runs the repo's own perf tooling when present.
- **`skill-validate` (code-tools)** — codify the blind-validation harness used to ship
  skill-audit and design-audit: spawn an agent that executes a skill against a target
  with known ground truth, score reproduction, report gaps. The skill that tests skills.
- **`perf-budget-check` (astro-tools)** — assert the astro-performance-starter's
  Lighthouse/bundle budgets on the current branch and diff against `main`.

## Open decisions (tracked, unscheduled)

- **`pr-description` name collision** — both plugins ship a skill with this name;
  descriptions now differentiate them, but a rename (`astro-pr-description`) remains
  the cleaner fix at the cost of breaking `/pr-description` muscle memory.
- **`license` frontmatter policy** — astro-tools skills carry `license: MIT`,
  code-tools skills carry none; pick one convention and apply it in a single pass.
- **`Bash` in `allowed-tools` for pre-fetch-only skills** — possibly removable where
  the body never shells out, but pre-fetch execution may depend on the grant; needs a
  controlled test before trimming (flagged by skill-audit, deliberately not applied).
