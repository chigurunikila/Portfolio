// ========================================
// NIKILA PORTFOLIO — MAIN JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Custom Cursor ----
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .skill-category, .project-card, .cert-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    document.body.style.cursor = 'auto';
  }


  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });


  // ---- Mobile Menu ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    }
  });


  // ---- Active Nav Link ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }


  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---- Skill Bar Animation ----
  const skillFills = document.querySelectorAll('.sbi-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));


  // ---- Counter Animation ----
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => counterObserver.observe(num));


  // ---- Typing Effect for Hero ----
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.innerHTML;
    tagline.style.opacity = '0';
    setTimeout(() => {
      tagline.style.opacity = '1';
    }, 700);
  }


  // ---- Parallax Hero Shapes ----
  const shapes = document.querySelectorAll('.shape');
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    shapes.forEach((shape, i) => {
      const factor = (i + 1) * 8;
      shape.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });


  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-btn');
      const btnText = btn.querySelector('span');

      btn.style.opacity = '0.7';
      btn.disabled = true;
      btnText.textContent = 'Sending...';

      setTimeout(() => {
        btn.style.opacity = '1';
        btn.disabled = false;
        btnText.textContent = 'Send Message';
        formSuccess.style.display = 'block';
        contactForm.reset();

        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1800);
    });
  }


  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ---- Tilt Effect on Project Cards ----
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = (y - cy) / cy * -4;
      const rotateY = (x - cx) / cx * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ---- Scroll progress indicator ----
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, #d4a853, #a09af8);
    width: 0%; transition: width 0.1s;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });


  // ---- Page Load animation ----
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // Fallback if load already fired
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

});
