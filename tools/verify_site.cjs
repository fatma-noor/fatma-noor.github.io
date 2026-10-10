const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const http = require('node:http');
const { chromium } = require(process.argv[2] || 'playwright');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '.qa');
fs.mkdirSync(output, { recursive: true });
const content = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));
const snapshot = path.join(output, 'content-before-home-refresh.json');
if (fs.existsSync(snapshot)) {
  const before = JSON.parse(fs.readFileSync(snapshot, 'utf8'));
  ['navigation', 'experience', 'projects', 'leadership', 'education', 'hobbies', 'contact', 'photos'].forEach(key => assert.deepEqual(content[key], before[key], `Unexpected non-Home content change: ${key}`));
  if (before.home.about) assert.equal(content.home.about.paragraphs[1], before.home.about.paragraphs[1], 'Keep second About paragraph unchanged');
}
assert.deepEqual(content.navigation.map(item => item.label), ['Home', 'Experience', 'Projects', 'Leadership & Extracurricular', 'Education', 'Hobbies & Interests', 'Contact']);
assert(!JSON.stringify(content).includes('\u2014'), 'Em dash in content');
const normalize = text => text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const brief = normalize(fs.readFileSync(path.join(root, 'website_content_brief.md'), 'utf8'));
const rawBrief = fs.readFileSync(path.join(root, 'website_content_brief.md'), 'utf8');
const contrastResults = {};
function luminance(hex) {
  let value=hex.trim().slice(1);
  if(value.length===3) value=value.split('').map(channel=>channel+channel).join('');
  const channels = value.match(/.{2}/g).map(value => parseInt(value,16)/255).map(value=>value<=.04045 ? value/12.92 : ((value+.055)/1.055)**2.4);
  return channels[0]*.2126 + channels[1]*.7152 + channels[2]*.0722;
}
function contrast(first,second) {
  const values=[luminance(first),luminance(second)].sort((a,b)=>b-a);
  return (values[0]+.05)/(values[1]+.05);
}
let checkedCopy = 0;
function verifyCopy(value) {
  if (typeof value === 'string') {
    if (value.startsWith('https://')) return;
    assert(brief.includes(normalize(value)), `Text does not match brief: ${value}`);
    checkedCopy++;
  } else if (Array.isArray(value)) value.forEach(verifyCopy);
  else Object.values(value).forEach(verifyCopy);
}
['home', 'experience', 'projects', 'leadership', 'education', 'hobbies'].forEach(key => verifyCopy(content[key]));
content.home.about.paragraphs.forEach(text => assert(rawBrief.includes(text), 'About paragraph must match brief word for word'));
const allContent = normalize(JSON.stringify(content));
const narrativeSections = [...rawBrief.matchAll(/\*\*(?:Problem|What I did|Result|Overview|Approach|Outcome)\*\*\n([^\n]+)/g)];
assert.equal(narrativeSections.length,60);
narrativeSections.forEach(match => assert(allContent.includes(normalize(match[1])), `Missing narrative: ${match[1]}`));
assert.deepEqual(content.experience.bcg.levels.map(level => level.projects.length), [3, 2, 4, 3]);
assert.equal(content.projects.items.length, 3);
assert.equal(content.leadership.length, 3);
assert.equal(content.education.prizes.items.length, 5);

