# Owned skill and plugin audit — 2026-09-05

**Scope:** all 33 canonical SKILL.md entrypoints across six owned plugins were read. This is a static and targeted execution audit, not an exhaustive behavioral certification. Third-party/system skills and four divergent legacy personal copies are excluded from scoring. No audited skill was changed.

## Scoring rubric

Each reviewed entry starts at 100. Deduct 5 for a low finding, 10 medium, 20 high, 40 critical. These are transparent review-priority weights, not measured capability percentages. **100 means no scored finding in the stated review scope. It does not mean fully tested or safe in every host.** Package scores cover packaging/hooks; mean skill scores describe the child entrypoints and are not substituted for package findings.

## Verification

- 107 actual inline prefetch commands, 642 executions: bash and zsh in marketplace, empty directory, and relevant target repository. All returned exit 0, nonempty stdout, and no stderr. Semantic false negatives remain possible; see F04.
- Claude plugin validator: five passed; code-tools failed. PyYAML independently confirmed F01. Hook scripts passed bash syntax checks. Shellcheck was unavailable.
- Scratch reproductions confirmed release dry-run data loss, Rust test-compilation gap, Astro inventory false negative, and git-guard command-form gaps. Real commits/pushes were never attempted through the guard.
- One blind Codex JS test-generation sample met 4/4 pre-recorded artifact criteria. The evaluator reported 17 equivalent direct Node assertions passed. Vitest was not installed/run. No baseline comparison, Claude execution, automatic triggering experiment, or full plugin install/import test was performed.
- Product-dev concrete Tier 1 prompt-table file references resolved. Supporting prompts, generated artifacts, rendering, external MCP availability, and all executable resources were not exhaustively evaluated.

## Plugin scores

| Plugin | Source version | Packaging /100 | Mean skill review /100 | Installed Claude version |
|---|---|---:|---:|---|
| clownware-astro-tools | 0.5.1 | 100 | 93.3 | 0.4.0 |
| clownware-code-tools | 0.15.2 | 70 | 95.9 | 0.14.0 |
| clownware-go-tools | 0.3.2 | 100 | 96.0 | 0.2.0 |
| pezza-design-system | 0.5.2 | 100 | 95.0 | 0.5.1 |
| clownware-rust-tools | 0.1.1 | 100 | 90.0 | 0.1.0 |
| product-dev | 0.5.0 | 100 | 99.0 | 0.1.0 |

All six installed version records trail the corresponding local source versions. This does not establish which source versions are remotely published or currently loaded in a session.

## Skill scorecard

| Skill | Review /100 | Findings |
|---|---:|---|
| clownware-astro-tools:astro-pr-description | 100 | No scored finding; behavior not established |
| clownware-astro-tools:component-scaffold | 90 | F07 |
| clownware-astro-tools:perf-budget-check | 90 | F08 |
| clownware-code-tools:a11y-audit | 90 | F04 |
| clownware-code-tools:adr | 100 | No scored finding; behavior not established |
| clownware-code-tools:arch-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:audit-fix | 100 | No scored finding; behavior not established |
| clownware-code-tools:deps-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:design-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:devops-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:githits-research | 80 | F01 |
| clownware-code-tools:perf-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:plugin-release | 80 | F02 |
| clownware-code-tools:pr-description | 100 | No scored finding; behavior not established |
| clownware-code-tools:root-cause-debug | 100 | No scored finding; behavior not established |
| clownware-code-tools:security-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:skill-audit | 90 | F09 |
| clownware-code-tools:skill-validate | 100 | No scored finding; behavior not established |
| clownware-code-tools:test-audit | 100 | No scored finding; behavior not established |
| clownware-code-tools:test-scaffold | 90 | F06 |
| clownware-go-tools:go-pr-description | 100 | No scored finding; behavior not established |
| clownware-go-tools:perf-budget-check | 100 | No scored finding; behavior not established |
| clownware-go-tools:sqlc-query-scaffold | 100 | No scored finding; behavior not established |
| clownware-go-tools:templ-component-scaffold | 90 | F07 |
| clownware-go-tools:test-scaffold | 90 | F06 |
| pezza-design-system:pezza-design | 95 | F10 |
| clownware-rust-tools:gate-check | 100 | No scored finding; behavior not established |
| clownware-rust-tools:test-scaffold | 80 | F03, F06 |
| product-dev:product-flow | 100 | No scored finding; behavior not established |
| product-dev:product-ideation | 95 | F11 |
| product-dev:status | 100 | No scored finding; behavior not established |
| product-dev:tech-spec | 100 | No scored finding; behavior not established |
| product-dev:ux-optimization | 100 | No scored finding; behavior not established |

