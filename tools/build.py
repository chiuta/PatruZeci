"""Concatenates src/ into a single self-contained index.html and writes app.json (run from anywhere)."""
import pathlib, re, hashlib, base64, json
VERSION = '3.2.0'
UPDATED = '2026-11-14'
root = pathlib.Path(__file__).resolve().parent.parent
d = root / 'src'
css = (d / 'style.css').read_text(encoding='utf-8')
shell = (d / 'shell.html').read_text(encoding='utf-8')
js = ''.join((d / f).read_text(encoding='utf-8') + '\n' for f in ['scenes.js', 'data.js', 'data_full.js', 'i18n.js', 'content_en.js', 'app.js'])
assert '</script' not in js
sw = ("if('serviceWorker' in navigator&&window.isSecureContext&&/^https?:$/.test(location.protocol))"
      "addEventListener('load',function(){var s=navigator.serviceWorker;s.register('./sw.js',{updateViaCache:'none'})"
      ".catch(function(){});s.ready.then(function(r){if(s.controller)return r.update()}).catch(function(){})})")
main = f'\n{js}\n'
def h(x):
    return "'sha256-" + base64.b64encode(hashlib.sha256(x.encode('utf8')).digest()).decode() + "'"
csp = ("default-src 'none'; script-src " + h(main) + ' ' + h(sw) +
       "; style-src 'unsafe-inline'; img-src 'self' data:; worker-src 'self'; connect-src 'none'; "
       "base-uri 'none'; form-action 'none'; manifest-src 'self'")
html = f'''<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0b131b">
<title>PATRUZECI — WD-40</title>
<meta name="description" content="Offline, illustrated and animated atlas of WD-40 uses. Unofficial. RO EN FR IT ES PT DE HU.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-192.png">
<style>{css}</style></head><body>
{shell}
<script>{main}</script>
<script>{sw}</script></body></html>'''
out = root / 'index.html'
out.write_text(html, encoding='utf-8')
raw = html.encode('utf-8')
(root / 'app.json').write_text(json.dumps({
    'schema': 1, 'slug': 'patruzeci', 'name': 'PATRUZECI — WD-40 atlas', 'version': VERSION, 'updated': UPDATED,
    'description': 'Illustrated, animated, offline atlas of WD-40 uses (unofficial).',
    'egress': [], 'permissions': ['serviceWorker', 'localStorage'],
    'storageKeys': ['patruzeci-fav', 'patruzeci-lang'],
    'sizeBytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest(),
    'features': {'i18n': ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de', 'hu'], 'pwa': {'manifest': True, 'serviceWorker': True}},
}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(out, len(html) // 1024, 'KB')
