#!/usr/bin/env bash
# PostToolUse formatter: after Claude edits or writes a .rs file, run rustfmt
# on just that file so the diff never fails the repo's `cargo fmt --check`
# gate. Edition is detected from the nearest Cargo.toml walking up (including
# [workspace.package] edition), defaulting to 2021. Silent no-op when rustfmt
# is not installed. Never fails the turn.
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
  *.rs) ;;
  *) exit 0 ;;
esac
command -v rustfmt >/dev/null 2>&1 || exit 0

# Nearest edition: a crate's own `edition = "20xx"`, else the workspace's
# [workspace.package] edition further up. Stop at the repo root.
dir=$(cd "$(dirname "$file")" && pwd)
edition=""
while [ -n "$dir" ] && [ "$dir" != "/" ]; do
  if [ -f "$dir/Cargo.toml" ]; then
    e=$(grep -m1 -oE '^edition *= *"[0-9]{4}"' "$dir/Cargo.toml" 2>/dev/null | grep -oE '[0-9]{4}')
    if [ -z "$e" ]; then
      e=$(awk '/^\[workspace\.package\]/{f=1;next} /^\[/{f=0} f && /^edition *=/' "$dir/Cargo.toml" 2>/dev/null | grep -m1 -oE '[0-9]{4}')
    fi
    if [ -n "$e" ]; then
      edition="$e"
      break
    fi
  fi
  [ -d "$dir/.git" ] && break
  dir=$(dirname "$dir")
done

rustfmt --edition "${edition:-2021}" "$file" >/dev/null 2>&1 || true
exit 0
