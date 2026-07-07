# clownware plugins

A [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces). Plugins tied to a specific project are developed in that project's repository and referenced here via a `git-subdir` source; universal plugins with no home project live directly in this repo under [`plugins/`](plugins/) and are referenced by relative path.

## Available plugins

| Plugin | Description | Source |
|--------|-------------|--------|
| `product-dev` | AI-assisted product development framework: idea → technical spec via UX research, hypothesis, and prototype planning. | [`tool-mcp-ux-prototyping/plugin`](https://github.com/clownware/tool-mcp-ux-prototyping/tree/main/plugin) |
| `clownware-code-tools` | Universal dev workflow skills: architecture auditing, security auditing, test-suite auditing, skill auditing, design-system auditing, ADR authoring, PR descriptions, root-cause debugging, test scaffolding. | [`plugins/code-tools`](plugins/code-tools) |
| `clownware-astro-tools` | Astro + Preact stack skills: component scaffolding and template-aware PR descriptions. | [`plugins/astro-tools`](plugins/astro-tools) |
| `pezza-design-system` | The Pezza brand design system: guidelines, tokens, brand assets, React primitives, and two UI kit starters. | [`plugins/pezza-design-system`](plugins/pezza-design-system) |

## Install

```
/plugin marketplace add clownware/plugins
/plugin install clownware-code-tools@clownware-plugins
```

Or non-interactively:

```bash
claude plugin marketplace add clownware/plugins
claude plugin install clownware-code-tools@clownware-plugins
claude plugin install clownware-astro-tools@clownware-plugins
claude plugin install product-dev@clownware-plugins
```

### Connect via settings.json

To register the marketplace and pre-enable the plugin declaratively, add this to `~/.claude/settings.json` (user scope) or a project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "clownware-plugins": {
      "source": { "source": "github", "repo": "clownware/plugins" }
    }
  },
  "enabledPlugins": {
    "product-dev@clownware-plugins": true
  }
}
```

`extraKnownMarketplaces` makes the marketplace known; `enabledPlugins` declares intent to use the plugin. This does **not** auto-download — on next launch Claude Code prompts you to install, or run `claude plugin install product-dev@clownware-plugins` (or `/reload-plugins`) to pick it up. Same behavior in CLI, desktop, and Cowork.

> **Private repos:** both this marketplace and the plugin sources are private. Installers need git credentials configured (SSH key, or a `GITHUB_TOKEN` with repo read access). `GITHUB_TOKEN` is also used for auto-updates.

## How this marketplace works

- **The catalog is `.claude-plugin/marketplace.json`.** It lists every plugin and where its code lives.
- **Project-coupled plugins are developed in their own repositories** and referenced by `git-subdir` (repo URL + subdirectory path). product-dev, for example, is developed in `tool-mcp-ux-prototyping` and lives in that repo's `plugin/` folder.
- **Universal plugins with no home project live in this repo** under `plugins/<name>/` and are referenced by relative path. code-tools and astro-tools are hosted this way.
- **Releasing an externally-hosted plugin does not touch this repo.** Bump the `version` field in the plugin's own `plugin.json` — followers receive the update on their next `/plugin update`. For in-repo plugins, the version bump is a commit here.

## Versioning

Each plugin's version is resolved from its `plugin.json` `version` field (highest priority), then the marketplace entry, then the git commit SHA.

- Entries here **omit** `version` and `ref`, so each plugin follows its source repo's `main` and updates are gated by the plugin's own `plugin.json` version.
- To serve a frozen release from the catalog while development continues on `main`, add a `ref` (tag/branch) or `sha` to that plugin's `source`.
- Do **not** set `version` in both `plugin.json` and the marketplace entry — `plugin.json` silently wins.

## Documentation

- **[docs/MAINTAINING.md](docs/MAINTAINING.md)** — adding plugins, the release process, version resolution, pinning stable channels, and validation.

## License

[Apache-2.0](LICENSE).
