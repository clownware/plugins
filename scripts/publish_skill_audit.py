#!/usr/bin/env python3
"""Convert a reviewed audit to Ops signals; publish only with --publish.

Uses only the standard library. Credentials stay in OPS_INGEST_TOKEN.
The report is the scoring authority; this tool does not grade skills.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sys
import time
import urllib.error
import urllib.parse
import urllib.request


def payload_for(report):
    if report.get("schema_version") != 1:
        raise ValueError("unsupported audit schema")
    stamp = report["observed_at"]
    if type(stamp) is not int or not 0 <= stamp <= time.time() + 86400:
        raise ValueError("invalid observation timestamp")
    digest = hashlib.sha256(json.dumps(report, sort_keys=True).encode()).hexdigest()
    key = f"{report['run_id']}:{digest}"
    entities, signals, seen = [], [], set()
    findings = {f["id"]: f for f in report["findings"]}
    if len(findings) != len(report["findings"]):
        raise ValueError("duplicate finding IDs")
    for row in report["entities"]:
        eid = row["id"]
        if eid in seen or not eid.startswith(("skill:", "plugin:")):
            raise ValueError("invalid or duplicate entity ID")
        seen.add(eid)
        score = row["review_score"]
        if type(score) is not int or not 0 <= score <= 100:
            raise ValueError("review score must be an integer from 0 to 100")
        linked = [findings[f] for f in row["finding_ids"]]
        if any(type(f["severity"]) is not int or not 0 <= f["severity"] <= 4 for f in linked):
            raise ValueError("invalid severity")
        severity = max((f["severity"] for f in linked), default=0)
        # Do not overwrite inventory metadata owned by the manifests poller.
        entities.append({"id": eid, "kind": row["kind"], "name": row["name"],
                         "category": "plugin_skill", "owner": "clownware"})
        def add(metric, text, number=None, sev=0):
            item = {"entityId": eid, "metric": metric, "valueText": text,
                    "severity": sev, "observedAt": stamp, "dedupeKey": key}
            if number is not None:
                item["valueNum"] = number
            signals.append(item)
        add("skill_audit.review_score", "Static review only; 100 means no deductions in this rubric, not proven capability.", score)
        add("skill_audit.findings", json.dumps(linked, separators=(",", ":")), len(linked), severity)
        add("skill_audit.provenance", json.dumps({"run": report["run_id"], "rubric": report["rubric_version"],
            "revision": row["revision"], "sha256": row["sha256"], "source_path": row["source_path"],
            "reviewer": report["reviewer"], "scope": row["review_scope"]}, separators=(",", ":")))
        add("skill_audit.behavior", row["behavior"])
        add("skill_audit.portability", row["portability"])
    if not entities or len(entities) > 500 or len(signals) > 500:
        raise ValueError("payload must contain 1–500 entities and at most 500 signals; split the audit")
    payload = {"entities": entities, "signals": signals}
    if len(json.dumps(payload).encode()) > 1_000_000:
        raise ValueError("payload exceeds Ops body limit")
    return payload


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def publish(payload, url, token):
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.query or parsed.fragment:
        raise ValueError("OPS_URL must be a credential-free HTTPS URL without query or fragment")
    if not token:
        raise ValueError("OPS_INGEST_TOKEN is not set")
    request = urllib.request.Request(url.rstrip("/") + "/ingest", data=json.dumps(payload).encode(),
        headers={"Authorization": "Bearer " + token, "Content-Type": "application/json",
                 "User-Agent": "ops-skill-audit/1.0"}, method="POST")
    try:
        with urllib.request.build_opener(NoRedirect).open(request, timeout=30) as response:
            result = json.load(response)
            if response.status != 202 or result.get("ok") is not True:
                raise ValueError("Ops did not acknowledge ingestion")
    except urllib.error.HTTPError as error:
        # Never echo response bodies or request headers: either could contain secrets.
        raise ValueError(f"Ops ingestion failed: HTTP {error.code}") from None
    if result.get("entities") != len(payload["entities"]) or result.get("signals") != len(payload["signals"]):
        raise ValueError("Ops acknowledged unexpected counts; verify before retrying")
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("report", type=Path)
    parser.add_argument("--output", type=Path, help="write reviewable payload")
    parser.add_argument("--publish", action="store_true")
    parser.add_argument("--url", default=os.environ.get("OPS_URL"))
    args = parser.parse_args()
    try:
        payload = payload_for(json.loads(args.report.read_text()))
        if args.output:
            args.output.write_text(json.dumps(payload, indent=2) + "\n")
        print(f"Prepared {len(payload['entities'])} entities and {len(payload['signals'])} signals")
        if args.publish:
            if not args.url:
                raise ValueError("set OPS_URL or --url")
            print(json.dumps(publish(payload, args.url, os.environ.get("OPS_INGEST_TOKEN"))))
    except (ValueError, KeyError, OSError, urllib.error.URLError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
