const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const content = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));
const preview = content.socialPreview;
const imageUrl = new URL(preview.image, preview.siteUrl).href;
const escape = value => String(value).replace(/[&"<>]/g, character => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' }[character]));
const start = '  <!-- Generated sharing metadata from content.json -->';
const end = '  <!-- End sharing metadata -->';

for (const file of fs.readdirSync(root).filter(file => file.endsWith('.html'))) {
  const filename = path.join(root, file);
  let html = fs.readFileSync(filename, 'utf8');
  const newline = html.includes('\r\n') ? '\r\n' : '\n';
  const pageUrl = new URL(file === 'index.html' ? '' : file, preview.siteUrl).href;
  const properties = {
    'og:type': 'website',
    'og:site_name': content.navBrand,
    'og:title': content.navBrand,
    'og:description': content.home.strapline,
    'og:url': pageUrl,
    'og:image': imageUrl,
    'og:image:type': 'image/png',
    'og:image:width': preview.width,
    'og:image:height': preview.height,
    'og:image:alt': content.navBrand
  };
  const twitter = {
    'twitter:card': 'summary_large_image',
    'twitter:title': content.navBrand,
    'twitter:description': content.home.strapline,
    'twitter:image': imageUrl,
    'twitter:image:alt': content.navBrand
  };
  const block = [start,
    ...Object.entries(properties).map(([key, value]) => `  <meta property="${key}" content="${escape(value)}">`),
    ...Object.entries(twitter).map(([key, value]) => `  <meta name="${key}" content="${escape(value)}">`),
    end].join(newline) + newline;
  const position = html.indexOf(start);
  if (position !== -1) {
    const finish = html.indexOf(end, position);
    if (finish === -1) throw new Error(`Incomplete metadata block in ${file}`);
    html = html.slice(0, position) + html.slice(finish + end.length + newline.length);
  }
  const marker = '  <script src="theme.js"></script>';
  if (!html.includes(marker)) throw new Error(`Missing head marker in ${file}`);
  fs.writeFileSync(filename, html.replace(marker, block + marker));
  console.log(`Generated sharing metadata: ${file}`);
}
