// -------------------- NUEVO HEADER RESPONSIVE -------------------- //
const burger = document.getElementById("burguer-menu");
const mobileMenu = document.getElementById("menu-mobile");

// Abrir / cerrar menú móvil
burger.addEventListener("click", (e) => {
  e.stopPropagation();
  burger.classList.toggle("open");
  mobileMenu.classList.toggle("show");
});

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("show") &&
    !mobileMenu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    burger.classList.remove("open");
    mobileMenu.classList.remove("show");
  }
});

// Cerrar menú al hacer clic en un enlace
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    mobileMenu.classList.remove("show");
  });
});

// -------------------- SECCIÓN ACTIVA CON SCROLL -------------------- //
// Comentario: ahora detecta correctamente la última sección aunque sea pequeña
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Nuevo: marca la sección activa si está parcialmente visible
    if (
      scrollY + window.innerHeight / 2 >= sectionTop &&
      scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // Nuevo: asegurar que la última sección se active al llegar al final de la página
  if (scrollY + window.innerHeight >= document.body.scrollHeight) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// -------------------- OBSERVER PARA ANIMACIONES -------------------- //
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animación específica para skills
      if (entry.target.classList.contains('skills-section')) {
        animateSkills();
      }
    }
  });
}, observerOptions);

// Observar todas las secciones
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// -------------------- ANIMACIÓN DE BARRAS DE SKILLS -------------------- //
function animateSkills() {
  const skillProgresses = document.querySelectorAll('.skill-progress');
  
  skillProgresses.forEach(progress => {
    const width = progress.getAttribute('data-width');
    progress.style.setProperty('--target-width', width + '%');
  });
}

// -------------------- ANIMACIÓN SECCIÓN "SOBRE MÍ" -------------------- //
document.addEventListener('DOMContentLoaded', function() {
  const sobremiSection = document.querySelector('#sobremi');
  if (sobremiSection) {
    setTimeout(() => {
      sobremiSection.classList.add('visible');
    }, 100); 
  }
});

// -------------------- SCROLL DOWN HERO -------------------- //
document.getElementById("scroll-down").addEventListener("click", () => {
  const nextSection = document.querySelector("#skills");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
});
