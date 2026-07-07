---
name: security-audit
description: "Audits a repo for security vulnerabilities across auth/session, injection/output-encoding, and platform/infra, then verifies every finding against the code before reporting. Use when asked to do a security audit or review, find vulnerabilities, check for XSS/SQLi/CSRF/auth issues, assess whether code is safe to ship or expose publicly, or review the security of a change. Assessment only — it reports and ranks, it does not patch."
allowed-tools: Bash, Read, Glob, Grep, Agent, WebSearch
---

Security-audit this repository. Focus, if given: $ARGUMENTS

## Repo context (pre-fetched)

**Toolchain:** !`out=$(ls go.mod package.json pyproject.toml requirements.txt Cargo.toml pom.xml build.gradle Gemfile composer.json 2>/dev/null); echo "${out:-unrecognized — infer from source extensions}"`
**Dependency scanners available:** !`out=$(command -v govulncheck npm pip-audit cargo-audit osv-scanner trivy snyk bundler-audit 2>/dev/null); echo "${out:-none on PATH — audit deps by reading lockfiles + advisories}"`
**Auth/session/security-relevant files:** !`out=$(rg -l -i "cookie|jwt|session|password|csrf|oauth|bcrypt|crypto/rand|subtle\.|SetCookie|Authorization" --iglob '!*_test.*' --iglob '!node_modules' 2>/dev/null | head -20); echo "${out:-none matched — locate auth by reading routing/middleware}"`
**Prior security decisions:** !`out=$(rg -l -i "threat model|security|owasp|rls|csrf|xss" docs/ CLAUDE.md CONTRIBUTING.md SECURITY.md 2>/dev/null | head -8); echo "${out:-none found — no written threat model (note it)}"`
**Env/secret surface:** !`out=$(ls .env .env.example .env.local docker-compose.yml Dockerfile 2>/dev/null; ls .github/workflows/ 2>/dev/null); echo "${out:-none}"`
**Secrets ever committed (name check):** !`out=$(git log --all --diff-filter=A --name-only --format= -- '*.env' '.env*' '*.pem' '*.key' '*_rsa' 2>/dev/null | grep -v '\.env\.example$' | sort -u | head); echo "${out:-none — no obvious secret files in history (still grep contents)}"`

## Pipeline

Scale to repo size: fan out parallel read-only agents (one per lens) for anything non-trivial; work inline only for a small diff or single-package repo. If $ARGUMENTS scopes to a diff or PR, audit that surface but still check what it *reaches* (a handler change pulls in its middleware chain).

### 1. Establish the repo's own bar first

Read the threat model / security ADRs / prior audits (pre-fetched) before hunting. An audit against the repo's *own* stated guarantees ("ADR says RLS is enforced at runtime" — is it?) is stronger than a generic OWASP sweep. Note decisions made deliberately (a documented `X-XSS-Protection: 0` in favor of CSP is correct, not a finding) so you don't report intended behavior as a defect.

### 2. Three-lens fan-out

