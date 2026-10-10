"""Fetch the selected public font and Formspree AJAX browser bundle."""
import re
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[1]
agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': agent}), timeout=30).read()

css = fetch('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap').decode()
font_url = re.findall(r'url\((https://fonts.gstatic.com/[^)]+)\)', css)[-1]
assert font_url.endswith('.woff2'), font_url
(root / 'fonts').mkdir(exist_ok=True)
(root / 'fonts/inter-latin.woff2').write_bytes(fetch(font_url))
(root / 'fonts/OFL.txt').write_bytes(fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt'))
(root / 'vendor').mkdir(exist_ok=True)
(root / 'vendor/formspree-ajax.js').write_bytes(fetch('https://unpkg.com/@formspree/ajax@1'))
(root / 'vendor/formspree-LICENSE.txt').write_bytes(fetch('https://raw.githubusercontent.com/formspree/formspree-js/main/packages/formspree-ajax/LICENSE'))
print('Downloaded Inter Latin WOFF2 and Formspree AJAX, with licenses.')
