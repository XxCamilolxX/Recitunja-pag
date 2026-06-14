/* ReciTunja — interacciones principales */
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('section, .card, .stat-item, .education-card, .waste-col');

  // Si la página usa full-page scroll, todas las secciones ya son visibles
  if (document.getElementById('fp-container')) {
    revealTargets.forEach((t) => t.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        const children = target.querySelectorAll('.card, .stat-item, .education-card, .waste-col');

        target.classList.add('visible');
        children.forEach((child, index) => {
          setTimeout(() => child.classList.add('visible'), index * 100);
        });

        observer.unobserve(target);
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('visible'));
  }

  const stage = document.querySelector('.hero-logo-stage');
  if (stage) {
    const materials = [
      { emoji: '📦', label: 'Cartón', color: '#C8A165', dur: '6s' },
      { emoji: '🧴', label: 'Plástico', color: '#4CAEE3', dur: '8s' },
      { emoji: '🍶', label: 'Vidrio', color: '#7DC98F', dur: '10s' },
      { emoji: '🥫', label: 'Metal', color: '#A0A0A0', dur: '12s' },
      { emoji: '📄', label: 'Papel', color: '#F5D76E', dur: '14s' }
    ];

    stage.querySelectorAll('.orbit-item').forEach((item) => item.remove());

    materials.forEach((material, index) => {
      const item = document.createElement('div');
      const seconds = Number.parseFloat(material.dur);

      item.className = 'orbit-item';
      item.dataset.speed = material.dur;
      item.style.setProperty('--dur', material.dur);
      item.style.setProperty('--delay', `${-(seconds / materials.length) * index}s`);
      item.style.backgroundColor = material.color;
      item.innerHTML = `<strong>${material.emoji}</strong><span>${material.label}</span>`;
      stage.appendChild(item);
    });
  }

  const marquee = document.querySelector('.marquee-wrapper');
  const marqueeContent = marquee?.querySelector('.marquee-content');
  if (marquee && marqueeContent) {
    marquee.addEventListener('mouseenter', () => {
      marqueeContent.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marqueeContent.style.animationPlayState = 'running';
    });
  }
});
