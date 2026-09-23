# clownware/plugins — repo instructions for Claude Code

The clownware Claude Code plugin marketplace. Catalog: `.claude-plugin/marketplace.json`.
In-repo plugins live at `plugins/<dir>/` (`.claude-plugin/plugin.json`, `skills/<skill>/SKILL.md`,
`hooks/`). `product-dev` is externally sourced (`git-subdir`) and is released in its own repo.

Read [`docs/MAINTAINING.md`](docs/MAINTAINING.md) before changing a skill or cutting a release.
Open decisions live as GitHub issues and in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Gate (run all before calling a change complete; CI runs the same)

```bash
python3 scripts/validate_plugins.py
python3 -m unittest discover -s scripts -p 'test_*.py'
find plugins -path "*/hooks/*.sh" -print0 | xargs -0 -r shellcheck
```

CI also runs `claude plugin validate plugins/<dir>` with a pinned Claude Code version.

## Releases

- Use `/plugin-release` (supports `--dry-run`). One release = one plugin = one commit, no drive-by edits.
- The version lives in `plugin.json` only. Never add `version` to a marketplace entry; it silently loses.
- A release syncs three surfaces in the same commit: `plugin.json` description, the
  `marketplace.json` entry description, and the README plugin and skill tables.
- The commit body is derived from `git log <last-bump>..HEAD -- plugins/<dir>/`. Empty delta = no release.
- Commit form: `type(<plugin-dir>): summary; vX.Y.Z`. Other scopes: `ci`, `audit`, `manifests`, `roadmap`.
- Never bump an externally sourced plugin from here.

## Shipping (overrides the global default)

History is linear with no merge commits. Merge PRs with **rebase**, never squash: squashing
destroys the per-plugin release commits.

## Skill authoring (MAINTAINING.md "Skill authoring standards", in short)

- Pre-fetch lines use capture-then-default: `out=$(...); echo "${out:-fallback}"`. No unquoted
  globs, no apostrophes inside `${var:-...}`.
- Verify every pre-fetch by running it in bash and zsh against hit, miss and unrelated
  contexts, with zero stderr leaks.
- Descriptions carry trigger phrases and name the stack.
- Audit skills are assessment-only and never edit the tree. `/audit-fix` is the only skill that applies findings.
- A new skill gets a blind validation run (`/skill-validate`) before release; fixtures and
  worktrees live outside the working tree.

## Hooks

Hook scripts never fail the turn: exit 0 and stay silent when the tool or config is absent
(the convention in every `hooks/*.sh` header). They must pass shellcheck. Formatting on
edit is one dispatcher, `plugins/code-tools/hooks/format-file.sh`, routed by extension;
add a new stack there, not as a new per-plugin hook.

## Audit records

- Never put a resolved `OPS_INGEST_TOKEN` in a report, command argument or committed file.
- Never record absent behavioural tests as zero failures, and never use a partial audit to clear unreviewed findings.

## Working on the starters from here

Sessions in this repo often inspect the sibling starters
(`../astro-performance-starter`, `../go-performance-starter`). Read-only checks there are
fine; changes to a starter go through that repo's own branch, gate and PR.