- **Auth & session** — JWT verification (signature actually checked, or only decoded? alg-confusion/`alg=none`, expiry/aud/iss); cookie flags (HttpOnly/Secure/SameSite/Path/expiry) on *every* `Set-Cookie`; CSRF (entropy from a CSPRNG, constant-time compare, which routes protected, fixation); session lifecycle (logout invalidates? refresh handling?); rate-limit key (spoofable via `X-Forwarded-For`? unbounded memory per key?); middleware **order and coverage** (which routes wired without the auth/CSRF they need).
- **Injection & output** — SQL built by concatenation anywhere (including `SET`/DDL statements that can't take bind params — check quoting); XSS via raw/unescaped output, template-escaping bypasses (hand-rolled string interpolation into HTML/JS/JSON contexts), user input in trigger/redirect headers; open redirects from user-controlled targets; input validation gaps at boundaries; header injection; path traversal in file serving; IDOR / missing ownership checks on ID-addressed routes.
- **Platform & infra** — security headers + CSP (`unsafe-inline`/`unsafe-eval`?); debug/metrics/pprof exposure and the constant-timeness of any guard token; error/log information leakage (internal errors or PII to clients/logs); config and secret handling (insecure defaults, secrets in history — grep contents, not just filenames); Docker (non-root? secrets in layers?); CI/CD (mutable-tag vs SHA-pinned actions, `pull_request_target` secret exposure, `GITHUB_TOKEN` scope); server hardening (timeouts, body-size limits); DB (TLS/`sslmode`, pool, migration/RLS correctness).

Findings concentrate at the **seams between lenses** and between a lens and the repo's stated bar.

### 3. Run the scanners (don't reason about deps)

Run whatever's on PATH (pre-fetched): `govulncheck ./...`, `npm audit`, `pip-audit`, `cargo audit`, etc. Then sweep git history *contents* for live secrets, not just filenames — a committed `.env.example` is fine; a real key in an old commit is not. Distinguish reachable from merely-present: govulncheck's call-graph reachability is the signal, a raw CVE count is noise. Use WebSearch only to check an advisory's real-world exploitability when reachability is unclear.

### 4. Adversarial verification (MANDATORY — this is the step that earns the audit)

Sub-agents and scanners over-report and mis-severitize. Before anything reaches the report, hand-verify with Read/Grep:

- **Every** critical/high claim — open the cited line and confirm the defect is what's described. The most common false positive: a flaw cited on a cookie that's being *deleted*, an endpoint claimed unprotected that a *global* middleware already wraps, a "missing" control that exists one layer up.
- **Reachability decides severity.** A raw string-interpolation XSS is critical if user input flows to it and low if the only caller passes a constant — trace the callers before ranking. Say so explicitly.
- **Every "X is missing"** — search again yourself; absence claims are the easiest to get wrong.
- Know the platform defaults before calling something absent (e.g. Go caps request *headers* at 1MB with no config — so "no MaxHeaderBytes" is not unbounded; the real gap is *body* size). A wrong default turns a non-issue into a fake finding.

Label each reported finding **confirmed** (you read the code and reproduced the logic) or **unverified** (scanner/agent claim you couldn't fully stand up — say why you still believe it). Never present unverified as fact. When you downgrade or reject a sub-agent's finding, **report the correction** — the reasoning is as valuable as a new find.

### 5. Report

1. **Verdict** — one line: are there confirmed criticals/highs, is it safe to ship/expose, scanner status.
2. **Confirmed findings, ranked by severity** — each with `file:line`, one-sentence defect, the reachability that sets its severity, and the structural root cause.
3. **Corrections** — sub-agent/scanner claims you downgraded or rejected on verification, with why. Include this section; a clean verify pass is a result.
4. **Verified clean** — the controls you checked and found sound, cited. Absence of a finding is only credible if you show where you looked. Name the good patterns so a later fix pass doesn't strip them.
5. **Found Work** — non-security correctness issues noticed in passing; reported, not fixed.

## Rules

- **Assessment only.** The deliverable is the report. Do not patch anything unless the user asks afterward; cite the fix, don't apply it. (Editing mid-audit also invalidates your own `file:line` citations.)
- A finding without a `file:line` is an opinion — cite everything, quote the evidence line.
- **Severity follows reachability, not pattern-match.** Rank by whether an attacker can actually reach the code with hostile input, not by how scary the sink looks in isolation.
- Never trust a scanner count or an agent's severity — the verify pass is not optional, and its corrections belong in the report.
- Don't report intended, documented security decisions as defects; check the threat model first.
- Distrust green: a passing scanner covers known-CVE deps, not your own logic. Absence of govulncheck hits ≠ absence of vulnerabilities.
- Degrade gracefully: no threat-model doc is itself a finding (recommend one); no scanners on PATH means audit deps by reading lockfiles against advisories, and say the coverage is reduced.
- Handle real secrets found in history as sensitive: report the file, commit, and rotation need — do not echo the secret value into the report.
