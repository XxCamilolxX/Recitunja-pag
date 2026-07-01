import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { APROVECHABLES } from '../constants/data';
import WaveDivider from '../components/ui/WaveDivider';

const Inicio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const infoRef = useRef(null);

  // Detect mobile and prefers-reduced-motion
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    if (motionQuery.matches) {
      setIsPlaying(false);
    }

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Auto-play timer for carousel
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % APROVECHABLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, reducedMotion]);

  // GSAP animation when activeIndex changes
  useGSAP(() => {
    if (!infoRef.current || reducedMotion) return;
    gsap.fromTo(
      infoRef.current.querySelectorAll('.animate-fade'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    );
  }, [activeIndex, reducedMotion]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + APROVECHABLES.length) % APROVECHABLES.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % APROVECHABLES.length);
  };

  const handleIconClick = (idx) => {
    setIsPlaying(false);
    setActiveIndex(idx);
  };

  const activeMaterial = APROVECHABLES[activeIndex];
  const materialCount = APROVECHABLES.length;
  const orbitRadius = isMobile ? 124 : 390;
  const orbitVerticalScale = isMobile ? 0.72 : 0.62;
  const orbitIconSize = isMobile ? 44 : 58;
  const activeImageSize = isMobile ? 180 : 330;
  const orbitCenterLeft = isMobile ? '50%' : '43%';
  const orbitCenterTop = isMobile ? '58%' : '28%';
  const orbitWidth = orbitRadius * 2;
  const orbitHeight = orbitRadius * 2 * orbitVerticalScale;
  const orbitArcPath = `M ${orbitRadius} 0 A ${orbitRadius} ${orbitRadius * orbitVerticalScale} 0 0 1 ${orbitRadius} ${orbitHeight}`;

  return (
    <div className="w-full">
      {/* ==========================================
           HERO SECTION
         ========================================== */}
      <section className="relative min-h-screen flex items-end pt-24 pb-24 md:pb-28 overflow-hidden z-10">
        {/* Imagen de fondo con gradiente de oscurecimiento */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none" 
          style={{ 
            backgroundImage: "linear-gradient(to top, rgba(6, 26, 18, 0.74) 0%, rgba(6, 26, 18, 0.28) 32%, rgba(6, 26, 18, 0.08) 62%, rgba(6, 26, 18, 0.18) 100%), url('/_MG_6921_1 Modificado.jpg')" 
          }} 
        />
        
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 w-full">
          {/* Hero Content with Logo Image */}
          <div className="text-white flex flex-col items-start text-left max-w-xl">
            <img 
              src="/RECITUNJA LOGOTIPO con borde blanco.png" 
              alt="ReciTunja - Porque el medio ambiente eres tú" 
              className="w-[280px] sm:w-[360px] md:w-[460px] h-auto mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
            />

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-start">
              <Link 
                to="/contacto" 
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-xs md:text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                CONTÁCTANOS <i className="fa-solid fa-leaf ml-2"></i>
              </Link>
              <Link 
                to="/la-empresa" 
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-xs md:text-sm border-2 border-white/35 text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                TRABAJA CON NOSOTROS
              </Link>
            </div>
          </div>
        </div>

        {/* Wave transition absolute at bottom of Hero */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0 text-primary z-20">
          <svg viewBox="0 0 1440 60" className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* MARQUEE BAR */}
      <div className="bg-primary py-4 overflow-hidden relative z-10 shadow-md">
        <div className="flex whitespace-nowrap animate-marquee text-secondary-dark font-bold text-lg md:text-xl">
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

      {/* Wave Transition Marquee to Materials */}
      <WaveDivider from="bg-primary" to="text-cream" />

      {/* ==========================================
           MATERIALS CAROUSEL SECTION
         ========================================== */}
      <section className="bg-cream relative z-20 overflow-hidden py-16 md:py-20 lg:py-24">
        <div 
          className="hidden lg:block absolute inset-y-8 lg:right-[-24%] lg:w-[66%] pointer-events-none"
          style={{
            borderRadius: isMobile ? '46px' : '999px 0 0 999px',
            background: 'radial-gradient(circle at 28% 46%, rgba(91, 191, 122, 0.22) 0%, rgba(91, 191, 122, 0) 34%), linear-gradient(135deg, #245b42 0%, #143526 100%)',
            boxShadow: 'inset 0 0 90px rgba(0, 0, 0, 0.22), 0 30px 80px rgba(30, 77, 56, 0.14)'
          }}
          aria-hidden="true"
        />

        <div 
          className="absolute top-10 left-[-120px] h-[260px] w-[260px] rounded-full bg-white/55 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-[640px] mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Materiales Aprovechables
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-secondary-dark mb-3 leading-tight">
              ¿Qué podemos reciclar?
            </h2>
            <p className="text-secondary-dark/65 text-base md:text-lg leading-relaxed">
              Conoce los 9 grupos de materiales que la ruta selectiva de ReciTunja aprovecha diariamente.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div ref={infoRef} className="lg:col-span-5 flex flex-col justify-center min-h-[340px] lg:min-h-[440px]" aria-live="polite">
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold uppercase mb-4 w-fit animate-fade shadow-sm" 
                style={{ backgroundColor: `${activeMaterial.color}24`, color: activeMaterial.color }}
              >
                <i className={`fa-solid ${activeMaterial.icon}`}></i> Grupo {activeIndex + 1} de {materialCount}
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary-dark mb-4 leading-[1.06] animate-fade">
                {activeMaterial.title}
              </h3>

              <div className="mb-6 animate-fade">
                <h4 className="text-xs uppercase tracking-[0.2em] text-secondary-dark/45 mb-2 font-black">Materiales incluidos</h4>
                <p className="text-lg md:text-xl font-bold leading-relaxed" style={{ color: activeMaterial.color }}>
                  {activeMaterial.items}
                </p>
              </div>

              <div 
                className="bg-white/78 backdrop-blur-sm border border-white/80 rounded-2xl p-5 mb-7 text-base md:text-lg text-secondary-dark/72 leading-relaxed italic animate-fade shadow-[0_16px_45px_rgba(30,77,56,0.08)]"
                style={{ borderLeft: `5px solid ${activeMaterial.color}` }}
              >
                <strong className="text-secondary-dark">Consejo:</strong> {activeMaterial.details}
              </div>

              <div className="flex flex-wrap items-center gap-3 animate-fade">
                <button 
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-secondary-dark/18 bg-white/60 flex items-center justify-center text-secondary-dark hover:bg-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Anterior material"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>

                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-11 h-11 rounded-full border border-secondary-dark/18 bg-white/60 flex items-center justify-center text-secondary-dark hover:bg-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                  aria-label={isPlaying ? "Pausar reproducción" : "Reproducir automáticamente"}
                >
                  <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm`}></i>
                </button>

                <button 
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border border-secondary-dark/18 bg-white/60 flex items-center justify-center text-secondary-dark hover:bg-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Siguiente material"
                >
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </button>

                <div className="flex flex-wrap gap-2 ml-0 md:ml-3">
                  {APROVECHABLES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleIconClick(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIndex 
                          ? 'w-7' 
                          : 'w-2.5 bg-secondary-dark/14 hover:bg-secondary-dark/30'
                      }`}
                      style={{ backgroundColor: i === activeIndex ? activeMaterial.color : undefined }}
                      aria-label={`Ir al material ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[350px] md:h-[500px] lg:h-[540px] w-full overflow-visible">
              <div
                className="absolute inset-y-0 right-[-46%] w-[118%] rounded-[42px] pointer-events-none lg:hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 45%, rgba(91, 191, 122, 0.22) 0%, rgba(91, 191, 122, 0) 36%), linear-gradient(135deg, #245b42 0%, #143526 100%)',
                  boxShadow: 'inset 0 0 70px rgba(0, 0, 0, 0.2), 0 24px 60px rgba(30, 77, 56, 0.12)'
                }}
                aria-hidden="true"
              />

              <svg
                className="absolute z-10 pointer-events-none overflow-visible"
                viewBox={`0 0 ${orbitWidth} ${orbitHeight}`}
                style={{ 
                  left: orbitCenterLeft,
                  top: orbitCenterTop,
                  width: `${orbitWidth}px`,
                  height: `${orbitHeight}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                aria-hidden="true"
              >
                <path
                  d={orbitArcPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.24)"
                  strokeWidth="1"
                  strokeDasharray="5 9"
                  strokeLinecap="round"
                />
              </svg>

              <div 
                className="absolute z-30 rounded-full bg-cream flex items-center justify-center overflow-hidden border-[6px] transition-all duration-500"
                style={{ 
                  left: orbitCenterLeft,
                  top: orbitCenterTop,
                  width: `${activeImageSize}px`,
                  height: `${activeImageSize}px`,
                  transform: 'translate(-50%, -50%)',
                  borderColor: activeMaterial.color,
                  boxShadow: `0 28px 78px rgba(0, 0, 0, 0.22), 0 0 0 14px rgba(238, 248, 242, 0.42), 0 0 42px ${activeMaterial.color}42`
                }}
              >
                <div 
                  className="absolute inset-8 rounded-full opacity-40 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${activeMaterial.color}35 0%, transparent 70%)` }}
                  aria-hidden="true"
                />
                <img 
                  src={activeMaterial.image} 
                  alt={activeMaterial.shortTitle}
                  className="relative z-10 w-[78%] h-[78%] object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.2)] transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div 
                className="absolute z-10"
                style={{ left: orbitCenterLeft, top: orbitCenterTop, width: 0, height: 0 }}
              >
                {APROVECHABLES.map((mat, idx) => {
                  const rawOffset = (idx - activeIndex + materialCount) % materialCount;
                  const centeredOffset = rawOffset > materialCount / 2 ? rawOffset - materialCount : rawOffset;
                  const angle = -90 + centeredOffset * (isMobile ? 22 : 40);
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * orbitRadius;
                  const y = Math.sin(rad) * orbitRadius * orbitVerticalScale;
                  const isActive = idx === activeIndex;
                  const isHovered = hoveredIcon === idx;
                  const isHiddenByWhiteSide = x < -8;

                  return (
                    <button
                      key={mat.id}
                      onClick={() => handleIconClick(idx)}
                      onMouseEnter={() => setHoveredIcon(idx)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] focus:outline-none focus:ring-2 focus:ring-white/80 overflow-visible ${
                        isActive 
                          ? 'bg-white z-30 shadow-[0_18px_40px_rgba(0,0,0,0.18)]' 
                          : 'bg-white/18 border border-white/22 hover:bg-white/30 z-10'
                      }`}
                      style={{
                        width: `${isActive ? orbitIconSize + 12 : orbitIconSize}px`,
                        height: `${isActive ? orbitIconSize + 12 : orbitIconSize}px`,
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        borderColor: isActive ? mat.color : undefined,
                        boxShadow: isActive ? `0 0 0 4px ${mat.color}55, 0 18px 42px rgba(0,0,0,0.18)` : undefined,
                        opacity: isHiddenByWhiteSide ? 0 : undefined,
                        pointerEvents: isHiddenByWhiteSide ? 'none' : undefined,
                      }}
                      title={mat.shortTitle}
                      aria-label={`Ver ${mat.shortTitle}`}
                    >
                      <img 
                        src={mat.image} 
                        alt=""
                        className={`w-[72%] h-[72%] object-contain transition-all duration-300 pointer-events-none ${
                          isActive ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                        }`}
                      />

                      <span 
                        className={`absolute bottom-full left-1/2 mb-3 -translate-x-1/2 px-2.5 py-1 bg-secondary-dark/95 border border-white/10 text-white text-[10px] font-bold rounded-lg whitespace-nowrap shadow-xl pointer-events-none transition-all duration-300 ${
                          isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
                        }`}
                        style={{ borderBottomColor: mat.color }}
                      >
                        {mat.shortTitle}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-secondary-dark/95" />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div 
                className="hidden lg:block absolute right-3 bottom-3 md:right-10 md:bottom-12 z-20 rounded-2xl bg-white/12 border border-white/18 backdrop-blur-md px-4 py-3 text-white shadow-xl max-w-[220px]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-white/60 font-black mb-1">Ruta selectiva</p>
                <p className="text-base font-bold leading-snug">Materiales limpios, secos y separados desde la fuente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="bg-cream" to="text-secondary-dark" variant="dip" />
    </div>
  );
};

export default Inicio;
