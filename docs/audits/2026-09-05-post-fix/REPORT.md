# Owned skill and plugin audit — 2026-09-05 post-fix verification

Run `owned-skills-2026-09-05-post-fix`, baseline `owned-skills-2026-09-05`. Same rubric (`static-review-v1`), same 39 entities. Every baseline finding was fixed and re-verified; no finding is carried forward. Scores remain static review scores, not behavioral success rates.

Source revisions: clownware/plugins `cb2e6fdd7037` and product-dev `469a06d0b705`, both on `main`. This record supersedes an earlier publish of the same run (report sha256 `62c37a0bbc83…`) whose revisions pointed at branch commits rewritten by the rebase-merges of plugins#17 and product-dev#58; it also covers the code-tools 0.15.4 probe fix from plugins#18.

## Verification

| Check | Result |
|---|---|
| Pre-fetch probes (bash + zsh × empty, marketplace-repo, unrelated) | 642/642 exit 0, empty stderr, non-empty stdout (107 commands) |
| `claude plugin validate` | 6/6 plugins pass (baseline 5/6) |
| Frontmatter parsed with PyYAML | 33/33 skills |
| `scripts/validate_plugins.py` + regression tests | OK; 8/8 tests |
| Reproductions re-executed | guard command forms, astro/templ surface probe, security-audit probe under piped stdin, cargo fixture — see `reproductions.json` |
| Blind behavioral sample | not repeated |

bash -c and zsh -f -c in empty, marketplace-repo, and unrelated contexts with stdin=/dev/null. Four backtick prose fragments excluded by inspection (skill-audit:48, rust test-scaffold:32). Exit/noise checks do not establish semantic correctness.

## Plugin scores

| Plugin | Version | Score | Baseline | Mean skill score |
|---|---|---|---|---|
| clownware-astro-tools | 0.5.2 | 100 | 100 | 100.0 |
| clownware-code-tools | 0.15.4 | 100 | 70 | 100.0 |
| clownware-go-tools | 0.3.3 | 100 | 100 | 100.0 |
| pezza-design-system | 0.5.3 | 100 | 100 | 100.0 |
| clownware-rust-tools | 0.1.2 | 100 | 100 | 100.0 |
| product-dev | 0.5.0 | 100 | 100 | 100.0 |

Plugin-level `sha256` uses a documented tracked-file digest (see `sha256_method` in `audit.json`); the baseline plugin hash method was not recorded, so plugin hashes are not comparable across the two runs. Skill hashes are file digests in both runs.

## Skill scorecard

| Skill | Score | Baseline | Baseline findings |
|---|---|---|---|
| clownware-astro-tools:astro-pr-description | 100 | 100 | — |
| clownware-astro-tools:component-scaffold | 100 | 90 | F07 |
| clownware-astro-tools:perf-budget-check | 100 | 90 | F08 |
| clownware-code-tools:a11y-audit | 100 | 90 | F04 |
| clownware-code-tools:adr | 100 | 100 | — |
| clownware-code-tools:arch-audit | 100 | 100 | — |
| clownware-code-tools:audit-fix | 100 | 100 | — |
| clownware-code-tools:deps-audit | 100 | 100 | — |
| clownware-code-tools:design-audit | 100 | 100 | — |
| clownware-code-tools:devops-audit | 100 | 100 | — |
| clownware-code-tools:githits-research | 100 | 80 | F01 |
| clownware-code-tools:perf-audit | 100 | 100 | — |
| clownware-code-tools:plugin-release | 100 | 80 | F02 |
| clownware-code-tools:pr-description | 100 | 100 | — |
| clownware-code-tools:root-cause-debug | 100 | 100 | — |
| clownware-code-tools:security-audit | 100 | 100 | — |
| clownware-code-tools:skill-audit | 100 | 90 | F09 |
| clownware-code-tools:skill-validate | 100 | 100 | — |
| clownware-code-tools:test-audit | 100 | 100 | — |
| clownware-code-tools:test-scaffold | 100 | 90 | F06 |
| clownware-go-tools:go-pr-description | 100 | 100 | — |
| clownware-go-tools:perf-budget-check | 100 | 100 | — |
| clownware-go-tools:sqlc-query-scaffold | 100 | 100 | — |
| clownware-go-tools:templ-component-scaffold | 100 | 90 | F07 |
| clownware-go-tools:test-scaffold | 100 | 90 | F06 |
| pezza-design-system:pezza-design | 100 | 95 | F10 |
| clownware-rust-tools:gate-check | 100 | 100 | — |
| clownware-rust-tools:test-scaffold | 100 | 80 | F03, F06 |
| product-dev:product-flow | 100 | 100 | — |
| product-dev:product-ideation | 100 | 95 | F11 |
| product-dev:status | 100 | 100 | — |
| product-dev:tech-spec | 100 | 100 | — |
| product-dev:ux-optimization | 100 | 100 | — |

