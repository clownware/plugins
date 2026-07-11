---
name: plugin-release
description: "Cuts a release of an in-repo Claude Code plugin in a marketplace repository: semver bump in plugin.json, description/skill-table sync across marketplace.json and the README, JSON validation, and a conventional commit summarizing the delta since the last bump. Supports --dry-run (prints the diff, reverts, commits nothing). Use when asked to release a plugin, bump a plugin's version, cut a version, or ship a plugin update."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Release a plugin from this marketplace repo. Plugin, bump type, and change summary: $ARGUMENTS

## Marketplace state (pre-fetched)

**Catalog:** !`out=$(ls .claude-plugin/marketplace.json 2>/dev/null); echo "${out:-none — not a marketplace repo; this skill releases in-repo marketplace plugins only}"`
**In-repo plugins and versions:** !`out=$(find plugins -maxdepth 3 -name plugin.json -path "*/.claude-plugin/*" 2>/dev/null | sort | while read -r p; do python3 -c "import json,sys; d=json.load(open(sys.argv[1])); print(d['name'], d['version'])" "$p" 2>/dev/null; done); echo "${out:-none found under plugins/}"`
**Working tree:** !`if git rev-parse --git-dir >/dev/null 2>&1; then out=$(git status --short | head -10); echo "${out:-clean}"; else echo "not a git repo"; fi`
**Unpushed commits:** !`out=$(git log @{u}..HEAD --oneline 2>/dev/null | head -5); echo "${out:-none (or no upstream)}"`

## Scope guard

This skill releases **in-repo** plugins (relative-path sources). If the named plugin's
marketplace entry uses `git-subdir`/`github`/`url`, stop: that plugin is released in
its own repository by bumping its `plugin.json` there — nothing in this repo changes.
Point the user at the right repo instead of editing here.

If the working tree is dirty with unrelated changes, say so before starting — a
release commit should contain the release and nothing else.

## Pipeline

### 1. Resolve the release

- **Plugin**: match $ARGUMENTS against the catalog names (and their `plugins/<dir>`).
- **Bump**: explicit wins (`major`/`minor`/`patch`). Otherwise derive from the change
  summary's conventional type — `feat` → minor, `fix`/`docs`/`chore` → patch,
  anything marked breaking → major. If there is no summary and no bump type, derive
  the delta first (step 2) and propose a bump — do not guess silently.
- **Dry-run**: if $ARGUMENTS contains `--dry-run`, apply everything, show
  `git diff`, then revert the files — no commit, clean tree afterward.

### 2. Derive the delta since the last bump

Find the last commit that changed this plugin's `plugin.json` version, then collect
what actually changed under the plugin's directory since:

    git log <last-bump-sha>..HEAD --oneline -- plugins/<dir>/

The commit body summarizes THIS delta — never invent changelog content the log
doesn't support. New/removed skill directories in the delta drive the sync step.

**If the delta is empty, stop: there is nothing to release.** Tell the user which
version already contains the change they described (it is usually the last bump
itself) instead of cutting a hollow version.

### 3. Apply the bump and sync every surface

- `plugins/<dir>/.claude-plugin/plugin.json` — bump `version` (the ONLY place a
  version lives; never add one to the marketplace entry, where it would be silently
  outranked).
- If skills were added/removed since the last bump: sync the plugin's `description`
  in both `plugin.json` and its `.claude-plugin/marketplace.json` entry, and the
  README's plugin/skills tables. These three surfaces drift the moment one is edited
  alone — check all three even when you believe only one changed.
- Style-match the surrounding text; description edits are insertions into the
  existing sentence shape, not rewrites.

### 4. Validate before committing

- `python3 -c "import json; json.load(open(...))"` every JSON file you touched.
- Re-read the README tables for orphaned or missing skill rows against the actual
  `plugins/<dir>/skills/` directories.
- If the repo has a catalog CI check (e.g. a validate workflow), run its core check
  locally when that is cheap.

### 5. Commit (or print)

Match the repo's own commit convention — read `git log --oneline -15` and copy the
pattern (this repo uses `feat(<scope>): <summary>; vX.Y.Z` for feature releases and
`fix(<scope>): ...` for fix releases). Body: the derived delta, one line per change.
Do not push unless the user's instruction or session pattern says pushes are wanted;
say which you did.

For `--dry-run`: print the full diff, then `git checkout -- <files>` and confirm the
tree is clean. The dry-run's value is the diff being exactly what the real run would
commit.

## Rules

- One release = one plugin = one commit. No drive-by edits, however tempting.
- The version lives in `plugin.json` only — marketplace-entry versions silently lose
  to it and create ghost-version bugs for installers.
- Never bump externally-sourced plugins from here; redirect to their home repo.
- Derive, don't invent: the commit body must be supported by the git log of the
  plugin's directory.
- Descriptions stay synchronized across `plugin.json`, `marketplace.json`, and the
  README in the same commit — partial sync is how catalogs rot.
- Remind the user that installers see the update on their next marketplace refresh /
  `/plugin update`, not automatically.
