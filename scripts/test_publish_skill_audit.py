import copy
import unittest
from unittest.mock import patch

from publish_skill_audit import NoRedirect, payload_for, publish


class AuditPayloadTests(unittest.TestCase):
    def setUp(self):
        self.report = {"schema_version": 1, "run_id": "fixture", "observed_at": 1,
            "rubric_version": "1", "reviewer": "fixture", "findings": [], "entities": [{
                "id": "skill:example:review", "kind": "skill", "name": "example:review",
                "review_score": 100, "finding_ids": [], "revision": "abc", "sha256": "123",
                "source_path": "skills/review/SKILL.md", "review_scope": "static",
                "behavior": "not evaluated", "portability": "not evaluated"}]}

    def test_retry_is_idempotent_but_changed_report_gets_new_key(self):
        a = payload_for(self.report)
        self.assertEqual(a, payload_for(self.report))
        changed = copy.deepcopy(self.report)
        changed["entities"][0]["review_score"] = 95
        self.assertNotEqual(a["signals"][0]["dedupeKey"], payload_for(changed)["signals"][0]["dedupeKey"])

    def test_preserves_inventory_metadata_and_does_not_claim_behavior_pass(self):
        p = payload_for(self.report)
        self.assertNotIn("metadata", p["entities"][0])
        behavior = next(s for s in p["signals"] if s["metric"] == "skill_audit.behavior")
        self.assertEqual(behavior["valueText"], "not evaluated")
        self.assertNotIn("valueNum", behavior)

    def test_findings_drive_severity_independently_of_score(self):
        self.report["findings"] = [{"id": "F1", "severity": 3, "detail": "fixture"}]
        self.report["entities"][0]["finding_ids"] = ["F1"]
        p = payload_for(self.report)
        finding = next(s for s in p["signals"] if s["metric"] == "skill_audit.findings")
        self.assertEqual(finding["severity"], 3)
        self.assertEqual(finding["valueNum"], 1)

    def test_rejects_duplicate_and_invalid_scores(self):
        self.report["entities"].append(copy.deepcopy(self.report["entities"][0]))
        with self.assertRaises(ValueError): payload_for(self.report)
        self.report["entities"].pop()
        for value in (-1, 101, True, float("nan")):
            self.report["entities"][0]["review_score"] = value
            with self.assertRaises(ValueError): payload_for(self.report)

    def test_blocks_token_disclosure_via_redirect_or_insecure_url(self):
        self.assertIsNone(NoRedirect().redirect_request(None, None, None, None, None, None))
        with patch("urllib.request.build_opener") as opener:
            with self.assertRaises(ValueError): publish({}, "http://example.com", "secret")
            with self.assertRaises(ValueError): publish({}, "https://user:pass@example.com", "secret")
            opener.assert_not_called()


if __name__ == "__main__":
    unittest.main()
