"""Behavioral checks for executable audit regressions; no real commits/pushes."""
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class SkillRegressions(unittest.TestCase):
    def test_yaml_parser_rejects_colon_error_and_accepts_block_scalar(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            plugin = root / 'plugins/example'
            (plugin / '.claude-plugin').mkdir(parents=True)
            (plugin / 'skills/example').mkdir(parents=True)
            (root / '.claude-plugin').mkdir()
            (plugin / '.claude-plugin/plugin.json').write_text(json.dumps({
                'name': 'example', 'version': '1.0.0', 'description': 'Example'}))
            (root / '.claude-plugin/marketplace.json').write_text(json.dumps({
                'plugins': [{'name': 'example', 'source': './plugins/example'}]}))
            entry = plugin / 'skills/example/SKILL.md'
            for description, passes in [('description: Guidance: examples', False),
                                        ('description: >-\n  Guidance: examples', True)]:
                entry.write_text(f'---\nname: example\n{description}\n---\nUse this fixture.\n')
                result = subprocess.run([sys.executable, str(ROOT / 'scripts/validate_plugins.py')],
                                        cwd=root, capture_output=True, text=True, timeout=10)
                self.assertEqual(result.returncode == 0, passes, result.stdout + result.stderr)

    def test_guard_covers_supported_command_forms_without_running_them(self):
        deny = ['git commit --no-verify', '/usr/bin/git commit --no-verify',
                'env git commit --no-verify', 'env -i git push --no-verify',
                'env FOO=bar /usr/bin/git commit -n', 'command git push --no-verify',
                'git -C /tmp commit --no-verify']
        allow = ['git status', 'git push -n', 'echo git commit --no-verify',
                 'printf hello', 'git diff --stat']
        with tempfile.TemporaryDirectory() as temp:
            for command in deny + allow:
                with self.subTest(command=command):
                    result = subprocess.run(['bash', str(ROOT / 'plugins/code-tools/hooks/git-guard.sh')],
                        input=json.dumps({'cwd': temp, 'tool_input': {'command': command}}),
                        text=True, capture_output=True, timeout=5)
                    self.assertEqual(result.returncode, 0, result.stderr)
                    output = json.loads(result.stdout) if result.stdout.strip() else {}
                    decision = output.get('hookSpecificOutput', {}).get('permissionDecision')
                    self.assertEqual(decision == 'deny', command in deny)

    def test_accessibility_probe_discovers_both_owned_template_stacks(self):
        text = (ROOT / 'plugins/code-tools/skills/a11y-audit/SKILL.md').read_text()
        line = next(line for line in text.splitlines() if line.startswith('**Markup/component files:**'))
        command = re.search(r'!`([^`]+)`', line)[1]
        with tempfile.TemporaryDirectory() as temp:
            for name in ['index.astro', 'view.templ']:
                (Path(temp) / name).write_text('<button>Example</button>')
            for shell in ['bash', 'zsh']:
                if not shutil.which(shell):
                    continue
                result = subprocess.run([shell, '-f', '-c', command], cwd=temp,
                                        text=True, capture_output=True, timeout=5)
                self.assertEqual(result.returncode, 0)
                self.assertEqual(result.stderr, '')
                self.assertTrue(result.stdout.startswith('2 files'), result.stdout)


if __name__ == '__main__':
    unittest.main()
