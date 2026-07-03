# clownware plugins

A [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces). This repo is a **thin catalog** — it holds pointers to plugins, not the plugin code itself. Each plugin is referenced at its source repository via a `git-subdir` source, so installing a plugin sparse-clones only that plugin's directory.

## Available plugins

| Plugin | Description | Source |
|--------|-------------|--------|
| `product-dev` | AI-assisted product development framework: idea → technical spec via UX research, hypothesis, and prototype planning. | [`tool-mcp-ux-prototyping/plugin`](https://github.com/clownware/tool-mcp-ux-prototyping/tree/main/plugin) |

## Install

```
/plugin marketplace add clownware/plugins
/plugin install product-dev@clownware-plugins
```

Or non-interactively:

```bash
claude plugin marketplace add clownware/plugins
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

- **The catalog is just `.claude-plugin/marketplace.json`.** No plugin code lives here.
- **Plugins are developed in their own repositories** and referenced by `git-subdir` (repo URL + subdirectory path). product-dev, for example, is developed in `tool-mcp-ux-prototyping` and lives in that repo's `plugin/` folder.
- **Releasing a plugin does not touch this repo.** Bump the `version` field in the plugin's own `plugin.json` — followers receive the update on their next `/plugin update`. This catalog changes only when adding/removing a plugin or pinning a different `ref`.

## Versioning

Each plugin's version is resolved from its `plugin.json` `version` field (highest priority), then the marketplace entry, then the git commit SHA.

- Entries here **omit** `version` and `ref`, so each plugin follows its source repo's `main` and updates are gated by the plugin's own `plugin.json` version.
- To serve a frozen release from the catalog while development continues on `main`, add a `ref` (tag/branch) or `sha` to that plugin's `source`.
- Do **not** set `version` in both `plugin.json` and the marketplace entry — `plugin.json` silently wins.

## Documentation

- **[docs/MAINTAINING.md](docs/MAINTAINING.md)** — adding plugins, the release process, version resolution, pinning stable channels, and validation.

## License

[Apache-2.0](LICENSE).
