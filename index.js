
const burguerMenu = document.getElementById('burguer-menu');
const menu = document.getElementById('menu');
const header = document.getElementById('header');
const body = document.body;

let scrollTimer;


function toggleMenu() {
    menu.classList.toggle('open');
    burguerMenu.classList.toggle('open');
    body.classList.toggle('menu-open'); 
}


function closeMenu() {
    menu.classList.remove('open');
    burguerMenu.classList.remove('open');
    body.classList.remove('menu-open');
}


burguerMenu.addEventListener('click', function (e) {
    e.stopPropagation(); 
    toggleMenu();
});

// Cerrar menú al hacer clic en enlaces del menú
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeMenu();
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(e) {
    if (menu.classList.contains('open') && 
        !menu.contains(e.target) && 
        !burguerMenu.contains(e.target)) {
        closeMenu();
    }
});

// Control del scroll del header
window.addEventListener('scroll', function() {
    // Solo aplicar efecto scroll si el menú está CERRADO
    if (!menu.classList.contains('open')) {
        header.classList.add('scrolled');
        
        clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(function() {
            header.classList.remove('scrolled');
        }, 100);
    }
});



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

// Función para animar las barras de skills
function animateSkills() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillProgresses.forEach(progress => {
        const width = progress.getAttribute('data-width');
        progress.style.setProperty('--target-width', width + '%');
    });
}

// Activar animación de la sección sobremi inmediatamente al cargar
document.addEventListener('DOMContentLoaded', function() {
    const sobremiSection = document.querySelector('#sobremi');
    if (sobremiSection) {
        setTimeout(() => {
            sobremiSection.classList.add('visible');
        }, 100); 
    }
});