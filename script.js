const tabs = Array.from(document.querySelectorAll('[data-tab]'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

function activateTab(tabId) {
  const fallback = 'highlights';
  const targetId = panels.some((panel) => panel.id === tabId) ? tabId : fallback;

  panels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === targetId);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === targetId);
  });

  document.title = `Marios Koulakis · ${targetId.charAt(0).toUpperCase()}${targetId.slice(1)}`;
}

function syncFromHash() {
  const hash = window.location.hash.replace('#', '');
  activateTab(hash || 'highlights');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

window.addEventListener('hashchange', syncFromHash);
window.addEventListener('DOMContentLoaded', syncFromHash);
