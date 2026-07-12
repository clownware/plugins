---
name: skill-validate
description: "Validates a Claude Code skill against known ground truth using a blind agent: pin the ground truth (fixture twins, pre/post-fix commits, or a report + fix-commit pair), run the skill via an agent that does not know the expected outcome, then score reproduction, false-positive discrimination, and protocol fidelity. Use when asked to validate a skill, test a skill against ground truth, run a blind validation, check whether a skill works before release, or prove a skill's done-when criteria."
allowed-tools: Bash, Read, Glob, Grep, Agent
---

Validate a skill against ground truth. Skill and ground-truth source, if given: $ARGUMENTS

## Repo state (pre-fetched)

**Skills present:** !`out=$(find . -name SKILL.md -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null | head -8); echo "${out:-none found — name the skill by absolute path}"`
**Worktree support:** !`if git rev-parse --git-dir >/dev/null 2>&1; then echo "git repo — historical ground truth via worktrees available"; else echo "not a git repo — fixture-based ground truth only"; fi`

## Why blind, why ground truth

A skill's author testing their own skill sees what they meant, not what they wrote.
The only test that predicts field behavior: an agent that has never seen this
conversation, executing the skill exactly as written, against targets whose correct
answers are known — and scored against the skill's own written done-when, not
against generosity. Four skills in this marketplace shipped this way; every run
found something the author missed, which is the point.

## Pipeline

### 1. Pin the ground truth BEFORE anything can contaminate it

Three source shapes, pick what the skill's done-when implies:

- **Fixture twins** — a `broken` artifact seeding known defects and a `fixed` twin
  repairing exactly those. Write both yourself; keep them small; every seed must be
  individually detectable and every repair individually verifiable.
- **Historical commits** — a real pre-state and post-state from git history (e.g.
  the commit before and after a fix pass). Create read-only worktrees
  (`git worktree add <path> <sha>`); the pre-fix SHA is your detection target and
  the post-fix tree is your false-positive target. Pin SHAs now — if the fix hasn't
  landed yet, the current HEAD *is* the pre-state; record it before fixing.
- **Report + fix commit** — for fixer skills: the audit report as input, the real
  fix commit as expected output, and the report's decision items as the
  must-not-touch list.

Ground truth you cannot score mechanically is not ground truth — write down, per
item, what finding (or absence) counts as a hit before launching anything.

### 2. Scope each run tightly

Over-broad scope is the harness's known failure mode: an unscoped "audit the
components directory" run stalled a validation agent outright, and the scoped rerun
finished in a quarter of the tokens. Name exact files or directories per run;
prefer several small runs over one sweeping one; audit only what the ground truth
covers.

### 3. Write the blind protocol

The agent prompt must contain, explicitly:

- the skill's canonical path (read once, follow exactly — including its pre-fetched
  context commands, executed from the target directory, unless targets are single
  files where they're moot)
- each run's target paths and the statement that expected outcomes are unknown to it
  ("produce honest reports")
- `$ARGUMENTS` for each run (usually empty or neutral)
- hard safety rails: never modify targets, never push, stay inside named paths
- a strict final-message format (per run: findings as `severity | file:line |
  defect | criterion | verified-how`, or "no findings", plus the TLDR line — nothing
  else), so scoring is mechanical
- environment honesty: agents have no browser; the skill's degraded path is what's
  being validated, and that's the harder, more important path

Run blind agents in the background if you have other harness work to do meanwhile —
but never end your own turn with launched-and-unscored runs. Collect every report
and deliver the scorecard in the same turn; an idle harness with finished children
is a stall, not patience (observed failure mode in this harness's first
production run).

### 4. Score against the written done-when

Three dimensions, scored from the agent's report against your pinned list:

- **Reproduction** — every ground-truth defect found, at the right location, for
  the right reason (right defect, wrong reason = half credit, investigate).
- **Discrimination** — zero false positives on the fixed/clean targets. This is the
  harder bar and the one that decides trust; a defensible pattern correctly
  exempted (with the defense verified) counts *for* the skill.
- **Protocol fidelity** — did the run follow the skill's own rules: assessment-only
  respected, verified/unverified labels present, judgment calls framed as questions
  not findings, unverified coverage declared.

### 5. Verdict and iteration

- **Ship** — all three dimensions clean; record the validation result in the
  release commit body (house standard).
- **Iterate** — name the specific gap and fix the SKILL, not the test. Generalize
  the fix: if the agent missed a defect class, improve the instruction that should
  have caught it, don't hardcode the instance. Re-run only the failed runs.
- **Reject the test** — only when the ground truth itself was wrong (mis-seeded
  fixture, mislabeled commit); fix the truth, then re-run everything.

Clean up worktrees (`git worktree remove --force`) and scratch fixtures when done.

## Rules

- Ground truth is pinned before any fix lands; a moving target validates nothing.
- The agent never learns expected outcomes, sees this conversation, or gets hints
  in the prompt beyond target paths — leakage voids the run.
- Score against the skill's written done-when, not against how hard the author
  tried. A plausible-but-unproven pass is a gap, not a pass.
- One agent per bounded target set; if a run stalls, tighten scope before retrying.
- Fixture files and worktrees live outside the repo working tree (scratch space) —
  test artifacts committed by accident have happened here before.
- Report the scorecard honestly, including what the validation could not cover
  (live-browser paths, network-dependent steps) as unvalidated, not passed.
