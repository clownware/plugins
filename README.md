# clownware plugins

A [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces). Plugins tied to a specific project are developed in that project's repository and referenced here via a `git-subdir` source; universal plugins with no home project live directly in this repo under [`plugins/`](plugins/) and are referenced by relative path.

## Available plugins

| Plugin | What it is | Source |
|--------|------------|--------|
| `product-dev` | AI-assisted product development framework: idea → technical spec via UX research, hypothesis, and prototype planning. | [`product-dev/plugin`](https://github.com/clownware/product-dev/tree/main/plugin) |
| `clownware-code-tools` | Universal dev workflow skills — an audit suite plus authoring and debugging tools. Probes the repo it runs in; degrades gracefully. Ships a git guard hook (blocks `--no-verify`, secret-scans commits). | [`plugins/code-tools`](plugins/code-tools) |
| `clownware-astro-tools` | Astro + Preact stack skills following astro-performance-starter conventions. Ships a Biome format-on-edit hook. | [`plugins/astro-tools`](plugins/astro-tools) |
| `clownware-go-tools` | Go + templ + sqlc stack skills following go-performance-starter conventions. Ships a goimports/templ format-on-edit hook. | [`plugins/go-tools`](plugins/go-tools) |
| `pezza-design-system` | The Pezza brand design system as a skill: guidelines, HSL-channel tokens, animatable brand SVGs, prose layer, motion system, React primitives, two UI kits. | [`plugins/pezza-design-system`](plugins/pezza-design-system) |

## Skills at a glance

**clownware-code-tools** — the audit suite is assessment-only by design: each skill reports
ranked, `file:line`-cited findings and leaves fixes to you.

| Skill | What it does |
|-------|--------------|
| `/arch-audit` | Architecture decisions vs roadmap vs actual code; phased readiness plan |
| `/security-audit` | Auth/session, injection, platform vulnerabilities — verified against code before reporting |
| `/test-audit` | Coverage gaps ranked by risk, CI enforcement vs observation, test quality |
| `/design-audit` | Token-bridge sync, computed WCAG contrast, the system's own rules vs its code |
| `/a11y-audit` | Functional accessibility: keyboard operability, focus traps, names/ARIA integrity — zero-false-positive bar |
| `/skill-audit` | SKILL.md quality: dead shell fallbacks, triggering, collisions — by executing, not reading |
| `/deps-audit` | Dependency health: unused/duplicate deps, lockfile drift, freshness, OSV advisories, licenses |
| `/perf-audit` | Budgets declared vs enforced, sizes vs stated limits, shipped-asset hygiene |
| `/devops-audit` | CI/CD + deploy configs: action pinning, injection, secret handling, release/migration safety, local-vs-CI gate drift |
| `/audit-fix` | Applies an audit report: mechanical fixes with exact-match edits, re-verified by the report's own methods; decisions stay decisions |
| `/plugin-release` | Cuts an in-repo plugin release: semver bump, three-surface description sync, JSON validation, conventional commit; --dry-run prints the diff |
| `/skill-validate` | Blind-agent validation harness: pinned ground truth, reproduction/discrimination/fidelity scoring |
| `/adr` | Architecture Decision Records, numbered and templated from the repo's own conventions |
| `/pr-description` | PR descriptions from the branch diff, template-aware |
| `/root-cause-debug` | Pair-debugging pipeline: root causes, never band-aids |
| `/test-scaffold` | Test stubs for JS/TS (vitest/jest), matching the project's conventions |

Hook: a `PreToolUse` git guard on every Bash call — denies `git commit`/`git push
--no-verify` (the repo's hooks are the quality gate), and secret-scans staged changes
before any commit (gitleaks when installed, high-confidence token patterns otherwise).

**clownware-astro-tools**

| Skill | What it does |
|-------|--------------|
| `/component-scaffold` | Astro/Preact components following project patterns (atomic layout aware) |
| `/pr-description` | PR descriptions for astro-performance-starter template repos |
| `/perf-budget-check` | Runs the starter's own budget gates (sizes, overrides, images) and interprets the verdicts |

Hook: a `PostToolUse` formatter — after Claude edits or writes a file, runs Biome on
just that file (gated on a `biome.json` at or above it), so diffs never fail the
project's format gate.

**clownware-go-tools**

| Skill | What it does |
|-------|--------------|
| `/templ-component-scaffold` | templ pages/partials/components with typed props (ADR-017) |
| `/test-scaffold` | Table-driven `_test.go` stubs, stdlib-first (ADR-023) |
| `/sqlc-query-scaffold` | sqlc query + repository seam, never raw SQL (ADR-003) |
| `/perf-budget-check` | Runs the starter's `task test:performance` gates and interprets the verdicts |
| `/pr-description` | PR descriptions aware of the `task ci` quality gate and the ADR constitution |

Hook: a `PostToolUse` formatter — after Claude edits or writes a `.go` or `.templ`
file, runs goimports/gofmt or `templ fmt` on just that file.

**pezza-design-system**

| Skill | What it does |
|-------|--------------|
| `/pezza-design` | Generate on-brand Pezza interfaces, artifacts, and production code from the full design system |

## Install

```
/plugin marketplace add clownware/plugins
/plugin install clownware-code-tools@clownware
```

Or non-interactively:

```bash
claude plugin marketplace add clownware/plugins
claude plugin install clownware-code-tools@clownware
claude plugin install clownware-astro-tools@clownware
claude plugin install product-dev@clownware
```

### Connect via settings.json

To register the marketplace and pre-enable the plugin declaratively, add this to `~/.claude/settings.json` (user scope) or a project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "clownware": {
      "source": { "source": "github", "repo": "clownware/plugins" }
    }
  },
  "enabledPlugins": {
    "product-dev@clownware": true
  }
}
```

`extraKnownMarketplaces` makes the marketplace known; `enabledPlugins` declares intent to use the plugin. This does **not** auto-download — on next launch Claude Code prompts you to install, or run `claude plugin install product-dev@clownware` (or `/reload-plugins`) to pick it up. Same behavior in CLI, desktop, and Cowork.

> **Install access:** this marketplace and its plugin sources are public repositories, so no special credentials are required. `git` fetches each plugin from its referenced repo. A `GITHUB_TOKEN` is only needed if you fork a plugin source into a private repo, or to raise API rate limits during auto-updates.

## How this marketplace works

- **The catalog is `.claude-plugin/marketplace.json`.** It lists every plugin and where its code lives.
- **Project-coupled plugins are developed in their own repositories** and referenced by `git-subdir` (repo URL + subdirectory path). product-dev, for example, is developed in `product-dev` and lives in that repo's `plugin/` folder.
- **Universal plugins with no home project live in this repo** under `plugins/<name>/` and are referenced by relative path. code-tools and astro-tools are hosted this way.
- **Releasing an externally-hosted plugin does not touch this repo.** Bump the `version` field in the plugin's own `plugin.json` — followers receive the update on their next `/plugin update`. For in-repo plugins, the version bump is a commit here.

## Versioning

Each plugin's version is resolved from its `plugin.json` `version` field (highest priority), then the marketplace entry, then the git commit SHA.

- Entries here **omit** `version` and `ref`, so each plugin follows its source repo's `main` and updates are gated by the plugin's own `plugin.json` version.
- To serve a frozen release from the catalog while development continues on `main`, add a `ref` (tag/branch) or `sha` to that plugin's `source`.
- Do **not** set `version` in both `plugin.json` and the marketplace entry — `plugin.json` silently wins.

## Documentation

- **[docs/MAINTAINING.md](docs/MAINTAINING.md)** — adding plugins, the release process, version resolution, pinning stable channels, validation, and the skill authoring standards.
- **[docs/ROADMAP.md](docs/ROADMAP.md)** — light specs for upcoming skills and tracked open decisions.

## License

[Apache-2.0](LICENSE).
