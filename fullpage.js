/* ============================================================
   RECITUNJA — Full-Page Scroll Controller
   ============================================================ */

(function () {
  'use strict';

  const container = document.getElementById('fp-container');
  const dots      = document.querySelectorAll('.fp-dot');
  const pages     = document.querySelectorAll('.fp-page');
  const dotsNav   = document.getElementById('fp-dots');
  const TOTAL     = pages.length;

  if (!container || !pages.length) return;

  let current   = 0;
  let scrolling = false; // evita doble salto

  /* ---------- Utilidades ---------- */
  function scrollToPage(index) {
    if (index < 0 || index >= TOTAL) return;
    current = index;
    pages[index].scrollIntoView({ behavior: 'smooth' });
    updateDots();
    updateDotsTheme();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  /* Cambia el color de los dots según el fondo de la sección activa */
  function updateDotsTheme() {
    // páginas claras: 1(about), 2(services), 3(education), 4(waste), 5(stats)
    const darkTextPages = [1, 2, 3, 4, 5];
    if (darkTextPages.includes(current)) {
      dotsNav.classList.add('dark');
    } else {
      dotsNav.classList.remove('dark');
    }
  }

  /* ---------- IntersectionObserver para detectar la página visible ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = Number(entry.target.id.replace('fp-', ''));
          if (!isNaN(idx) && idx !== current) {
            current = idx;
            updateDots();
            updateDotsTheme();
          }
        }
      });
    },
    { root: container, threshold: 0.5 }
  );

  pages.forEach((page) => observer.observe(page));

  /* ---------- Clicks en los dots ---------- */
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      scrollToPage(Number(dot.dataset.index));
    });
  });

  /* ---------- Teclado ---------- */
  document.addEventListener('keydown', (e) => {
    if (scrolling) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToPage(current + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToPage(current - 1);
    }
  });

  /* ---------- Rueda del ratón — snap inmediato ---------- */
  let wheelTimer = null;
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (scrolling) return;
    scrolling = true;
    if (e.deltaY > 0) {
      scrollToPage(current + 1);
    } else {
      scrollToPage(current - 1);
    }
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => { scrolling = false; }, 900);
  }, { passive: false });

  /* ---------- Touch / swipe ---------- */
  let touchStartY = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const delta = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 40) return; // umbral mínimo de 40px
    if (scrolling) return;
    scrolling = true;
    scrollToPage(delta > 0 ? current + 1 : current - 1);
    setTimeout(() => { scrolling = false; }, 900);
  }, { passive: true });

  /* ---------- Flecha scroll down en el hero ---------- */
  const arrowBtn = document.getElementById('fp-arrow-down');
  if (arrowBtn) {
    arrowBtn.addEventListener('click', () => scrollToPage(1));
  }

  /* ---------- Links de navegación interna (#hash) ---------- */
  document.querySelectorAll('.fp-nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = Number(link.dataset.section);
      scrollToPage(idx);
    });
  });

  /* ---------- Init ---------- */
  updateDots();
  updateDotsTheme();

})();
