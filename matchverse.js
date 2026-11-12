const burger = document.getElementById('burguer-menu');
const mobileMenu = document.getElementById('menu-mobile');

function toggleMobileMenu() {
  const isOpen = burger.classList.toggle('open');
  mobileMenu.classList.toggle('show', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
}

burger.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});
burger.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleMobileMenu();
  }
});
document.addEventListener('click', (event) => {
  if (mobileMenu.classList.contains('show') &&
      !mobileMenu.contains(event.target) &&
      !burger.contains(event.target)) {
    toggleMobileMenu();
  }
});
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('mv-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.mv-reveal').forEach((section) => revealObserver.observe(section));

const lightbox = document.getElementById('mvLightbox');
const lightboxImage = document.getElementById('mvLightboxImage');
const lightboxTitle = document.getElementById('mvLightboxTitle');
const shots = [...document.querySelectorAll('.mv-shot')];

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

shots.forEach((shot) => {
  shot.addEventListener('click', () => {
    lightboxImage.src = shot.dataset.image;
    lightboxImage.alt = shot.querySelector('img').alt;
    lightboxTitle.textContent = shot.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('.mv-lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
