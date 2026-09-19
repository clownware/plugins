#!/usr/bin/env bash
# PostToolUse formatter dispatcher: after Claude edits or writes a file, format
# just that file with the stack's own formatter so the diff never fails the
# project's format gate. One process per edit, routed by extension:
#   ts/tsx/js/jsx/mjs/cjs/json/jsonc/css/astro -> Biome, gated on a biome.json
#     at or above the file (stopping at the repo root)
#   go -> goimports, else gofmt;  templ -> templ fmt
#   rs -> rustfmt, edition from the nearest Cargo.toml (default 2021)
# Replaces the per-stack format-file.sh hooks that astro-tools, go-tools and
# rust-tools each shipped. Silent no-op for any other extension or when the
# formatter is not installed. Never fails the turn.
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

format_biome() {
  # Walk up to the nearest biome config, stopping at the repo root.
  local dir root=""
  dir=$(cd "$(dirname "$file")" && pwd)
  while [ -n "$dir" ] && [ "$dir" != "/" ]; do
    if [ -f "$dir/biome.json" ] || [ -f "$dir/biome.jsonc" ]; then
      root="$dir"
      break
    fi
    [ -d "$dir/.git" ] && break
    dir=$(dirname "$dir")
  done
  [ -n "$root" ] || return 0

  cd "$root" || return 0
  if [ -x node_modules/.bin/biome ]; then
    node_modules/.bin/biome format --write "$file" >/dev/null 2>&1 || true
  elif command -v biome >/dev/null 2>&1; then
    biome format --write "$file" >/dev/null 2>&1 || true
  fi
}

format_rust() {
  command -v rustfmt >/dev/null 2>&1 || return 0
  # Nearest edition: a crate's own `edition = "20xx"`, else the workspace's
  # [workspace.package] edition further up. Stop at the repo root.
  local dir edition="" e
  dir=$(cd "$(dirname "$file")" && pwd)
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
}

case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.jsonc|*.css|*.astro)
    format_biome
    ;;
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
  *.rs)
    format_rust
    ;;
esac
exit 0
