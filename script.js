const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
const sections = Array.from(document.querySelectorAll('main .section'));

const socialProfiles = {
  scholar: {
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=2k0YV9cAAAAJ&hl=en',
    icon: () => `
      <svg class="social-icon scholar-mark" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="15.7" r="5.4" />
        <path d="M2.6 8.2 12 3.3l9.4 4.9-9.4 4.9-9.4-4.9Z" />
        <path d="M18.8 9.7v4.7" />
        <circle cx="18.8" cy="16.2" r="1" />
      </svg>
    `
  },
  researchgate: {
    label: 'ResearchGate',
    url: 'https://www.researchgate.net/profile/Marios-Koulakis?ev=hdr_xprf',
    icon: () => `
      <svg class="social-icon researchgate-mark" viewBox="0 0 24 24" aria-hidden="true">
        <text x="11.2" y="17.8" text-anchor="middle">RG</text>
      </svg>
    `
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/marioskoulakis',
    icon: (id) => `
      <svg class="social-icon linkedin-mark" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <mask id="linkedin-cutout-${id}">
            <rect width="24" height="24" fill="white" />
            <path fill="black" d="M5.5 9.8h2.7v8.1H5.5V9.8Zm1.4-4a1.5 1.5 0 1 1 0 3.1 1.5 1.5 0 0 1 0-3.1Zm3.5 4H13v1.1h.1c.4-.7 1.2-1.3 2.5-1.3 2.7 0 3.2 1.8 3.2 4.1v4.2h-2.7v-3.8c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-3.1V9.8Z" />
          </mask>
        </defs>
        <rect x="2.2" y="3" width="19.8" height="18" rx="3.2" mask="url(#linkedin-cutout-${id})" />
      </svg>
    `
  },
  github: {
    label: 'GitHub',
    url: 'https://github.com/koulakis',
    icon: () => `
      <svg class="social-icon github-mark" viewBox="0 0 98 96" aria-hidden="true">
        <path d="M48.9 0C21.9 0 0 21.8 0 48.7c0 21.6 14.1 39.9 33.6 46.4 2.5.5 3.4-1.1 3.4-2.4 0-1.2 0-4.2-.1-8.3-13.7 3-16.5-6.6-16.5-6.6-2.2-5.7-5.5-7.2-5.5-7.2-4.5-3 .3-3 .3-3 4.9.3 7.5 5 7.5 5 4.4 7.5 11.5 5.3 14.3 4.1.4-3.2 1.7-5.3 3.1-6.6-10.9-1.2-22.3-5.4-22.3-24.2 0-5.4 1.9-9.7 5-13.1-.5-1.2-2.2-6.2.5-13 0 0 4.1-1.3 13.5 5 3.9-1.1 8.1-1.6 12.3-1.7 4.2 0 8.4.6 12.3 1.7 9.4-6.3 13.5-5 13.5-5 2.7 6.8 1 11.8.5 13 3.1 3.4 5 7.8 5 13.1 0 18.8-11.5 23-22.4 24.2 1.8 1.5 3.3 4.5 3.3 9.1 0 6.6-.1 11.9-.1 13.5 0 1.3.9 2.8 3.4 2.4C84 88.6 98 70.3 98 48.7 98 21.8 76.1 0 48.9 0Z" />
      </svg>
    `
  },
  cv: {
    label: 'Curriculum Vitae (PDF)',
    url: 'assets/Marios_Koulakis_CV.pdf',
    className: 'cv-link',
    icon: () => `
      <svg class="social-icon cv-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path class="cv-page" d="M6.2 2.8h7.7l3.9 3.9v14.5H6.2V2.8Z" />
        <path class="cv-fold" d="M13.9 2.8v3.9h3.9" />
        <text x="12" y="12.7" text-anchor="middle">CV</text>
        <path class="cv-lines" d="M9 15.4h6M9 17.8h4.7" />
      </svg>
    `
  }
};

function renderSocialLinks() {
  document.querySelectorAll('[data-social-links]').forEach((container, containerIndex) => {
    const requestedProfiles = container.dataset.socialLinks
      .split(/[,\s]+/)
      .filter(Boolean);
    const rowBreakAfter = container.dataset.rowBreakAfter;
    const fragment = document.createDocumentFragment();

    requestedProfiles.forEach((profileKey) => {
      const profile = socialProfiles[profileKey];
      if (!profile) return;

      const iconId = `${profileKey}-${containerIndex}`;
      const link = document.createElement('a');
      link.href = profile.url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.setAttribute('aria-label', profile.label);
      link.title = profile.label;
      if (profile.className) link.classList.add(profile.className);
      link.innerHTML = profile.icon(iconId);

      fragment.append(link);

      if (rowBreakAfter === profileKey) {
        const rowBreak = document.createElement('span');
        rowBreak.className = 'social-row-break';
        rowBreak.setAttribute('aria-hidden', 'true');
        fragment.append(rowBreak);
      }
    });

    container.replaceChildren(fragment);
  });
}

function closeMenu() {
  if (!mainNav || !navToggle) return;
  mainNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

renderSocialLinks();

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    const activeId = visibleSection.target.id;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  },
  {
    rootMargin: '-35% 0px -50% 0px',
    threshold: [0.1, 0.25, 0.4, 0.6]
  }
);

sections.forEach((section) => observer.observe(section));