## Finding resolution

| ID | Severity | Title | Fixed in (main) | Verification |
|---|---|---|---|---|
| F01 | high | GitHits frontmatter fails the authoritative validator | b48ed50d5edd51dc1f1f28da2c0cfaefd389d0dc | PyYAML parses the frontmatter; claude plugin validate passes code-tools; validate_plugins.py and CI regression test enforce real YAML parsing. |
| F02 | high | Release dry-run can discard pre-existing edits | b48ed50d5edd51dc1f1f28da2c0cfaefd389d0dc | Instruction rewritten to work on temporary copies and forbid git restore/checkout/reset as cleanup. Not re-executed by an agent in this pass. |
| F03 | medium | Rust scaffold verification does not compile tests | 00ccbbb647feacea22131d5be144a6b0e5d564c6 | Fixture re-run: cargo check exit 0, cargo test --no-run exit 101 on the same type error; the skill now mandates the latter (reproductions.json). |
| F04 | medium | Accessibility inventory misses Astro and templ | b48ed50d5edd51dc1f1f28da2c0cfaefd389d0dc | Fixture with index.astro and view.templ returns "2 files" in bash and zsh; stop instruction replaced (reproductions.json, regression test). |
| F05 | medium | Git guard does not cover common executable forms | b48ed50d5edd51dc1f1f28da2c0cfaefd389d0dc | /usr/bin/git, env, env -i, command, and git -C forms now deny; plain git push -n and echo remain allowed (reproductions.json, regression test). Header narrows the guarantee. |
| F06 | medium | Test-scaffold discovery promises more than the body permits | b48ed50d5edd51dc1f1f28da2c0cfaefd389d0dc, 54d58206a6cb538a7215ab73a121b9dd5c45a24b, 00ccbbb647feacea22131d5be144a6b0e5d564c6 | Three descriptions limit discovery to explicit scaffolding; bodies redirect working-test requests to executable assertions. Static review; no discovery test run. |
| F07 | medium | Generic scaffold fallback still mandates starter styling | bab727190ea905559993b91357104520a896c5f1, 54d58206a6cb538a7215ab73a121b9dd5c45a24b | Both scaffolds read the target styling system first and make starter classes conditional. Static review; no generated UI evaluated. |
| F08 | medium | Build freshness rule omits uncommitted edits | bab727190ea905559993b91357104520a896c5f1 | Freshness rule requires a rebuild or repository fingerprint; timestamps excluded; unverifiable builds report as not run. Static review. |
| F09 | medium | Skill audit treats allowed-tools as a restrictive boundary | b48ed50d5edd51dc1f1f28da2c0cfaefd389d0dc, 9742632e789dc332a690a11087ec2d6891e1d396 | skill-audit and MAINTAINING.md treat allowed-tools as an approval grant and require per-host discovery tests. Static review. |
| F10 | low | Pezza mark instructions have an unresolved exception | d4d31a2ef2c0a4c4bf15ac8e6707e95852ec5729 | Rule 3 distinguishes altering the stroke master from placing official filled artwork. Static review. |
| F11 | low | Ideation requires a second user override | product-dev 469a06d0b7051ff4592d9fcb7e3cbed1c0929bf2 | Escape hatch respects the first explicit override and records open assumptions. Static review; committed on branch fix/ideation-first-override. |

## Still unvalidated

- Behavioral outcomes for every skill; the baseline's single Codex sample was not repeated, and the narrowed test-scaffold descriptions (F06) have had no discovery test on any host/model.
- The plugin-release dry-run rewrite (F02) was verified by reading, not by an agent execution against a dirty scratch repository.
- Cross-host portability, unchanged from the baseline.
- Installed copies still trail the source (see `installations` in `audit.json`); the releases are on `main` and available on marketplace refresh.

## Observation from the first publish, now resolved

The security-audit surface probe ran `rg` without a path. Under a non-terminal stdin ripgrep searched stdin: an open pipe blocked, an empty one reported "none matched" against a directory containing a match. Fixed in `04900fca4d4d` (code-tools 0.15.4) by passing `.`; `reproductions.json` shows the probe returning `./auth.go` under a piped stdin in both shells. Unscored in both publishes because the host's stdin handling was never observed directly.

## Ops ingestion

`audit.json` is the scored record; `ops-payload.json` is generated by `scripts/publish_skill_audit.py`. Per the signal contract, every entity carries an empty findings summary at severity 0, which clears the baseline findings in the `skill_audit` domain. `publication.json` holds the server acknowledgement for this record and references the superseded one.
