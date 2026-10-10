"""Download open-source icons and optimise supplied logo files without changing artwork."""
import urllib.request
from io import BytesIO
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
icons = root / 'images/icons'
icons.mkdir(exist_ok=True)
logos = root / 'images/logos'
logos.mkdir(exist_ok=True)

def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(request, timeout=30).read()

def download(destination, url):
    if not destination.exists():
        destination.write_bytes(fetch(url))

for name in ['arrow-up-right', 'arrow-right', 'sun', 'moon', 'graduation-cap', 'briefcase-business', 'heart', 'linkedin', 'github', 'mail', 'brain', 'chart-no-axes-combined', 'database', 'chevron-down', 'users', 'award']:
    download(icons / f'{name}.svg', f'https://unpkg.com/lucide-static@0.468.0/icons/{name}.svg')

for name in ['python', 'r', 'apachespark', 'googlecloud', 'tableau', 'alteryx', 'microsoftexcel', 'git', 'latex', 'anthropic', 'openai']:
    download(icons / f'tool-{name}.svg', f'https://raw.githubusercontent.com/simple-icons/simple-icons/11.15.0/icons/{name}.svg')
download(icons / 'tool-claude.svg', 'https://raw.githubusercontent.com/simple-icons/simple-icons/13.21.0/icons/claude.svg')

download(root / 'vendor/lucide-LICENSE.txt', 'https://unpkg.com/lucide-static@0.468.0/LICENSE')
download(root / 'vendor/simple-icons-LICENSE.txt', 'https://raw.githubusercontent.com/simple-icons/simple-icons/11.15.0/LICENSE.md')

for source, destination, width in [('roofly_logo.jpeg', 'roofly.webp', 480), ('lse_logo.webp', 'lse.webp', 160), ('uon_emblem.gif', 'uon.webp', 160)]:
    image = Image.open(root / 'images/web' / source).convert('RGBA')
    image.thumbnail((width, width * 2))
    image.save(logos / destination, 'WEBP', quality=90, method=6)
    print(destination, image.size)
print('Visual assets prepared.')
bcg_url = 'https://boston-consulting-group-brightspot.s3.amazonaws.com/80/a6/ad2fc39f43f8b109f3395aee65a0/bcg-secondarylogo-rgb-logogreen.png'
bcg = Image.open(BytesIO(fetch(bcg_url)))
bcg.thumbnail((500, 180))
bcg.save(logos / 'bcg.webp', 'WEBP', quality=90, method=6)
download(logos / 'oxford.svg', 'https://www.bsg.ox.ac.uk/themes/custom/olamalu_bsg_emulsify/images/logo.svg')
