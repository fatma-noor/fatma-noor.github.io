(() => {
  'use strict';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem('portfolio-theme'); } catch {}
  const apply = theme => {
    document.documentElement.dataset.theme = theme;
    window.dispatchEvent(new Event('portfolio-theme-change'));
  };
  apply(choice === 'dark' || choice === 'light' ? choice : system.matches ? 'dark' : 'light');
  system.addEventListener('change', event => {
    if (!choice) apply(event.matches ? 'dark' : 'light');
  });
  window.togglePortfolioTheme = () => {
    choice = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', choice); } catch {}
    apply(choice);
  };
})();
