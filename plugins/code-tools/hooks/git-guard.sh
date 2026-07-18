#!/usr/bin/env bash
# PreToolUse guard on Bash tool calls. Two policies, both deterministic:
#   1. git commit/push with --no-verify is denied — hooks are the contract.
#   2. git commit scans staged changes for secrets first (gitleaks when
#      installed, high-confidence token patterns otherwise) and denies on a hit.
# Anything that isn't a git command, or any environment where the payload
# can't be parsed, is a silent allow — the guard must never break Bash.
set -uo pipefail

payload=$(cat)

extract_command() {
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$payload" | jq -r '.tool_input.command // empty' 2>/dev/null
  elif command -v python3 >/dev/null 2>&1; then
    printf '%s' "$payload" | python3 -c 'import json,sys
print(json.load(sys.stdin).get("tool_input",{}).get("command","") or "")' 2>/dev/null
  fi
}

cmd=$(extract_command)
[ -n "$cmd" ] || exit 0

deny() {
  reason=$1
  if command -v jq >/dev/null 2>&1; then
    jq -cn --arg r "$reason" \
      '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  else
    printf '%s' "$reason" | python3 -c 'import json,sys
print(json.dumps({"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":sys.stdin.read()}}))'
  fi
  exit 0
}

is_git=false
printf '%s' "$cmd" | grep -qE '(^|[;&|(]|&&|\|\|)[[:space:]]*git[[:space:]]' && is_git=true
[ "$is_git" = true ] || exit 0

# Policy 1: never bypass the repo's own hooks. Catches --no-verify on
# commit/push and commit's -n shorthand.
if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+([^;&|]*[[:space:]])?(commit|push)'; then
  if printf '%s' "$cmd" | grep -qE -- '--no-verify([[:space:]]|$|=)' \
    || printf '%s' "$cmd" | grep -qE 'git[[:space:]]+([^;&|]*[[:space:]])?commit[^;&|]*[[:space:]]-n([[:space:]]|$)'; then
    deny "Blocked: git commit/push with --no-verify. This repo's hooks are the quality gate — fix what the hook rejects instead of bypassing it."
  fi
fi

# Policy 2: secret scan on commit. Run from the session's cwd so the scan
# hits the same repo the commit will.
printf '%s' "$cmd" | grep -qE 'git[[:space:]]+([^;&|]*[[:space:]])?commit' || exit 0
if command -v jq >/dev/null 2>&1; then
  session_cwd=$(printf '%s' "$payload" | jq -r '.cwd // empty' 2>/dev/null)
else
  session_cwd=$(printf '%s' "$payload" | python3 -c 'import json,sys
print(json.load(sys.stdin).get("cwd","") or "")' 2>/dev/null)
fi
[ -n "$session_cwd" ] && [ -d "$session_cwd" ] && cd "$session_cwd"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

if command -v gitleaks >/dev/null 2>&1; then
  out=$(gitleaks git --staged --no-banner --redact 2>&1)
  status=$?
  if printf '%s' "$out" | grep -qiE 'unknown command|unknown flag'; then
    out=$(gitleaks protect --staged --no-banner --redact 2>&1)
    status=$?
  fi
  if [ "$status" -ne 0 ] && printf '%s' "$out" | grep -qiE 'leaks found|warning.*leak'; then
    deny "Blocked: gitleaks found potential secrets in the staged changes. Run 'gitleaks git --staged' to see them, remove or env-var the values, then re-stage."
  fi
  exit 0
fi

# Fallback: high-confidence token shapes in added lines only.
hits=$(git diff --cached --diff-filter=ACM | grep -E '^\+' | grep -cE \
  -e '-----BEGIN [A-Z ]*PRIVATE KEY' \
  -e 'AKIA[0-9A-Z]{16}' \
  -e 'ghp_[A-Za-z0-9]{36}' \
  -e 'github_pat_[A-Za-z0-9_]{22,}' \
  -e 'xox[baprs]-[A-Za-z0-9-]{10,}' \
  -e 'sk-ant-[A-Za-z0-9_-]{20,}' \
  -e 'sk-[A-Za-z0-9]{40,}' \
  -e 'AIza[0-9A-Za-z_-]{35}' \
  2>/dev/null) || hits=0
if [ "${hits:-0}" -gt 0 ]; then
  deny "Blocked: $hits staged line(s) match known secret/token patterns (private keys, AWS/GitHub/Slack/Anthropic/Google tokens). Review 'git diff --cached', move the values to environment variables, then re-stage."
fi

exit 0
