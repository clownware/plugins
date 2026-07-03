# Maintaining this marketplace

This repo is a **thin catalog**. It contains `.claude-plugin/marketplace.json` (a list of pointers) and nothing else that plugins depend on. Plugin code lives in each plugin's own source repository and is pulled at install time via a `git-subdir` source. Read this before adding a plugin or cutting a release.

## Mental model

- The catalog **references** plugins; it never **contains** them.
- Installing a plugin sparse-clones only its `path` from its source repo.
- Releasing a plugin **does not touch this repo** — you bump the version in the plugin's own `plugin.json`.
- This repo changes only when you **add/remove a plugin** or **re-pin** a plugin's `ref`/`sha`.

## Adding a plugin

Append an entry to the `plugins` array in [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json):

```json
{
  "name": "my-plugin",
  "source": {
    "source": "git-subdir",
    "url": "https://github.com/clownware/some-repo",
    "path": "path/to/plugin"
  },
  "description": "One-line description of what it does."
}
```

Requirements for the entry:

- **`name`** — unique across the catalog, kebab-case. Users install with `my-plugin@clownware-plugins`.
- **`source.path`** — the directory in the source repo that contains `.claude-plugin/plugin.json`.
- **`description`** — a single sentence; shown in `/plugin` listings.

Source-type options:

| Source | Use when | Required fields |
|--------|----------|-----------------|
| `git-subdir` | Plugin lives in a subdirectory of a repo (the usual case) | `url`, `path` (opt: `ref`, `sha`) |
| `github` | Plugin is at the **root** of a dedicated repo | `repo` (opt: `ref`, `sha`) |
| `url` | Plugin at the root of a non-GitHub git repo | `url` |
| `"./relative/path"` (string) | Plugin code lives **inside this marketplace repo** | — |

A small plugin with no standalone home can live directly in this repo (e.g. `plugins/my-plugin/`) and be referenced with a `git-subdir` source pointing at this repo's own URL and that path — the pattern Anthropic's [official marketplace](https://github.com/anthropics/claude-plugins-official) uses.

## Releasing a plugin

Because entries here follow each plugin's source `main` branch and omit `version`, the release cadence is controlled by the plugin's own manifest:

1. In the plugin's repo, bump `version` in its `.claude-plugin/plugin.json` (semver).
2. Commit and push to the plugin repo's `main`.
3. Followers receive the update on their next `/plugin update`.

**Nothing changes in this marketplace repo for a routine release.**

### Version resolution order

Claude Code resolves a plugin's version from the first that is set:

1. `version` in the plugin's `plugin.json` — **highest priority**
2. `version` in this marketplace entry
3. the git commit SHA of the source — the default

⚠️ Do **not** set `version` in both the plugin's `plugin.json` and its marketplace entry. When both exist, `plugin.json` silently wins.

## Pinning a stable release channel

To let a plugin develop freely on `main` while users install a frozen release, add a `ref` (tag or branch) or `sha` to that plugin's `source` in the catalog:

```json
"source": {
  "source": "git-subdir",
  "url": "https://github.com/clownware/tool-mcp-ux-prototyping",
  "path": "plugin",
  "ref": "v0.2.0"
}
```

- `ref` — follows a tag or branch.
- `sha` — pins an exact commit (takes precedence over `ref`).

Updating the pin (e.g. `v0.2.0` → `v0.3.0`) is the one time a routine release touches this repo.

## Validation

Every push and PR runs [`.github/workflows/validate.yml`](../.github/workflows/validate.yml), which checks that `marketplace.json` is well-formed and every entry has a valid source. Keep it green.

Before a plugin's first release, also run the authoritative structural check on the **plugin repo** (not this one):

```bash
claude plugin validate ./plugin --strict
```

That validates the plugin's manifest, skills, commands, and agent frontmatter. The catalog CI here and the plugin validator there are complementary: this repo guards the index, that command guards the plugin.

## Access notes

Both this marketplace and the plugin sources are currently **private**. Anyone adding the marketplace or installing a plugin needs git credentials with read access to the referenced repos (SSH key, or a `GITHUB_TOKEN`). To make a plugin frictionless to install publicly, make its **source repo** public — this catalog repo can remain private or be made public independently.
