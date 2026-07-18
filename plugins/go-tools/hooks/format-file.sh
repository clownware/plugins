#!/usr/bin/env bash
# PostToolUse formatter: after Claude edits or writes a .go or .templ file,
# format just that file (goimports > gofmt for Go, templ fmt for templates)
# so the diff never fails the project's fmt:check gate. Silent no-op when no
# formatter is installed. Never fails the turn.
set -uo pipefail

payload=$(cat)

if command -v jq >/dev/null 2>&1; then
  file=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
elif command -v python3 >/dev/null 2>&1; then
  file=$(printf '%s' "$payload" | python3 -c 'import json,sys
print(json.load(sys.stdin).get("tool_input",{}).get("file_path","") or "")' 2>/dev/null)
else
  exit 0
fi
[ -n "$file" ] && [ -f "$file" ] || exit 0

case "$file" in
  *.go)
    if command -v goimports >/dev/null 2>&1; then
      goimports -w "$file" >/dev/null 2>&1 || true
    elif command -v gofmt >/dev/null 2>&1; then
      gofmt -w "$file" >/dev/null 2>&1 || true
    fi
    ;;
  *.templ)
    if command -v templ >/dev/null 2>&1; then
      templ fmt "$file" >/dev/null 2>&1 || true
    fi
    ;;
esac
exit 0
