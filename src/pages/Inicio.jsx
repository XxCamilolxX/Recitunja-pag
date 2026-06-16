import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APROVECHABLES, NO_APROVECHABLES, TIPS_RECICLAJE } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

const Inicio = () => {
  const [activeTip, setActiveTip] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const orbitRef = useRef(null);
  const iconsRef = useRef([]);

  // Detect mobile and prefers-reduced-motion
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // GSAP Scroll animation for Desktop
  useGSAP(() => {
    if (isMobile || reducedMotion) return;

    // Reset initial rotation values
    gsap.set(orbitRef.current, { rotation: 0 });
    iconsRef.current.forEach((icon) => {
      if (icon) gsap.set(icon, { rotation: 0 });
    });

    // 1. Initial State configuration (Item 0 should be fully active when page loads)
    gsap.set('#header-0', { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
    gsap.set('#details-0', { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
    gsap.set('#orbit-icon-0', {
      scale: 1.3,
      borderColor: APROVECHABLES[0].color,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: `0 0 25px ${APROVECHABLES[0].color}80`,
    });

    // Pinned container timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // h-[500vh] container
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: stickyRef.current, // Pin the 100vh inner container
      }
    });

    // 2. Rotate the orbit ring
    tl.to(orbitRef.current, {
      rotation: 360,
      ease: 'none',
      duration: APROVECHABLES.length,
    }, 0);

    // 3. Counter-rotate icons to keep them upright
    iconsRef.current.forEach((icon) => {
      if (icon) {
        tl.to(icon, {
          rotation: -360,
          ease: 'none',
          duration: APROVECHABLES.length,
        }, 0);
      }
    });

    // 4. Sequential Reveal of Panels and Highlighting of active orbiting items
    APROVECHABLES.forEach((mat, idx) => {
      const startTime = idx; // Each step takes 1 unit of duration
      
      // If it's NOT the first item, animate its entrance (since item 0 starts active)
      if (idx > 0) {
        // Header Fade In
        tl.to(`#header-${idx}`, {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          duration: 0.4,
          ease: 'power2.out',
        }, startTime + 0.1);

        // Details Card Fade In
        tl.to(`#details-${idx}`, {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          duration: 0.4,
          ease: 'power2.out',
        }, startTime + 0.1);

        // Icon Active state (scale and glow)
        tl.to(`#orbit-icon-${idx}`, {
          scale: 1.3,
          borderColor: mat.color,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: `0 0 25px ${mat.color}80`,
          duration: 0.4,
        }, startTime + 0.1);
      }

      // Animate the exit (for all items EXCEPT the last one)
      if (idx < APROVECHABLES.length - 1) {
        tl.to(`#header-${idx}`, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          pointerEvents: 'none',
          duration: 0.4,
          ease: 'power2.in',
        }, startTime + 0.7);

        tl.to(`#details-${idx}`, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          pointerEvents: 'none',
          duration: 0.4,
          ease: 'power2.in',
        }, startTime + 0.7);

        tl.to(`#orbit-icon-${idx}`, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          boxShadow: 'none',
          duration: 0.4,
        }, startTime + 0.7);
      }
    });

  }, { scope: containerRef, dependencies: [isMobile, reducedMotion] });

  // Calculate circular layout positions for orbit icons (radius 160px)
  const getOrbitPosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top (-90 degrees)
    const radius = 160; // px
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Click handler to scroll the page to highlight a specific material
  const handleIconClick = (idx) => {
    if (isMobile || reducedMotion || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Total height that the user can scroll through inside the trigger container
    const triggerTop = rect.top + scrollTop;
    const triggerHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = triggerHeight - viewportHeight;
    
    // Linearly interpolate scroll position for index idx
    const fraction = idx / (APROVECHABLES.length - 1);
    const targetScroll = triggerTop + fraction * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const toggleTip = (id) => {
    setActiveTip(activeTip === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* ==========================================
           HERO SECTION
         ========================================== */}
      <section className="relative min-h-screen bg-secondary-dark flex items-center pt-24 pb-16 overflow-hidden z-10">
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at 75% 50%, rgba(96, 223, 120, 0.08) 0%, rgba(6, 26, 18, 1) 60%)' }} 
        />
        
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Left Text */}
          <div className="text-white flex flex-col items-start lg:col-span-7">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none">
              <span className="text-primary">RECI</span>TUNJA
            </h1>
            <p className="text-xl md:text-2xl italic font-light text-primary/80 mb-6">
              Porque el medio ambiente eres tú
            </p>
            <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
              Transformamos los residuos de Tunja en nuevas oportunidades. Descubre cómo tu compromiso con el reciclaje construye un futuro más limpio y sostenible para todos. Únete a la economía circular.
            </p>
            
            {/* Stats pill */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full mb-8 backdrop-blur-sm shadow-md">
              <span className="text-xl md:text-2xl font-bold text-primary">+500 ton</span>
              <span className="text-lg">🍃</span>
              <span className="text-sm italic text-white/80">recicladas</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contacto" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                CONTÁCTANOS <i className="fa-solid fa-leaf ml-2"></i>
              </Link>
              <Link 
                to="/la-empresa" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                TRABAJA CON NOSOTROS
              </Link>
            </div>
          </div>

          {/* Right Section: Visual showcase */}
          <div className="flex justify-center items-center relative h-[350px] md:h-[450px] lg:col-span-5">
            <div className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-primary/20 flex items-center justify-center relative bg-secondary-dark/50 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/10 animate-spin" style={{ animationDuration: '60s' }} />
              {/* Circular logo */}
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-white/5 p-4 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
                <img 
                  src="/logo.png" 
                  alt="ReciTunja Logo circular" 
                  className="w-full h-full object-cover rounded-full filter drop-shadow-2xl animate-pulse"
                  style={{ animationDuration: '4s' }}
                />
              </div>
              
              {/* Floating Leaf items */}
              <span className="absolute top-10 right-10 text-5xl opacity-25 animate-float-leaf text-primary">🍃</span>
              <span className="absolute bottom-12 left-8 text-4xl opacity-15 animate-float-leaf text-primary" style={{ animationDelay: '1.5s' }}>🌱</span>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE TRANSITION HERO -> MARQUEE */}
      <div className="section-wave bg-secondary-dark text-primary">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* MARQUEE BAR */}
      <div className="bg-primary py-4 overflow-hidden relative z-10 shadow-md">
        <div className="flex whitespace-nowrap animate-marquee text-secondary-dark font-bold text-base md:text-lg">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0 gap-10 px-5">
              <span><i className="fa-solid fa-leaf mr-2"></i> Reciclaje Sustentable</span>
              <span><i className="fa-solid fa-globe mr-2"></i> Protección Ambiental</span>
              <span><i className="fa-solid fa-recycle mr-2"></i> Economía Circular</span>
              <span><i className="fa-solid fa-seedling mr-2"></i> Inclusión Social</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Transition Marquee to Section */}
      <div className="section-wave bg-primary text-secondary-dark">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* ==========================================
           STICKY INTERACTION SECTION (GSAP Centered Reveal)
         ========================================== */}
      <section 
        ref={containerRef} 
        className={`w-full bg-secondary-dark text-white overflow-hidden relative z-20 ${
          isMobile || reducedMotion ? 'py-20' : 'h-[500vh]'
        }`}
      >
        {isMobile || reducedMotion ? (
          /* ──────────────────────────────────────────
             A11Y & MOBILE FALLBACK (Linear list)
             ────────────────────────────────────────── */
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
                <span className="w-6 h-[2px] bg-primary"></span>
                Materiales Aprovechables
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">¿Qué podemos reciclar?</h2>
              <p className="text-white/60 text-sm md:text-base">
                Conoce los 9 grupos de materiales que la ruta selectiva de ReciTunja aprovecha diariamente.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {APROVECHABLES.map((mat) => (
                <div 
                  key={mat.id} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between"
                  style={{ borderTop: `4px solid ${mat.color}` }}
                >
                  <div>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg mb-4"
                      style={{ backgroundColor: `${mat.color}20`, color: mat.color }}
                    >
                      <i className={`fa-solid ${mat.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: mat.color }}>{mat.title}</h3>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed font-semibold">{mat.items}</p>
                  </div>
                  <div className="text-xs text-white/50 bg-black/20 p-3 rounded-lg border border-white/5 italic">
                    {mat.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ──────────────────────────────────────────
             DESKTOP PINNED SYMMETRICAL INTERACTION (Orbit centered, Header top, Card bottom)
             ────────────────────────────────────────── */
          <div 
            ref={stickyRef} 
            className="w-full h-screen bg-secondary-dark relative flex flex-col justify-between items-center py-20 px-8"
          >
            {/* Visual background lights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
            
            {/* TOP HEADER CONTAINER */}
            <div className="relative w-full max-w-[800px] h-[100px] flex items-center justify-center z-20 pointer-events-none">
              {APROVECHABLES.map((mat, idx) => (
                <div
                  key={mat.id}
                  id={`header-${idx}`}
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 scale-95 pointer-events-none translate-y-4"
                >
                  <div 
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase mb-2" 
                    style={{ backgroundColor: `${mat.color}20`, color: mat.color }}
                  >
                    <i className={`fa-solid ${mat.icon}`}></i> Grupo {idx + 1} de {APROVECHABLES.length}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white text-center tracking-tight leading-tight">
                    {mat.title}
                  </h2>
                </div>
              ))}
            </div>

            {/* CENTER ORBIT CONTAINER */}
            <div className="flex-grow flex items-center justify-center relative w-full z-10 py-4">
              <div className="w-[420px] h-[420px] relative flex items-center justify-center">
                
                {/* Orbit dashed ring */}
                <div className="absolute w-[320px] h-[320px] rounded-full border border-white/5 border-dashed pointer-events-none" />
                
                {/* Center logo - circular brand */}
                <div className="absolute w-[140px] h-[140px] rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(96,223,120,0.12)] z-20 border-4 border-primary hover:rotate-12 transition-transform duration-500 cursor-pointer">
                  <img 
                    src="/logo.png" 
                    alt="ReciTunja Logo central" 
                    className="w-[110px] h-[110px] object-cover rounded-full"
                  />
                </div>

                {/* Rotating orbit */}
                <div ref={orbitRef} className="absolute w-[320px] h-[320px] rounded-full flex items-center justify-center z-10">
                  {APROVECHABLES.map((mat, idx) => {
                    const pos = getOrbitPosition(idx, APROVECHABLES.length);
                    const isHovered = hoveredIcon === idx;
                    return (
                      <button
                        key={mat.id}
                        id={`orbit-icon-${idx}`}
                        ref={(el) => (iconsRef.current[idx] = el)}
                        onClick={() => handleIconClick(idx)}
                        onMouseEnter={() => setHoveredIcon(idx)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        className="absolute w-[52px] h-[52px] rounded-full bg-white/5 border border-white/20 flex items-center justify-center cursor-pointer text-white transition-all duration-300 hover:scale-125 focus:outline-none"
                        style={{
                          transform: `translate(${pos.x}px, ${pos.y}px)`,
                          zIndex: isHovered ? 30 : 10
                        }}
                      >
                        <i className={`fa-solid ${mat.icon} text-lg`}></i>

                        {/* Tooltip on Hover */}
                        <div 
                          className={`absolute bottom-full mb-3 px-3 py-1.5 bg-secondary-dark/95 border border-white/10 text-white text-[11px] font-bold rounded-lg whitespace-nowrap shadow-xl pointer-events-none transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
                          }`}
                          style={{ borderBottomColor: mat.color }}
                        >
                          {mat.shortTitle}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-secondary-dark/95" />
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* BOTTOM DETAILS CONTAINER */}
            <div className="relative w-full max-w-[850px] h-[160px] flex items-center justify-center z-20">
              {APROVECHABLES.map((mat, idx) => (
                <div
                  key={mat.id}
                  id={`details-${idx}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 pointer-events-none translate-y-4 px-4"
                >
                  <div 
                    className="w-full bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative grid md:grid-cols-12 gap-6 items-center"
                    style={{ 
                      boxShadow: `0 0 35px ${mat.color}10`,
                      borderLeft: `4px solid ${mat.color}`
                    }}
                  >
                    <div className="md:col-span-7">
                      <h4 className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Materiales Incluidos</h4>
                      <p className="text-sm md:text-base font-medium text-primary leading-relaxed">{mat.items}</p>
                    </div>
                    <div className="md:col-span-5 bg-black/25 p-4 rounded-xl border border-white/5 text-xs md:text-sm text-white/70 leading-relaxed italic">
                      <strong>Consejo:</strong> {mat.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </section>

      {/* Wave Transition Sticky -> Separation & Tips Section */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* ==========================================
           CONSOLIDATED INFORMATION SECTION (Separation & Tips)
         ========================================== */}
      <section className="bg-cream py-20 relative z-10 text-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT COLUMN: Environmental Tips (Buenas Prácticas) */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-1">
                <span className="w-6 h-[2px] bg-primary"></span>
                Buenas Prácticas
              </div>
              <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">¿Cómo reciclar correctamente?</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Sigue estos consejos para que los materiales que entregas a los Verdecitos de ReciTunja lleguen en las mejores condiciones y puedan ser aprovechados.
              </p>

              {/* Tips Accordion */}
              <div className="flex flex-col gap-3.5 w-full">
                {TIPS_RECICLAJE.map((tip) => (
                  <div 
                    key={tip.id} 
                    className="bg-white border border-gray-200/50 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
                  >
                    <button
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-secondary-dark focus:outline-none hover:bg-gray-50"
                      onClick={() => toggleTip(tip.id)}
                    >
                      <span className="flex items-center gap-3 text-sm md:text-base">
                        <span className="text-xl">{tip.emoji}</span>
                        <span>{tip.title}</span>
                      </span>
                      <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${activeTip === tip.id ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        activeTip === tip.id ? 'max-h-40 border-t border-gray-100' : 'max-h-0'
                      }`}
                    >
                      <div className="p-4 text-xs md:text-sm text-gray-500 leading-relaxed bg-cream/10">
                        {tip.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Link 
                  to="/educacion" 
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-xs bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300"
                >
                  Página de educación ambiental <i className="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Separation Lists (Sí / No) */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-1">
                <span className="w-6 h-[2px] bg-primary"></span>
                Clasificación de Residuos
              </div>
              <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">¿Qué recibimos en la Ruta?</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Recuerda entregar tus materiales clasificados, <strong>limpios y completamente secos</strong>.
              </p>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                {/* Sí recibimos */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-inner">
                  <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-circle-check text-lg"></i> Sí recibimos
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {APROVECHABLES.slice(0, 5).map((mat) => (
                      <li key={mat.id} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed font-semibold">
                        <span className="text-emerald-500 mt-0.5 shrink-0"><i className="fa-solid fa-check"></i></span>
                        <span>{mat.shortTitle}</span>
                      </li>
                    ))}
                    <li className="text-xs text-gray-500 italic font-medium mt-1">
                      y 4 grupos más...
                    </li>
                  </ul>
                </div>

                {/* No recibimos */}
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 shadow-inner">
                  <h3 className="text-base font-bold text-rose-800 flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-circle-xmark text-lg"></i> No recibimos
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      "Icopor (poliestireno expandido).",
                      "Plásticos chirriones (envolturas).",
                      "Plásticos de un solo uso (desechables).",
                      "Residuos reciclables sucios o mojados.",
                      "Madera, mueblería o ropa vieja."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed font-semibold">
                        <span className="text-rose-500 mt-0.5 shrink-0"><i className="fa-solid fa-xmark"></i></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link 
                  to="/separacion" 
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-xs bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300"
                >
                  Página de separación completa <i className="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Wave Transition Separation to Footer */}
      <div className="section-wave bg-cream text-secondary-dark">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default Inicio;
