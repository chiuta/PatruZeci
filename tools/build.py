"""Concatenates src/ into a single self-contained index.html (run from anywhere)."""
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
d = root / 'src'
css = (d / 'style.css').read_text(encoding='utf-8')
shell = (d / 'shell.html').read_text(encoding='utf-8')
js = ''.join((d / f).read_text(encoding='utf-8') + '\n' for f in ['scenes.js', 'data.js', 'data_full.js', 'app.js'])
assert '</script' not in js
html = f'''<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0b131b">
<title>PATRUZECI — atlasul ilustrat al utilizărilor WD-40</title>
<meta name="description" content="Atlas offline, ilustrat și animat, al utilizărilor spray-ului multifuncțional WD-40. Neoficial.">
<style>{css}</style></head><body>
{shell}
<script>
{js}
</script></body></html>'''
out = root / 'index.html'
out.write_text(html, encoding='utf-8')
print(out, len(html) // 1024, 'KB')
