#!/usr/bin/env bash
# PostToolUse formatter: after Claude edits or writes a file, run Biome on
# just that file so the diff never fails the project's format gate. Gated on
# a biome.json at or above the file (stopping at the repo root), so this is
# a silent no-op in projects that don't use Biome. Never fails the turn.
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
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.jsonc|*.css|*.astro) ;;
  *) exit 0 ;;
esac

# Walk up to the nearest biome config, stopping at the repo root.
dir=$(cd "$(dirname "$file")" && pwd)
root=""
while [ -n "$dir" ] && [ "$dir" != "/" ]; do
  if [ -f "$dir/biome.json" ] || [ -f "$dir/biome.jsonc" ]; then
    root="$dir"
    break
  fi
  [ -d "$dir/.git" ] && break
  dir=$(dirname "$dir")
done
[ -n "$root" ] || exit 0

cd "$root" || exit 0
if [ -x node_modules/.bin/biome ]; then
  node_modules/.bin/biome format --write "$file" >/dev/null 2>&1 || true
elif command -v biome >/dev/null 2>&1; then
  biome format --write "$file" >/dev/null 2>&1 || true
fi
exit 0
