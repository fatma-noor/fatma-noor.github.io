(() => {
  'use strict';

  const main = document.getElementById('main');
  const nav = document.getElementById('navigation');
  let content;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function paragraph(parent, text, className) {
    parent.append(element('p', className, text));
  }

  function link(text, url, className) {
    const node = element('a', className, text);
    node.href = url;
    if (url.startsWith('https://')) node.rel = 'noopener noreferrer';
    return node;
  }

  function photo(data, className, sizes, eager = false) {
    const variants = data.variants;
    const largest = variants[variants.length - 1];
    const image = element('img', className);
    image.src = largest.src;
    image.srcset = variants.map(item => `${item.src} ${item.width}w`).join(', ');
    image.sizes = sizes;
    image.alt = data.alt;
    image.width = largest.width;
    image.height = largest.height;
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';
    if (eager) image.fetchPriority = 'high';
    return image;
  }

  function tags(values, className) {
    const group = element('div', className);
    values.forEach(value => group.append(element('span', 'tag', value)));
    return group;
  }

  function icon(name, className = '') {
    const node = element('span', `icon ${className}`);
    node.style.setProperty('--icon', `url("images/icons/${name}.svg")`);
    node.setAttribute('aria-hidden', 'true');
    return node;
  }

  function logo(src) {
    const frame = element('span', 'logo-frame');
    const image = element('img', 'organisation-logo');
    image.src = src;
    image.alt = '';
    image.width = 144;
    image.height = 88;
    image.decoding = 'async';
    frame.append(image);
    return frame;
  }

  function heading(key, level = 'h2') {
    const group = element('div', 'section-heading');
    const item = content.sectionHeadings[key];
    group.append(element('p', 'eyebrow', item.label), element(level, '', item.heading));
    return group;
  }

  function arrowLink(text, url, className = 'text-link') {
    const node = link(text, url, className);
    node.append(icon('arrow-right'));
    return node;
  }

  function story(item, nested = false, logoSrc) {
    const details = element('details', nested ? 'disclosure project-row' : 'disclosure');
    const summary = element('summary');
    const copy = element('div', 'summary-copy');
    copy.append(element(nested ? 'h3' : 'h2', 'summary-title', item.title));
    if (item.role || item.dates) copy.append(element('span', 'metadata', [item.role, item.dates].filter(Boolean).join(' | ')));
    if (item.summary) copy.append(element('span', 'so-what', item.summary));
    if (item.skills?.length) copy.append(tags(item.skills, 'skills'));
    if (logoSrc) summary.append(logo(logoSrc));
    summary.append(copy, icon('chevron-down', 'disclosure-chevron'));
    const body = element('div', 'detail-body');
    item.sections.forEach(section => {
      const block = element('section', 'story-section');
      block.append(element(nested ? 'h4' : 'h3', '', section.label));
      section.paragraphs.forEach(text => paragraph(block, text));
      body.append(block);
    });
    if (item.url) body.append(arrowLink(item.url.includes('github.com') ? content.links.github.label : item.title, item.url, 'item-link'));
    details.append(summary, body);
    return details;
  }

  function home(view) {
    const hero = element('section', 'hero');
    const copy = element('div', 'hero-copy');
    const title = element('h1', 'hero-title');
    const start = content.home.greeting.indexOf(content.navBrand);
    title.append(document.createTextNode(content.home.greeting.slice(0, start)), element('span', 'name-accent', content.navBrand), document.createTextNode(content.home.greeting.slice(start + content.navBrand.length)));
    const roles = element('p', 'home-roles');
    content.home.roles.forEach(role => roles.append(element('span', '', role)));
    copy.append(title, roles);
    paragraph(copy, content.home.strapline, 'hero-strapline');
    const actions = element('div', 'home-actions');
    actions.append(arrowLink(content.home.experienceLink, '#experience', 'button experience-link'), link(content.links.contact.label, '#contact', 'button button-secondary'));
    const socials = element('div', 'social-links');
    ['linkedin', 'github', 'email'].forEach(key => {
      const item = content.links[key];
      const node = link('', item.url, 'icon-button');
      node.title = item.label;
      node.setAttribute('aria-label', item.label);
      node.append(icon(key === 'email' ? 'mail' : key));
      socials.append(node);
    });
    copy.append(actions, socials);
    const portrait = element('div', 'portrait-wrap');
    portrait.append(photo(content.photos.headshot, 'portrait', '(max-width: 650px) 160px, (max-width: 750px) 240px, (max-width: 1200px) 290px, 350px', true));
    hero.append(copy, portrait);
    view.append(hero);

    const about = element('section', 'home-band about-band');
    const aboutCopy = element('div', 'about-copy');
    aboutCopy.append(heading('about'));
    content.home.about.paragraphs.forEach(text => paragraph(aboutCopy, text));
    const info = element('div', 'info-card');
    content.home.about.info.forEach((row, index) => {
      const item = element('div', 'info-row');
      const text = element('div');
      text.append(element('h3', '', row.label));
      paragraph(text, row.text);
      item.append(icon(['graduation-cap', 'briefcase-business', 'heart'][index], 'info-icon'), text);
      info.append(item);
    });
    about.append(aboutCopy, info);
    view.append(about);

    const tools = element('section', 'home-band tools-band');
    tools.append(heading('tools'));
    const grid = element('div', 'tool-grid');
    const toolIcons = ['tool-python', 'tool-r', 'database', 'tool-apachespark', 'tool-googlecloud', 'tool-tableau', 'tool-alteryx', 'tool-microsoftexcel', 'tool-git', 'tool-latex', 'tool-claude', 'tool-openai'];
    content.home.tools.items.forEach((name, index) => {
      const tile = element('div', `tool-tile tool-${index}`);
      tile.append(icon(toolIcons[index], 'tool-icon'), element('span', '', name));
      grid.append(tile);
    });
    tools.append(grid);
    view.append(tools);

    const skills = element('section', 'home-band skills-band');
    skills.append(heading('skills'));
    const groups = element('div', 'skill-groups');
    content.home.skills.groups.forEach(group => {
      const block = element('section', 'skill-group');
      block.append(element('h3', '', group.heading), tags(group.tags, 'skills'));
      groups.append(block);
    });
    skills.append(groups, arrowLink(content.home.experienceLink, '#experience', 'experience-link text-link'));
    view.append(skills);

    const featured = element('section', 'home-band featured-band');
    featured.append(heading('featured'));
    const cards = element('div', 'featured-grid');
    content.home.featured.items.forEach((item, index) => {
      const card = link('', `#projects/${index + 1}`, 'featured-card');
      const titleRow = element('div', 'featured-title');
      titleRow.append(icon(['brain', 'database', 'chart-no-axes-combined'][index], 'project-icon'), icon('arrow-up-right', 'project-arrow'));
      card.append(titleRow, element('h3', '', item.title));
      paragraph(card, item.summary);
      card.append(tags(item.tags, 'skills'));
      cards.append(card);
    });
    featured.append(cards, arrowLink(content.home.featured.allLink, '#projects'));
    view.append(featured);

    const contactBand = element('section', 'home-band contact-band');
    const contactCopy = element('div', 'contact-band-copy');
    contactCopy.append(heading('contact'));
    const contactLinks = element('div', 'contact-band-links');
    ['linkedin', 'github'].forEach(key => {
      const item = content.links[key];
      const node = link('', item.url, 'text-link');
      node.append(icon(key), document.createTextNode(item.label));
      contactLinks.append(node);
    });
    contactCopy.append(contactLinks);
    contactBand.append(contactCopy, arrowLink(content.links.message.label, content.links.message.url, 'button message-link'));
    view.append(contactBand);
  }

  function experience(view) {
    content.experience.items.forEach((item, index) => view.append(story(item, false, content.logos.experience[index])));
    const bcg = element('details', 'disclosure');
    const summary = element('summary');
    const copy = element('div', 'summary-copy');
    copy.append(element('h2', 'summary-title', content.experience.bcg.title));
    summary.append(logo(content.logos.experience[2]), copy, icon('chevron-down', 'disclosure-chevron'));
    const body = element('div', 'bcg-body');
    content.experience.bcg.levels.forEach(level => {
      const group = element('section', 'bcg-level');
      group.append(element('h2', '', level.heading));
      if (level.note) paragraph(group, level.note, 'level-note');
      level.projects.forEach(item => group.append(story(item, true)));
      body.append(group);
    });
    bcg.append(summary, body);
    view.append(bcg);
  }

  function education(view) {
    content.education.institutions.forEach((institution, index) => {
      const group = element('section', index === 0 ? 'education-lse' : 'education-group');
      const copy = element('div');
      const title = element('div', 'institution-title');
      title.append(logo(content.logos.education[index]), element('h2', 'education-heading', institution.heading));
      copy.append(title);
      institution.paragraphs.forEach(text => paragraph(copy, text));
      group.append(copy);
      if (index === 0) group.append(photo(content.photos.lse, 'lse-photo', '(max-width: 650px) 300px, (max-width: 1050px) 220px, 260px'));
      view.append(group);
    });
    const prizes = element('section', 'education-group prizes');
    prizes.append(element('h2', '', content.education.prizes.heading));
    const list = element('ul');
    content.education.prizes.items.forEach(text => list.append(element('li', '', text)));
    prizes.append(list);
    view.append(prizes);
  }

  function hobbies(view) {
    view.append(element('h2', '', content.hobbies.heading));
    paragraph(view, content.hobbies.intro);
    content.hobbies.initiatives.forEach(item => {
      const group = element('section', 'hobby-group');
      group.append(element('h3', '', item.heading));
      paragraph(group, item.text);
      view.append(group);
    });
    const interests = element('section', 'other-interests');
    interests.append(element('h2', '', content.hobbies.interestsHeading));
    content.hobbies.interests.forEach(text => {
      const line = element('p', 'interest');
      const [label, ...rest] = text.split(':');
      line.append(element('strong', '', `${label}:`), document.createTextNode(rest.join(':')));
      interests.append(line);
    });
    const gallery = element('div', 'photo-grid');
    content.photos.eatingOut.forEach(item => gallery.append(photo(item, 'food-photo', '(max-width: 650px) calc(100vw - 40px), (max-width: 1050px) 32vw, 389px')));
    interests.append(gallery);
    view.append(interests);
  }

  function contact(view) {
    const form = element('form', 'contact-form');
    form.id = 'contact-form';
    form.method = 'post';
    form.action = 'https://formspree.io/f/mwlvbroj';
    form.noValidate = true;
    const feedback = element('div', 'feedback');
    feedback.id = 'form-feedback';
    feedback.setAttribute('tabindex', '-1');
    feedback.setAttribute('role', 'status');
    feedback.hidden = true;
    form.append(feedback);
    const fields = [];
    content.contact.fields.forEach(config => {
      const group = element('div', 'field');
      const label = element('label', '', config.label);
      const input = element(config.type === 'textarea' ? 'textarea' : 'input');
      input.id = config.name;
      input.name = config.name;
      input.required = true;
      input.setAttribute('data-fs-field', '');
      if (config.type !== 'textarea') input.type = config.type;
      if (config.autocomplete) input.autocomplete = config.autocomplete;
      label.htmlFor = input.id;
      const error = element('p', 'field-error');
      error.id = `${config.name}-error`;
      error.hidden = true;
      input.setAttribute('aria-describedby', error.id);
      group.append(label, input, error);
      form.append(group);
      fields.push({ config, input, error });
    });
    const submit = element('button', 'button', content.contact.submit);
    submit.type = 'submit';
    submit.setAttribute('data-fs-submit-btn', '');
    const sending = element('span', 'sr-only');
    sending.setAttribute('role', 'status');
    form.append(submit, sending);
    view.append(form);

    function resetFeedback() {
      feedback.hidden = true;
      feedback.replaceChildren();
      fields.forEach(({ input, error }) => { input.removeAttribute('aria-invalid'); error.hidden = true; error.textContent = ''; });
    }

    function errors(invalid) {
      feedback.className = 'feedback error';
      feedback.setAttribute('role', 'alert');
      feedback.replaceChildren(element('p', '', content.accessibility.errorSummary));
      const links = element('ul', 'error-links');
      invalid.forEach(({ field, message }) => {
        field.input.setAttribute('aria-invalid', 'true');
        field.error.textContent = message;
        field.error.hidden = false;
        const li = element('li');
        li.append(link(field.config.label, `#${field.input.id}`));
        links.append(li);
      });
      feedback.append(links);
      feedback.hidden = false;
      feedback.focus();
    }

    function message(text, success) {
      feedback.className = `feedback ${success ? 'success' : 'error'}`;
      feedback.setAttribute('role', success ? 'status' : 'alert');
      feedback.textContent = text;
      feedback.hidden = false;
      feedback.focus();
    }

    // Register validation before the SDK handler so an invalid form never submits.
    form.addEventListener('submit', event => {
      resetFeedback();
      const invalid = fields.filter(({ input }) => !input.value.trim() || !input.validity.valid).map(field => ({ field, message: field.input.validity.typeMismatch ? content.contact.invalidEmail : content.contact.required }));
      if (invalid.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        errors(invalid);
      }
    });

    if (typeof window.formspree !== 'function') {
      form.addEventListener('submit', event => { event.preventDefault(); message(content.contact.error, false); });
      return;
    }
    window.formspree('initForm', {
      formElement: form,
      formId: 'mwlvbroj',
      useDefaultStyles: false,
      renderFieldErrors: (_context, error) => {
        if (!error) return;
        const invalid = fields.filter(field => error.getFieldErrors(field.config.name).length).map(field => ({ field, message: field.config.name === 'email' ? content.contact.invalidEmail : content.contact.required }));
        if (invalid.length) errors(invalid);
      },
      renderSuccess: (_context, state) => { if (state !== null) message(content.contact.success, true); },
      renderFormError: (_context, state) => { if (state !== null) message(content.contact.error, false); },
      onSuccess: () => form.reset(),
      onSubmit: () => { sending.textContent = content.accessibility.sending; },
      enable: () => { submit.disabled = false; form.removeAttribute('aria-busy'); sending.textContent = ''; },
      disable: () => { submit.disabled = true; form.setAttribute('aria-busy', 'true'); }
    });
  }

  function activate(focus = false) {
    const [id, projectIndex] = location.hash.slice(1).split('/');
    const valid = content.navigation.some(item => item.id === id);
    // Form error links target fields; they must not navigate away from Contact.
    if (!valid && content.contact.fields.some(field => field.name === id)) {
      document.getElementById(id)?.focus();
      return;
    }
    const active = valid ? id : 'home';
    document.querySelectorAll('.view').forEach(view => { view.hidden = view.id !== `view-${active}`; });
    nav.querySelectorAll('a').forEach(tab => {
      if (tab.hash === `#${active}`) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
    if (focus) { main.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
    if (active === 'projects' && /^[1-3]$/.test(projectIndex || '')) {
      const project = document.getElementById(`project-${projectIndex}`);
      project.open = true;
      requestAnimationFrame(() => {
        project.querySelector('summary').focus({ preventScroll: true });
        project.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    }
  }

  async function boot() {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    content = await response.json();
    document.title = content.name;
    document.querySelector('meta[name="description"]').content = content.home.about.paragraphs[0];
    document.querySelector('.skip-link').textContent = content.accessibility.skip;
    document.querySelector('.skip-link').addEventListener('click', event => {
      event.preventDefault();
      main.focus();
    });
    document.querySelector('.brand').textContent = content.navBrand;
    const toggle = document.getElementById('theme-toggle');
    function themeButton() {
      const dark = document.documentElement.dataset.theme === 'dark';
      toggle.replaceChildren(icon(dark ? 'sun' : 'moon'));
      toggle.setAttribute('aria-label', dark ? content.accessibility.lightMode : content.accessibility.darkMode);
      toggle.title = toggle.getAttribute('aria-label');
    }
    themeButton();
    toggle.addEventListener('click', window.togglePortfolioTheme);
    window.addEventListener('portfolio-theme-change', themeButton);
    nav.setAttribute('aria-label', content.accessibility.navigation);
    content.navigation.forEach(item => {
      nav.append(link(item.label, `#${item.id}`, 'tab'));
      const view = element('section', 'view');
      view.id = `view-${item.id}`;
      view.hidden = true;
      if (item.id !== 'home') view.append(heading(item.id, 'h1'));
      if (item.id === 'home') home(view);
      if (item.id === 'experience') experience(view);
      if (item.id === 'projects') {
        paragraph(view, content.projects.intro, 'intro');
        content.projects.items.forEach((project, index) => {
          const card = story(project);
          card.id = `project-${index + 1}`;
          view.append(card);
        });
      }
      if (item.id === 'leadership') content.leadership.forEach(entry => view.append(story(entry)));
      if (item.id === 'education') education(view);
      if (item.id === 'hobbies') hobbies(view);
      if (item.id === 'contact') contact(view);
      main.append(view);
    });
    const legacy = location.pathname.split('/').pop()?.replace('.html', '');
    if (!location.hash && ['experience', 'projects', 'contact'].includes(legacy)) history.replaceState(null, '', `#${legacy}`);
    activate();
    window.addEventListener('hashchange', () => activate(true));
  }

  boot().catch(error => {
    console.error(error);
    if (content) paragraph(main, content.accessibility.loadError);
  });
})();
