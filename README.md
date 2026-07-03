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

## Adding a plugin

Append an entry to the `plugins` array in `.claude-plugin/marketplace.json`:

```json
{
  "name": "my-plugin",
  "source": {
    "source": "git-subdir",
    "url": "https://github.com/clownware/some-repo",
    "path": "path/to/plugin"
  },
  "description": "What it does."
}
```

A small plugin with no standalone home can instead live directly in this repo (e.g. `plugins/my-plugin/`) and point `git-subdir` at this repo's own URL and that path — the pattern Anthropic's [official marketplace](https://github.com/anthropics/claude-plugins-official) uses.
