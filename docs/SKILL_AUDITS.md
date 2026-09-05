# Skill audits in Ops

The first owned-skill audit is [2026-09-05](audits/2026-09-05/REPORT.md).
Its JSON record defines the rubric, scope, findings, source hashes, and per-entity
scores. The Markdown report is the readable companion. Scoring is a reviewed
judgment, not an automated lint score or a measured model success rate.

## Publish a reviewed audit

Generate and inspect the payload first:

```sh
python3 scripts/publish_skill_audit.py docs/audits/2026-09-05/audit.json \
  --output /tmp/skill-audit-payload.json
```

Set `OPS_URL` to the deployment URL and supply `OPS_INGEST_TOKEN` through your
secret manager, then submit the same reviewed record:

```sh
python3 scripts/publish_skill_audit.py docs/audits/2026-09-05/audit.json --publish
```

For 1Password CLI, a local env file can contain the secret reference
`OPS_INGEST_TOKEN=op://Personal/OPS_INGEST_TOKEN/credential`; use that file with
`op run --env-file <local-env-file> -- python3 scripts/publish_skill_audit.py ... --publish`.
Never put the resolved token in a report, command argument, or committed file.
The publisher refuses HTTP and redirects, uses a 30-second timeout, and verifies
the response counts. It never prints the token or server error body.

No recurring audit job is installed. Run and review audits explicitly; publishing
does not run skill instructions or alter the audited packages.

## Signal contract

All five metrics are state snapshots. Each record is associated with the existing
`skill:<plugin>:<skill>` or `plugin:clownware/<plugin>` inventory ID:

| Metric | Meaning |
|---|---|
| `skill_audit.review_score` | Review index, 0–100; never a capability percentage |
| `skill_audit.findings` | Full finding summary and count; maximum finding severity drives triage |
| `skill_audit.provenance` | Run, rubric, reviewer, source revision, content hash, and coverage |
| `skill_audit.behavior` | Explicit description of tested and untested behavior |
| `skill_audit.portability` | Cross-host validation status and outstanding adapter review |

Do not mark absent behavioral tests as zero failures or 100% passed. An unknown
status carries no numeric success value. Plugin packaging scores and average skill
scores answer different questions and must remain separate.

The dedupe key combines run ID and the full report hash. An exact retry is
idempotent; changed evidence becomes a new record. Preserve observation time on
retries. A subsequent complete audit sends an empty findings summary at severity
0 for resolved entities. Do not use a partial audit to clear unreviewed findings.

The publisher omits entity metadata because the inventory poller owns it. Source
revision and hash are stored in the provenance signal instead. No dashboard
deployment or schema migration is required; `skill_audit` appears as a findings
domain. `/health` continues to describe pollers, not skill effectiveness.

## Repeat the review

1. Pin the source revision and content hash before reviewing. Inventory installed
   copies separately; local source versions do not prove release availability.
2. Read every entrypoint in scope, parse real YAML, run the host plugin validator,
   and inspect references and executable dependencies relevant to the task.
3. Execute reviewed probes in empty, matching, and unrelated contexts. Check their
   meaning as well as exit status. Never automatically execute arbitrary Markdown.
4. Record findings with exact locations, reproduction evidence, and proposed fixes.
5. Use isolated blind fixtures for behavioral samples. Record host/model identity,
   artifact criteria, tool availability, and any baseline comparison. Never claim
   broad compatibility from one successful sample.
6. Review the complete JSON record and generated payload, publish, and retain the
   server acknowledgement beside the report.

Validate the publisher with `python3 -m unittest discover -s scripts -p 'test_*.py'`.
