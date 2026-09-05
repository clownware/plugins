#!/usr/bin/env python3
"""Validate local marketplace plugin structure and real skill YAML; never execute skills."""
import json, os, re, stat, sys

import yaml

errors = []
plugin_dirs = sorted(
    d for d in (os.path.join("plugins", n) for n in os.listdir("plugins"))
    if os.path.isdir(d)
)
if not plugin_dirs:
    sys.exit("FAIL: no plugin directories under plugins/")

for pdir in plugin_dirs:
    tag = os.path.basename(pdir)
    mpath = os.path.join(pdir, ".claude-plugin", "plugin.json")
    try:
        with open(mpath) as f:
            manifest = json.load(f)
    except FileNotFoundError:
        errors.append(f"{tag}: missing {mpath}")
        continue
    except json.JSONDecodeError as e:
        errors.append(f"{tag}: {mpath} invalid JSON — {e}")
        continue

    name = manifest.get("name", "")
    if not re.fullmatch(r"[a-z0-9-]+", name):
        errors.append(f"{tag}: plugin.json 'name' must be kebab-case, got {name!r}")
    if not re.fullmatch(r"\d+\.\d+\.\d+", manifest.get("version", "")):
        errors.append(f"{tag}: plugin.json 'version' must be semver, got {manifest.get('version')!r}")
    if not manifest.get("description"):
        errors.append(f"{tag}: plugin.json 'description' is empty")

    hooks_ref = manifest.get("hooks")
    hooks_path = None
    if isinstance(hooks_ref, str):
        hooks_path = os.path.normpath(os.path.join(pdir, hooks_ref))
        if not os.path.isfile(hooks_path):
            errors.append(f"{tag}: plugin.json 'hooks' points at missing file {hooks_ref}")
            hooks_path = None
    elif os.path.isfile(os.path.join(pdir, "hooks", "hooks.json")):
        hooks_path = os.path.join(pdir, "hooks", "hooks.json")

    if hooks_path:
        try:
            with open(hooks_path) as f:
                hooks_cfg = json.load(f)
        except json.JSONDecodeError as e:
            errors.append(f"{tag}: {hooks_path} invalid JSON — {e}")
            hooks_cfg = {}
        events = hooks_cfg.get("hooks")
        if not isinstance(events, dict) or not events:
            errors.append(f"{tag}: {hooks_path} must have a non-empty top-level 'hooks' object")
        else:
            for event, matchers in events.items():
                if not isinstance(matchers, list):
                    errors.append(f"{tag}: hooks.{event} must be an array")
                    continue
                for m in matchers:
                    for h in m.get("hooks", []):
                        if h.get("type") != "command":
                            continue
                        cmd = h.get("command", "")
                        for rel in re.findall(r"\$\{CLAUDE_PLUGIN_ROOT\}\"?(/[^\s\"']+)", cmd):
                            script = os.path.normpath(pdir + rel)
                            if not os.path.isfile(script):
                                errors.append(f"{tag}: hook command references missing file {rel}")
                            elif not os.stat(script).st_mode & stat.S_IXUSR:
                                errors.append(f"{tag}: hook script {rel} is not executable (chmod +x)")

    skills_dir = os.path.join(pdir, "skills")
    if os.path.isdir(skills_dir):
        for sname in sorted(os.listdir(skills_dir)):
            spath = os.path.join(skills_dir, sname, "SKILL.md")
            if not os.path.isdir(os.path.join(skills_dir, sname)):
                continue
            if not os.path.isfile(spath):
                errors.append(f"{tag}: skills/{sname}/ has no SKILL.md")
                continue
            with open(spath) as f:
                text = f.read()
            fm = re.match(r"\A---\n(.*?)\n---\n", text, re.DOTALL)
            if not fm:
                errors.append(f"{tag}: skills/{sname}/SKILL.md missing frontmatter block")
                continue
            try:
                metadata = yaml.safe_load(fm.group(1))
            except yaml.YAMLError as exc:
                errors.append(f"{tag}: skills/{sname}/SKILL.md invalid YAML: {exc}")
                continue
            if not isinstance(metadata, dict):
                errors.append(f"{tag}: skills/{sname}/SKILL.md frontmatter must be a mapping")
                continue
            for field in ("name", "description"):
                if not isinstance(metadata.get(field), str) or not metadata[field].strip():
                    errors.append(f"{tag}: skills/{sname}/SKILL.md frontmatter missing string '{field}'")
            if metadata.get("name") != sname:
                errors.append(f"{tag}: skills/{sname}/SKILL.md name must match directory")

with open(".claude-plugin/marketplace.json") as f:
    mp = json.load(f)
for entry in mp.get("plugins", []):
    src = entry.get("source")
    if isinstance(src, str) and not os.path.isdir(src):
        errors.append(f"catalog: {entry.get('name')} relative source {src} does not exist")

if errors:
    print("plugin validation FAILED:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
print(f"OK: {len(plugin_dirs)} in-repo plugin(s) valid")
