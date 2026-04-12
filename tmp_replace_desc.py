from pathlib import Path
import re

path = Path('js/layers.js')
text = path.read_text(encoding='utf-8')
lines = text.splitlines()
start, end = 3773, 4373
re_match = re.compile(r'^(\s*)description\s*:\s*("([^"]*)"|\'([^\']*)\')\s*,?\s*$')
changed = 0
for i in range(start-1, min(end, len(lines))):
    line = lines[i]
    m = re_match.match(line)
    if m:
        indent = m.group(1)
        content = m.group(3) if m.group(3) is not None else m.group(4)
        escaped = content.replace('\\', '\\\\').replace('"', '\\"')
        lines[i:i+1] = [
            f'{indent}description() {{a="{escaped}";',
            f'{indent}    if(options.chinese) a="";',
            f'{indent}    return a}}',
        ]
        changed += 1
path.write_text('\n'.join(lines) + ('\n' if text.endswith('\n') else ''), encoding='utf-8')
print(f'Changed {changed} lines')
