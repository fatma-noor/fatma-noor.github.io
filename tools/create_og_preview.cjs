const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.argv[2] || 'playwright');
const root = path.resolve(__dirname, '..');
const content = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));
const { width, height, image } = content.socialPreview;

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme: 'light', deviceScaleFactor: 1 });
    await page.goto(process.argv[3] || 'http://127.0.0.1:8088/#home');
    await page.locator('.hero-title').waitFor();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await document.querySelector('.portrait').decode();
    });
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    // Frame the real hero for sharing, omitting browser navigation and interactive controls.
    await page.addStyleTag({ content: `
      .site-header, .skip-link, .home-band, .home-actions, .social-links { display: none !important; }
      main { max-width: none; padding: 0; }
      #view-home { margin: 0; }
      .hero { width: ${width}px; height: ${height}px; min-height: ${height}px; padding: 64px;
        grid-template-columns: minmax(0, 1fr) 320px; gap: 48px; }
      .hero-title { font-size: 48px; }
      .portrait-wrap { width: 320px; margin: 0; }
      .hero-intro, .hero-strapline { font-size: 18px; }
      .roles-heading { font-size: 15px; }
      .home-roles { font-size: 14px; margin-bottom: 0; }
    ` });
    const bounds = await page.locator('.hero').boundingBox();
    assert.equal(bounds.width, width);
    assert.equal(bounds.height, height);
    assert.deepEqual(await page.locator('.home-roles span').allTextContents(), content.home.roles);
    const overflowing = await page.locator('.hero-copy > *, .home-roles span, .portrait').evaluateAll(nodes => nodes.some(node => {
      const bounds = node.getBoundingClientRect();
      return bounds.left < 0 || bounds.top < 0 || bounds.right > innerWidth || bounds.bottom > innerHeight;
    }));
    assert(!overflowing, 'Preview content must fit the image');
    await page.locator('.hero').screenshot({ path: path.join(root, image), animations: 'disabled' });
    console.log(`Saved ${image}: ${width}x${height}`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
