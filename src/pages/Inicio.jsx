import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { APROVECHABLES, NO_APROVECHABLES, TIPS_RECICLAJE } from '../constants/data';

const Inicio = () => {
  const [activeTip, setActiveTip] = useState(null);
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

  // Auto-play timer for carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % APROVECHABLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // GSAP animation when activeIndex changes
  useGSAP(() => {
    if (!infoRef.current) return;
    gsap.fromTo(
      infoRef.current.querySelectorAll('.animate-fade'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    );
  }, [activeIndex]);

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

  const toggleTip = (id) => {
    setActiveTip(activeTip === id ? null : id);
  };

  const activeMaterial = APROVECHABLES[activeIndex];
  const wheelRotation = -90 - activeIndex * 40;

  return (
    <div className="w-full">
      {/* ==========================================
           HERO SECTION
         ========================================== */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden z-10">
        {/* Imagen de fondo con gradiente de oscurecimiento */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none" 
          style={{ 
            backgroundImage: "linear-gradient(to right, rgba(6, 26, 18, 0.95) 35%, rgba(6, 26, 18, 0.6) 70%, rgba(6, 26, 18, 0.9) 100%), url('/_MG_6921_1 Modificado.jpg')" 
          }} 
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

        {/* Wave transition absolute at bottom of Hero */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0 text-primary z-20">
          <svg viewBox="0 0 1440 60" className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

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
           MATERIALES CAROUSEL SECTION (Semicircle Orbit Slider)
         ========================================== */}
      <section className="w-full bg-secondary-dark text-white py-20 relative z-20 overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          
          {/* Header area */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Materiales Aprovechables
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              ¿Qué podemos reciclar?
            </h2>
            <p className="text-white/60 text-sm md:text-base">
              Conoce los 9 grupos de materiales que la ruta selectiva de ReciTunja aprovecha diariamente.
            </p>
          </div>

          {/* Semicircle Carousel Container */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna Izquierda: Información del Material Activo y Controles */}
            <div ref={infoRef} className="lg:col-span-5 flex flex-col justify-center min-h-[460px] lg:min-h-[500px]">
              
              {/* Grupo Activo Pill */}
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase mb-4 w-fit animate-fade" 
                style={{ backgroundColor: `${activeMaterial.color}20`, color: activeMaterial.color }}
              >
                <i className={`fa-solid ${activeMaterial.icon}`}></i> Grupo {activeIndex + 1} de {APROVECHABLES.length}
              </div>

              {/* Título Principal */}
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight animate-fade">
                {activeMaterial.title}
              </h3>

              {/* Ítems incluidos */}
              <div className="mb-6 animate-fade">
                <h4 className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5">Materiales Incluidos</h4>
                <p className="text-base font-semibold text-primary leading-relaxed">
                  {activeMaterial.items}
                </p>
              </div>

              {/* Detalle/Consejo */}
              <div 
                className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-8 text-sm text-white/70 leading-relaxed italic animate-fade"
                style={{ borderLeft: `4px solid ${activeMaterial.color}` }}
              >
                <strong>Consejo:</strong> {activeMaterial.details}
              </div>

              {/* Controles de Navegación */}
              <div className="flex items-center gap-4 animate-fade">
                {/* Botón Prev */}
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer"
                  aria-label="Anterior material"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>

                {/* Botón Play/Pause */}
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pausar reproducción" : "Reproducir automáticamente"}
                >
                  <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm`}></i>
                </button>

                {/* Botón Next */}
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer"
                  aria-label="Siguiente material"
                >
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </button>

                {/* Paginación - Bullets */}
                <div className="flex gap-2 ml-4">
                  {APROVECHABLES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleIconClick(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIndex 
                          ? 'w-6' 
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                      style={{ backgroundColor: i === activeIndex ? activeMaterial.color : undefined }}
                      aria-label={`Ir al material ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Órbita Semicircular */}
            <div className="lg:col-span-7 flex justify-center items-center relative overflow-hidden h-[380px] md:h-[500px] w-full">
              
              {/* Trayectoria semicircular punteada */}
              <div 
                className="absolute rounded-full border border-dashed border-white/15 pointer-events-none"
                style={{ 
                  width: isMobile ? '320px' : '500px',
                  height: isMobile ? '320px' : '500px',
                  bottom: isMobile ? '-160px' : '-250px' 
                }}
              />

              {/* Centro de la órbita (Estático) */}
              <div 
                className="absolute rounded-full bg-secondary-dark flex items-center justify-center z-20 border-4 shadow-2xl transition-all duration-500"
                style={{ 
                  width: isMobile ? '150px' : '220px',
                  height: isMobile ? '150px' : '220px',
                  borderColor: activeMaterial.color,
                  bottom: isMobile ? '-75px' : '-110px',
                  boxShadow: `0 -10px 40px ${activeMaterial.color}25`
                }}
              >
                {/* Ondas concéntricas (efecto ripple de fondo) */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-10" 
                  style={{ backgroundColor: activeMaterial.color, animationDuration: '3s' }} 
                />

                {/* Contenido destacado (sin texto visible) */}
                <div className="flex flex-col items-center justify-center text-white text-center p-3 md:p-4 pb-6 md:pb-12 select-none w-full">
                  <i 
                    className={`fa-solid ${activeMaterial.icon} text-4xl md:text-6xl transition-transform duration-500`} 
                    style={{ color: activeMaterial.color }} 
                  />
                </div>
              </div>

              {/* Rueda de órbita giratoria */}
              <div 
                className="absolute rounded-full flex items-center justify-center z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ 
                  width: isMobile ? '320px' : '500px',
                  height: isMobile ? '320px' : '500px',
                  bottom: isMobile ? '-160px' : '-250px',
                  transform: `rotate(${wheelRotation}deg)`
                }}
              >
                {APROVECHABLES.map((mat, idx) => {
                  const itemAngle = idx * 40; // Spacing es 360/9 = 40
                  const radius = isMobile ? 160 : 250;
                  const rad = (itemAngle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const isActive = idx === activeIndex;
                  const isHovered = hoveredIcon === idx;

                  return (
                    <button
                      key={mat.id}
                      onClick={() => handleIconClick(idx)}
                      onMouseEnter={() => setHoveredIcon(idx)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] focus:outline-none ${
                        isActive 
                          ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-115 z-30' 
                          : 'bg-white/5 border border-white/20 text-white/70 hover:bg-white/15 hover:text-white hover:scale-105 z-10'
                      }`}
                      style={{
                        width: isMobile ? '42px' : '56px',
                        height: isMobile ? '42px' : '56px',
                        top: '50%',
                        left: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-wheelRotation}deg)`,
                        borderColor: isActive ? mat.color : undefined,
                        color: isActive ? mat.color : undefined
                      }}
                      title={mat.shortTitle}
                    >
                      <i className={`fa-solid ${mat.icon} text-base md:text-xl`}></i>

                      {/* Tooltip on Hover */}
                      <div 
                        className={`absolute bottom-full mb-3 px-2.5 py-1 bg-secondary-dark/95 border border-white/10 text-white text-[10px] font-bold rounded-lg whitespace-nowrap shadow-xl pointer-events-none transition-all duration-300 ${
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

        </div>
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
