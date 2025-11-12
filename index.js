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
  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    // Obtener la posición del elemento y hacer scroll con offset
    const elementPosition = skillsSection.getBoundingClientRect().top + window.scrollY;
    const offset = 80; // Dejar 80px de espacio desde la parte superior
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth"
    });
  }
});

// -------------------- FORMULARIO CON EMAILJS -------------------- //
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const mensajeRespuesta = document.getElementById('mensajeRespuesta');


  emailjs.init('yLODmq0a_1-Bt7897'); 

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Obtener valores del formulario
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Validación básica
      if (!nombre || !email || !mensaje) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensaje('Por favor ingresa un correo válido', 'error');
        return;
      }

      // Deshabilitar botón
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';

      try {
        // Preparar datos para EmailJS
        const templateParams = {
          from_name: nombre,
          from_email: email,
          message: mensaje,
          reply_to: email
        };

        // Enviar email usando EmailJS
       
        const response = await emailjs.send(
          'service_d0p977w',     
          'template_fj9akp7',    
          templateParams
        );

        console.log('Email enviado:', response);
        
        if (response.status === 200) {
          mostrarMensaje('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
          form.reset();
        } else {
          throw new Error('Error en el envío');
        }

      } catch (error) {
        console.error('Error EmailJS:', error);
        mostrarMensaje('Error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
      } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar<i class="fas fa-paper-plane"></i>';
      }
    });
  }

  function mostrarMensaje(texto, tipo) {
    if (mensajeRespuesta) {
      mensajeRespuesta.textContent = texto;
      mensajeRespuesta.className = 'mensaje-respuesta ' + tipo;
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        mensajeRespuesta.classList.remove('success', 'error');
        mensajeRespuesta.textContent = '';
      }, 5000);
    }
  }
});