## Findings

### F01 — GitHits frontmatter fails the authoritative validator (high)

The unquoted description contains colon-space sequences. Both PyYAML and claude plugin validate reject it. Claude validator reports metadata will be dropped at runtime. Catalog CI only regex-checks field presence, so it misses this defect.

Evidence: `plugins/code-tools/skills/githits-research/SKILL.md:3`, `.github/workflows/validate.yml:180`.

Recommendation: Use a YAML block scalar and run a real YAML parser and host validator in CI.

### F02 — Release dry-run can discard pre-existing edits (high)

The dry-run edits real files and then runs git checkout -- <files>. A scratch Git reproduction lost an existing userNote field. The dirty-tree warning does not preserve the original bytes.

Evidence: `plugins/code-tools/skills/plugin-release/SKILL.md:80`.

Recommendation: Generate the proposed diff in a temporary copy, or restore an exact pre-run snapshot without discarding user changes.

### F03 — Rust scaffold verification does not compile tests (medium)

A fixture with a type error inside an ignored cfg(test) test passes cargo check (0) and fails cargo test --no-run (101). The skill promises scaffold compilation but selects the weaker command.

Evidence: `plugins/rust-tools/skills/test-scaffold/SKILL.md:70`.

Recommendation: Use cargo test --no-run or cargo check --tests with the owning crate and feature configuration.

### F04 — Accessibility inventory misses Astro and templ (medium)

The inventory omits .astro and .templ yet instructs the agent to stop on zero. A fixture containing index.astro returns 0 files and the stop instruction. This is a detection gap in stacks maintained by this marketplace.

Evidence: `plugins/code-tools/skills/a11y-audit/SKILL.md:11`.

Recommendation: Include supported template extensions and treat zero probe matches as a hypothesis until the target surface is checked.

### F05 — Git guard does not cover common executable forms (medium)

Payload-only tests deny git commit --no-verify but silently allow /usr/bin/git commit --no-verify and env git commit --no-verify. No commit commands were executed. This is incomplete convenience-hook coverage, not proof that repository CI can be bypassed.

Evidence: `plugins/code-tools/hooks/git-guard.sh:36`.

Recommendation: Narrow the documented guarantee; normalize supported invocation forms and retain authoritative checks outside the agent hook.

### F06 — Test-scaffold discovery promises more than the body permits (medium)

JS, Go and Rust descriptions trigger on write tests/add coverage, while bodies mandate todo/skip/ignore stubs and forbid assertions. One blind Codex sample correctly prioritized an explicit request for assertions: 4/4 artifact criteria met. This finding is the contradictory contract, not a demonstrated failure of that sample.

Evidence: `plugins/code-tools/skills/test-scaffold/SKILL.md:79`, `plugins/go-tools/skills/test-scaffold/SKILL.md:74`, `plugins/rust-tools/skills/test-scaffold/SKILL.md:75`.

Recommendation: Limit discovery to explicit scaffolding, or make complete tests the default when requested and stubs an explicit mode.

### F07 — Generic scaffold fallback still mandates starter styling (medium)

Astro component-scaffold and Go templ-component-scaffold allow alternate layouts but still prescribe Tailwind and starter tokens. This contradicts plugin claims of fallback support for other projects. Verified instruction mismatch; no generated UI was evaluated.

