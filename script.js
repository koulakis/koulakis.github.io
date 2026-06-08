const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
const sections = Array.from(document.querySelectorAll('main .section'));
const rotatingText = document.getElementById('rotating-text');

const rotatingPhrases = [
  'Geometry for machine learning',
  'Manifold learning and data geometry',
  'Representation learning and structure',
  'Computer vision and reliable AI',
  'Research, tools, and teaching'
];

let rotatingIndex = 0;

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

if (rotatingText) {
  setInterval(() => {
    rotatingIndex = (rotatingIndex + 1) % rotatingPhrases.length;
    rotatingText.textContent = rotatingPhrases[rotatingIndex];
  }, 2800);
}
