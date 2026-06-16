/* ============================================================
   ReciTunja — main.js
   Design System "Ecological Circularity" by Stitch
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Header: opacidad en scroll ─────────────────────── */
  const header = document.getElementById('main-header') || document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // estado inicial
  }

  /* ── 2. Navbar V2: hamburger toggle ─────────────────────── */
  const burger  = document.getElementById('navbar-burger');
  const navMenu = document.getElementById('nav-links-v2');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu when a link is clicked
    navMenu.querySelectorAll('.navbar-v2__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 3. Scroll Reveal con IntersectionObserver ─────────── */
  const revealSelectors = [
    'section',
    '.card',
    '.stat-item',
    '.education-card',
    '.waste-col',
    '.service-item',
    '.value-card',
    '.service-card',
    '.info-card',
    '.doc-item'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(', '));

  // Si ya tiene fp-container (fullpage.js), marcar todo visible directamente
  if (document.getElementById('fp-container')) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        // Stagger para hijos directos tipo tarjeta
        const children = target.querySelectorAll(
          '.card, .stat-item, .education-card, .waste-col, .value-card, .service-card, .info-card, .doc-item'
        );

        setTimeout(() => {
          target.classList.add('visible');
        }, i * 60);

        children.forEach((child, ci) => {
          setTimeout(() => child.classList.add('visible'), ci * 100 + 80);
        });

        observer.unobserve(target);
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback sin IntersectionObserver
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 4. Marquee: pausa al hover ─────────────────────────── */
  const marquee        = document.querySelector('.marquee-wrapper');
  const marqueeContent = marquee?.querySelector('.marquee-content');
  if (marquee && marqueeContent) {
    marquee.addEventListener('mouseenter', () => {
      marqueeContent.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marqueeContent.style.animationPlayState = 'running';
    });
  }

  /* ── 5. Acordeón educación (botón expandir) ─────────────── */
  document.querySelectorAll('.education-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const extra    = targetId
        ? document.getElementById(targetId)
        : btn.previousElementSibling;
      if (!extra) return;
      const open = extra.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Ver menos ▲' : 'Ver más consejos ▼';
    });
  });


  /* ── 6. Barras de estadísticas animadas ─────────────────── */
  const statFills = document.querySelectorAll('.stat-fill');
  if (statFills.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const pct  = fill.dataset.width || fill.style.width || '0%';
          fill.style.width = '0%';
          requestAnimationFrame(() => {
            fill.style.transition = 'width 1.5s ease';
            fill.style.width      = pct;
          });
          statObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });

    statFills.forEach(fill => {
      // guardar el valor original como data-width
      if (!fill.dataset.width) fill.dataset.width = fill.style.width;
      statObserver.observe(fill);
    });
  }

});