Evidence: `plugins/astro-tools/skills/component-scaffold/SKILL.md:106`, `plugins/go-tools/skills/templ-component-scaffold/SKILL.md:39`.

Recommendation: Read the target styling system and make starter classes conditional on the starter being present.

### F08 — Build freshness rule omits uncommitted edits (medium)

Astro perf-budget-check uses the last committed src timestamp versus dist mtime. An uncommitted source edit leaves the git log timestamp unchanged, so this method cannot establish working-tree artifact freshness. Static algorithm review; no production build or perf gate run.

Evidence: `plugins/astro-tools/skills/perf-budget-check/SKILL.md:30`.

Recommendation: Use the repository build/cache fingerprint or rebuild before reporting working-tree budgets.

### F09 — Skill audit treats allowed-tools as a restrictive boundary (medium)

The audit says underscoping allowed-tools breaks runtime. Current Claude documentation describes it as an approval grant; separate restrictions govern tool removal. The body also assumes universal undertriggering without a model-specific evaluation.

Evidence: `plugins/code-tools/skills/skill-audit/SKILL.md:25`, `plugins/code-tools/skills/skill-audit/SKILL.md:30`, [https://code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills).

Recommendation: Audit approval grants separately from restrictions and test triggering per host/model rather than using a permanent assumption.

### F10 — Pezza mark instructions have an unresolved exception (low)

The hard rule says never filled/outlined, while the file map and production guidance explicitly provide official filled outlines for static placement. The intended distinction between altering artwork and using official assets should be explicit. No visual defect is claimed.

Evidence: `plugins/pezza-design-system/skills/pezza-design/SKILL.md:11`, `plugins/pezza-design-system/skills/pezza-design/SKILL.md:25`.

Recommendation: State that official filled artwork is permitted and that the no-fill rule concerns modifying the stroke master.

### F11 — Ideation requires a second user override (low)

The escape hatch requires pushing back once when the user says just move on, respecting only a second pushback. This adds friction for already explicit scope choices. Instruction review only, not a behavioral failure.

Evidence: `../product-dev/plugin/skills/product-ideation/SKILL.md:23`.

Recommendation: Respect the first explicit override while recording unresolved assumptions.

## Preserve these strengths

- Assessment-only audits distinguish findings from fixes and usually require contextual verification.
- Budget skills call the repository’s own gates instead of rebuilding budget logic.
- Product-dev keeps artifacts, provenance, and staleness rules separate from its entrypoints.
- Pezza packages real brand assets and tokens the model cannot infer.
- Most probes have explicit fallbacks and bounded output.

## Priority and portability

Fix F01 and F02 first; then F03–F09. Resolve F10–F11 as instruction choices. Add YAML parsing and host validation to CI. Keep source/installed drift visible rather than treating catalog presence as health.

All cross-host compatibility remains unvalidated. Treat shell interpolation, argument substitution, plugin-root paths, agents, tool grants, and hook event schemas as host adapters. Do not subtract points merely for being a correctly scoped Claude plugin.

## Ops ingestion

`audit.json` is the scored record; `ops-payload.json` is generated by `scripts/publish_skill_audit.py`. Five state metrics per entity carry score, complete findings, provenance, behavioral coverage, and portability status. Severity comes from findings, not from interpreting a numeric score. Unknown behavior has no numeric pass value. Source hashes and revisions identify what was inspected. The payload intentionally omits entity metadata to avoid replacing poller-owned metadata.

Rerunning the same report is idempotent. Changing the report creates a different dedupe key. A future complete audit emits an empty findings summary at severity 0 to clear the current summary. Individual finding metrics are not emitted, avoiding stale unresolved flags. Runtime/model benchmark histories need a separate schema and are not represented as a single passing score.

Publication status is recorded in `publication.json` after submission. No source fixes, deployments, commits, or pushes are included in this audit.