(async () => {
  const server = http.createServer((request, response) => {
    const relative = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).replace(/^\//, '') || 'index.html';
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
    const types = {'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
    response.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(response);
  });
  await new Promise(resolve => server.listen(8089,'127.0.0.1',resolve));
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme:'light' });
  const errors = [];
  const localFailures = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400) localFailures.push(response.url()); });
  try {
    await page.goto('http://127.0.0.1:8089');
    await page.locator('#view-home h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.title(), content.name);
    await page.screenshot({ path: path.join(output, 'home-desktop.png'), fullPage: true });
    assert.deepEqual(await page.locator('.hero-copy > *').evaluateAll(nodes => nodes.map(node => node.className)), ['hero-title','hero-intro','hero-strapline','roles-heading','home-roles','home-actions','social-links'], 'Hero content order');
    assert.equal(await page.locator('.hero-intro').textContent(), content.home.intro);
    assert.equal(await page.locator('.roles-heading').textContent(), content.home.rolesHeading);
    assert.deepEqual(await page.locator('.home-roles span').allTextContents(), content.home.roles);
    assert.deepEqual(await page.locator('.about-copy > p').allTextContents(), content.home.about.paragraphs);
    assert.equal(await page.locator('.hero-title').textContent(), content.home.greeting);
    assert.equal(await page.locator('.brand').textContent(), 'Fatma Noor');
    assert.equal(await page.locator('.tool-tile').count(), 12);
    assert.equal(await page.locator('.home-band').count(), 5);
    assert.equal(content.links.message.label, 'Send me a message');
    assert.equal(content.links.message.url, '#contact');
    assert.equal(await page.locator('.contact-band h2').textContent(), content.sectionHeadings.contact.heading);

    for (const theme of ['light','dark']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#theme-toggle').click();
      const tokens=await page.evaluate(()=>{
        const style=getComputedStyle(document.documentElement);
        return Object.fromEntries(['background','surface','text','secondary','accent','accent-hover','accent-soft','muted','muted-text','band','error','success','name-end','role-background','role-text'].map(key=>[key,style.getPropertyValue(`--${key}`).trim()]));
      });
      contrastResults[theme]=[];
      for(const foreground of ['text','secondary','accent','accent-hover','error','success']) {
        for(const background of ['background','surface','band','accent-soft']) {
          const ratio=contrast(tokens[foreground],tokens[background]);
          assert(ratio>=4.5,`${theme} contrast: ${foreground}/${background} ${ratio}`);
          contrastResults[theme].push(Number(ratio.toFixed(2)));
        }
      }
      assert(contrast(tokens['muted-text'],tokens.muted)>=4.5,`${theme} skill-tag contrast`);
      assert(contrast(tokens['role-text'],tokens['role-background'])>=4.5,`${theme} role-pill contrast`);
      const pillStyles = await page.locator('.home-roles span').evaluateAll(nodes => nodes.map(node => {
        const style = getComputedStyle(node);
        return [style.color, style.backgroundColor, style.backgroundImage, style.borderLeftWidth, style.borderRadius];
      }));
      pillStyles.forEach(style => assert.deepEqual(style, ['rgb(255, 255, 255)','rgb(112, 71, 217)','none','0px','999px'], `${theme} solid role pills without dividers`));
      for(const stop of ['accent','name-end']) assert(contrast(tokens[stop],tokens.background)>=3,`${theme} name gradient contrast`);
      assert(contrast(theme==='dark'?'#171120':'#ffffff',tokens.accent)>=4.5,`${theme} primary button contrast`);
      for (const tab of content.navigation) {
        await page.locator(`#navigation a[href="#${tab.id}"]`).click();
        await page.locator(`#view-${tab.id}`).waitFor({state:'visible'});
        assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
        assert.equal(await page.locator(`#view-${tab.id}`).isVisible(),true);
      }
      await page.locator('#navigation a[href="#home"]').click();
      await page.locator('#view-home').waitFor({state:'visible'});
      await page.screenshot({path:path.join(output,`home-${theme}.png`),fullPage:true});
      const aboutBottom = await page.locator('.about-band').evaluate(node => Math.ceil(node.getBoundingClientRect().bottom + window.scrollY));
      await page.screenshot({path:path.join(output,`home-hero-about-${theme}.png`),fullPage:true,clip:{x:0,y:0,width:1440,height:aboutBottom}});
      await page.locator('.contact-band').screenshot({path:path.join(output,`home-contact-${theme}.png`)});
      for (const key of ['linkedin','github']) assert.equal(await page.locator(`.contact-band-links a[href="${content.links[key].url}"]`).textContent(),content.links[key].label);
      await page.locator('.contact-band .message-link').click();
      await page.locator('#view-contact').waitFor({state:'visible'});
      assert.equal(await page.locator('#navigation a[aria-current="page"]').textContent(), 'Contact');
      assert.equal(await page.locator('#name').isVisible(), true);
      assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
      await page.locator('#navigation a[href="#experience"]').click();
      await page.locator('#view-experience').waitFor({state:'visible'});
      await page.locator('#view-experience > details').first().locator('summary').click();
      await page.screenshot({path:path.join(output,`experience-${theme}.png`),fullPage:true,animations:'disabled'});
      await page.locator('#view-experience > details').first().locator('summary').click();
      await page.reload();
      await page.locator('#view-experience').waitFor({state:'visible'});
      assert.equal(await page.locator('html').getAttribute('data-theme'),theme,'Remember visitor preference');
    }
    for (const system of ['light','dark']) {
      const fresh = await browser.newContext({colorScheme:system});
      const firstVisit = await fresh.newPage();
      await firstVisit.goto('http://127.0.0.1:8089');
      await firstVisit.locator('.hero-title').waitFor();
      assert.equal(await firstVisit.locator('html').getAttribute('data-theme'),system,'Follow system on first visit');
      const other = system === 'dark' ? 'light' : 'dark';
      await firstVisit.emulateMedia({colorScheme:other});
      await firstVisit.waitForFunction(theme=>document.documentElement.dataset.theme===theme,other);
      assert.equal(await firstVisit.locator('html').getAttribute('data-theme'),other,'Follow system until an explicit choice');
      await fresh.close();
    }
    await page.locator('#theme-toggle').click();
    for (let index=1;index<=3;index++) {
      await page.locator('#navigation a[href="#home"]').click();
      await page.locator(`.featured-card[href="#projects/${index}"]`).click();
      await page.locator(`#project-${index}[open]`).waitFor();
      assert.equal(await page.locator(`#project-${index} .summary-title`).textContent(),content.home.featured.items[index-1].title);
      await page.locator(`#project-${index} > summary`).click();
    }

    for (const viewport of [{width:1440,height:1000},{width:1024,height:900},{width:768,height:1024},{width:375,height:812},{width:812,height:375}]) {
      await page.setViewportSize(viewport);
      for (const tab of content.navigation) {
        await page.locator(`#navigation a[href="#${tab.id}"]`).click();
        await page.locator(`#view-${tab.id}`).waitFor({state:'visible'});
        assert.equal(await page.locator('#navigation a[aria-current="page"]').textContent(), tab.label);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        assert(!overflow, `Horizontal overflow: ${tab.id} at ${viewport.width}`);
        const disclosures = page.locator(`#view-${tab.id} details`);
        for (let i = 0; i < await disclosures.count(); i++) {
          const disclosure = disclosures.nth(i);
          if (!await disclosure.locator('summary').first().isVisible()) continue;
          await disclosure.locator('summary').first().click();
          assert(await disclosure.evaluate(node => node.open));
          assert(!await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth));
          await disclosure.locator('summary').first().click();
          assert(!await disclosure.evaluate(node => node.open));
        }
        if (viewport.width === 375 || viewport.width === 1440) await page.screenshot({path:path.join(output, `${tab.id}-${viewport.width}.png`), fullPage:true});
      }
      await page.locator('#theme-toggle').click();
      for (const tab of content.navigation) {
        await page.locator(`#navigation a[href="#${tab.id}"]`).click();
        await page.locator(`#view-${tab.id}`).waitFor({state:'visible'});
        assert(!await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth),`Dark-theme overflow: ${tab.id} at ${viewport.width}`);
        if (viewport.width===375 && ['home','experience','education'].includes(tab.id)) await page.screenshot({path:path.join(output,`${tab.id}-dark-mobile.png`),fullPage:true});
      }
      await page.locator('#theme-toggle').click();
    }

    await page.setViewportSize({width:1440,height:1000});
    await page.locator('#navigation a[href="#experience"]').click();
    await page.locator('#view-experience').waitFor({state:'visible'});
    await page.locator('.skip-link').focus();
    await page.keyboard.press('Enter');
    assert(await page.locator('#view-experience').isVisible());
    assert(await page.locator('#main').evaluate(node => document.activeElement === node));
    const bcg = page.locator('#view-experience > details').last();
    await bcg.locator('summary').first().click();
    for (const disclosure of await bcg.locator('.project-row').all()) {
      await disclosure.locator('summary').click();
      assert(await disclosure.locator('.skills').isVisible());
      assert(await disclosure.locator('.story-section').first().isVisible());
      await disclosure.locator('summary').click();
      assert(await disclosure.locator('.skills').isVisible());
    }
    await bcg.locator('.project-row').first().locator('summary').click();
    await page.screenshot({path:path.join(output,'experience-expanded.png'),fullPage:true});
    for (const tab of content.navigation) {
      await page.locator(`#navigation a[href="#${tab.id}"]`).click();
      for (const image of await page.locator(`#view-${tab.id} img`).all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(node => node.decode());
        assert(await image.evaluate(node => node.naturalWidth > 0));
      }
    }

    await page.locator('#navigation a[href="#home"]').click();
    await page.locator('.experience-link').first().click();
    await page.locator('#view-experience').waitFor({state:'visible'});
    assert(await page.locator('#view-experience').isVisible());
    await page.goBack();
    await page.locator('#view-home').waitFor({state:'visible'});
    assert(await page.locator('#view-home').isVisible());
    await page.locator('.home-actions a[href="#contact"]').click();
    await page.locator('#view-contact').waitFor({state:'visible'});
    await page.getByRole('button', {name:content.contact.submit,exact:true}).click();
    assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
    assert.equal(await page.locator('#form-feedback').evaluate(node => document.activeElement === node), true);
    await page.locator('#form-feedback a[href="#email"]').click();
    assert.equal(await page.locator('#email').evaluate(node => document.activeElement === node), true);

    let requestCount = 0;
    let responseKind = 'success';
    let releaseSubmission;
    await page.route('https://formspree.io/f/mwlvbroj', async route => {
      requestCount++;
      assert.equal(route.request().method(), 'POST');
      const body = route.request().postData() || '';
      ['name', 'email', 'message'].forEach(field => assert(body.includes(`name="${field}"`)));
      if (responseKind === 'pending') await new Promise(resolve => { releaseSubmission = resolve; });
      if (responseKind === 'network') return route.abort('failed');
      if (responseKind === 'validation') return route.fulfill({status:422,contentType:'application/json',body:JSON.stringify({errors:[{field:'email',code:'TYPE_EMAIL',message:'Invalid email'}]})});
      if (responseKind === 'error') return route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({errors:[{code:'UNSPECIFIED',message:'Unavailable'}]})});
      return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({next:'https://formspree.io/thanks'})});
    });
    const fillForm = async () => {
      await page.locator('#name').fill('Preview check');
      await page.locator('#email').fill('preview@example.com');
      await page.locator('#message').fill('Local simulated form check.');
    };
    await fillForm();
    const initialUrl = page.url();
    responseKind = 'pending';
    await page.getByRole('button',{name:'Send',exact:true}).click();
    await page.locator('form[aria-busy="true"]').waitFor();
    assert(await page.getByRole('button',{name:'Send',exact:true}).isDisabled());
    while (!releaseSubmission) await page.waitForTimeout(20);
    responseKind = 'success';
    releaseSubmission();
    await page.getByText(content.contact.success,{exact:true}).waitFor();
    assert.equal(page.url(),initialUrl);
    assert.equal(await page.locator('#name').inputValue(),'');
    await page.screenshot({path:path.join(output,'contact-success.png'),fullPage:true});
    for (const failure of ['error','validation','network']) {
      responseKind = failure;
      await fillForm();
      await page.getByRole('button',{name:'Send',exact:true}).click();
      await page.locator('form:not([aria-busy])').waitFor();
      assert(await page.locator('#form-feedback').isVisible());
      assert.equal(await page.locator('#message').inputValue(),'Local simulated form check.');
      assert.equal(page.url(),initialUrl);
      if (failure === 'validation') assert.equal(await page.locator('#email').getAttribute('aria-invalid'),'true');
      else assert.equal(await page.locator('#form-feedback').textContent(),content.contact.error);
    }
    await page.screenshot({path:path.join(output,'contact-error.png'),fullPage:true});
    assert.equal(requestCount,4);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.locator('#navigation a[href="#experience"]').click();
    await page.locator('#view-experience').waitFor({state:'visible'});
    assert.equal(await page.locator('.disclosure-chevron').first().evaluate(node => getComputedStyle(node).transitionDuration),'0s');
    await page.locator('#view-experience > details').first().locator('summary').focus();
    await page.keyboard.press('Enter');
    await page.locator('#view-experience > details[open]').first().waitFor();
    assert(await page.locator('#view-experience > details').first().evaluate(node=>node.open));
    await page.keyboard.press('Enter');
    await page.locator('#view-experience > details').first().evaluate(node => new Promise(resolve => {
      if (!node.open) resolve(); else node.addEventListener('toggle',resolve,{once:true});
    }));
    assert(!await page.locator('#view-experience > details').first().evaluate(node=>node.open));
    await page.setViewportSize({width:375,height:812});
    await page.evaluate(() => document.documentElement.style.fontSize='200%');
    for (const tab of content.navigation) {
      await page.locator(`#navigation a[href="#${tab.id}"]`).click();
      await page.locator(`#view-${tab.id}`).waitFor({state:'visible'});
      assert(!await page.evaluate(() => document.documentElement.scrollWidth>document.documentElement.clientWidth),`Text-size overflow: ${tab.id}`);
    }
    await page.screenshot({path:path.join(output,'contact-large-text.png'),fullPage:true});
    await page.evaluate(() => document.documentElement.style.fontSize='');
    for (const legacy of ['experience','projects','contact']) {
      await page.goto(`http://127.0.0.1:8089/${legacy}.html`);
      await page.locator(`#view-${legacy}`).waitFor({state:'visible'});
    }
    assert.deepEqual(errors,[]);
    assert.deepEqual(localFailures,[]);
    const results={checkedCopy,viewports:5,themes:2,tabs:7,bcgProjects:12,simulatedFormRequests:requestCount,pageErrors:errors,missingAssets:localFailures,contrastResults};
    fs.writeFileSync(path.join(output,'checks.json'),JSON.stringify(results,null,2));
    console.log(JSON.stringify(results));
  } finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
})().catch(error=>{console.error(error);process.exitCode=1;});
