# Maintaining this marketplace

This repo is the catalog (`.claude-plugin/marketplace.json`) plus the home for **universal plugins that have no project of their own** (under `plugins/`). Plugins coupled to a specific project live in that project's repository and are pulled at install time via a `git-subdir` source. Read this before adding a plugin or cutting a release.

## Mental model

- **Project-coupled plugins** (developed alongside a project, e.g. product-dev) are **referenced** by `git-subdir`; installing sparse-clones only the plugin's `path` from its source repo.
- **Universal plugins** (no home project, e.g. code-tools, astro-tools) are **contained** in this repo under `plugins/<name>/` and referenced by relative path.
- Releasing an externally-hosted plugin **does not touch this repo** — you bump the version in the plugin's own `plugin.json`. Releasing an in-repo plugin is a version-bump commit here.
- Beyond that, this repo changes only when you **add/remove a plugin** or **re-pin** a plugin's `ref`/`sha`.

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

- **`name`** — unique across the catalog, kebab-case. Users install with `my-plugin@clownware`.
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
  "url": "https://github.com/clownware/product-dev",
  "path": "plugin",
  "ref": "v0.2.0"
}
```

- `ref` — follows a tag or branch.
- `sha` — pins an exact commit (takes precedence over `ref`).

Updating the pin (e.g. `v0.2.0` → `v0.3.0`) is the one time a routine release touches this repo.

## Validation

Every push and PR runs [`.github/workflows/validate.yml`](../.github/workflows/validate.yml), which checks that `marketplace.json` is well-formed and every entry has a valid source, and — for the in-repo plugins under `plugins/` — that each `plugin.json` is well-formed (kebab name, semver, description), hook configs parse and reference existing executable scripts, every skill directory has a SKILL.md with `name`/`description` frontmatter, hook scripts pass shellcheck, and every relative catalog source exists. Keep it green.

Before a plugin's first release, also run the authoritative structural check on the **plugin repo** (not this one):

```bash
claude plugin validate ./plugin --strict
```

That validates the plugin's manifest, skills, commands, and agent frontmatter. The catalog CI here and the plugin validator there are complementary: this repo guards the index, that command guards the plugin.

## Skill authoring standards

House conventions for every skill in this marketplace. All of them exist because their
absence produced a real, verified bug — none are style preferences.

1. **Pre-fetched context uses capture-then-default.** A pipeline's exit status is its
   *last* command's, and `head`/`tail`/`sed`/`sort` exit 0 on empty input — so
   `cmd | filter || echo "fallback"` never fires. Write
   `out=$(cmd | filter); echo "${out:-fallback}"` instead. No unquoted globs (zsh
   `nomatch` leaks to stderr); no apostrophes inside `${var:-fallback}` text (quoting
   is honored inside parameter-expansion words, so a `'` opens an unterminated quote).

2. **Every pre-fetch command is verified by execution before shipping** — in bash *and*
   zsh, against three contexts: a repo where the probe should hit, one where it should
   miss, and an unrelated directory. Zero blank outputs, zero stderr leaks.

3. **Descriptions carry trigger phrases, not just capability summaries** — skills
   undertrigger by default. Name the stack when the skill is stack-specific, so it
   doesn't fire (or collide with a sibling) in the wrong repo.

4. **Audit skills are assessment-only.** They report ranked findings cited `file:line`,
   labeled verified/unverified, and never edit the tree — fixes are a separate,
   explicit step. Verified means executed or computed: contrast by math, sync by
   parsing, fallbacks by running.

5. **New skills get a blind validation run** before release: a fresh agent executes
   the skill against a target with known ground truth; the skill ships when the run
   reproduces the ground truth without hints. (This is how skill-audit and design-audit
   were released — both runs also found things their authors missed, which is the point.)

6. **Releases are per-plugin semver bumps** with conventional commits; the plugin's
   `plugin.json`, its `marketplace.json` description, and the README tables are kept
   in sync in the same commit.

## Access notes

This marketplace and its plugin sources are **public** repositories. Adding the marketplace or installing a plugin needs only standard `git` read access to the referenced public repos — no special credentials. If you fork a plugin's **source repo** private, installers of that plugin will then need git credentials with read access (SSH key, or a `GITHUB_TOKEN`).
