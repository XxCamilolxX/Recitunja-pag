import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsappWidget from './WhatsappWidget';
import { useWaveTransition } from './WaveTransitionContext';
import gsap from 'gsap';

const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { transitionOverlayRef } = useWaveTransition();
  const [isPreloading, setIsPreloading] = useState(true);
  
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  // Entrance Preloader Animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Logo aparece con bounce
    tl.fromTo(logoRef.current,
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.7)' }
    )
    // Texto sube con fade
    .fromTo(textRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    // El preloader sube completo (slide up) — yPercent -110 para limpiar la ola
    .to(preloaderRef.current, {
      yPercent: -110,
      duration: 1.1,
      ease: 'power4.inOut',
      delay: 0.7,
      onComplete: () => setIsPreloading(false),
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Liquid Preloader Intro Screen */}
      {isPreloading && (
        <div 
          ref={preloaderRef}
          className="fixed inset-0 z-[10000] bg-secondary-dark flex flex-col justify-center items-center text-white"
        >
          <div className="flex flex-col items-center max-w-sm px-6">
            <div 
              ref={logoRef}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white p-4 border-4 border-primary flex items-center justify-center shadow-2xl mb-6"
              style={{ opacity: 0 }}
            >
              <img 
                src="/logo.png" 
                alt="ReciTunja Logo Intro" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            <div ref={textRef} className="text-center" style={{ opacity: 0 }}>
              <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                <span className="text-primary">RECI</span>TUNJA
              </h2>
              <p className="text-sm italic font-light text-primary/80">
                Porque el medio ambiente eres tú
              </p>
            </div>
          </div>

          {/* Ola SVG que extiende el preloader hacia abajo — borde ondulado como trailing edge al subir */}
          <div className="absolute top-full left-0 w-full h-[80px] pointer-events-none">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" style={{ display: 'block' }}>
              <path d="M0,0 L1440,0 L1440,30 C1080,80 360,80 0,30 Z" fill="#1e4d38" />
            </svg>
          </div>
        </div>
      )}

      {/* Wave Transition Overlay — panel limpio sin olas extras */}
      <div 
        ref={transitionOverlayRef}
        className="fixed inset-0 z-[9999] bg-secondary-dark w-full h-full pointer-events-none flex flex-col justify-center items-center"
        style={{ transform: 'translateY(-110%)' }}
      >
        <div className="flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="Transition Logo" 
            className="w-16 h-16 rounded-full border-2 border-primary animate-pulse"
          />
        </div>
      </div>

      {/* Association Background Image - Fixed backdrop texture */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/_MG_6921_1 Modificado.jpg')",
          backgroundBlendMode: 'overlay'
        }}
        aria-hidden="true"
      />
      
      {/* Secondary overlay for blending */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent to-cream/30"
        aria-hidden="true"
      />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow z-10 relative">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <WhatsappWidget />
    </div>
  );
};

export default AppLayout;
