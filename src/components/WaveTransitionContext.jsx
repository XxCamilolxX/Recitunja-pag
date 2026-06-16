import React, { createContext, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const WaveTransitionContext = createContext();

export const useWaveTransition = () => useContext(WaveTransitionContext);

export const WaveTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionOverlayRef = useRef(null);
  const navbarRef = useRef(null);

  const waveNavigate = (path) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentPath = window.location.pathname;
    
    if (currentPath === path) {
      setIsTransitioning(false);
      return;
    }

    const navbar = navbarRef.current;
    const overlay = transitionOverlayRef.current;

    // === PHASE 1: Cover the screen ===
    // Overlay slides DOWN from above (-110% → 0%)
    // Header drops DOWN slightly and fades out
    const tlIn = gsap.timeline({
      onComplete: () => {
        // Route change while screen is covered
        navigate(path);
        window.scrollTo(0, 0);

        // === PHASE 2: Reveal the new page ===
        // Overlay slides BACK UP to exit (0% → -110%)
        gsap.to(overlay, {
          y: '-110%',
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: () => {
            // Overlay is already at -110%, ready for next use
            setIsTransitioning(false);
          }
        });

        // Header reappears: starts slightly above, slides DOWN into position + fade in
        if (navbar) {
          gsap.fromTo(navbar, 
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.15 }
          );
        }
      }
    });

    // Header drops DOWN and fades out
    if (navbar) {
      tlIn.to(navbar, {
        y: 40,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
      }, 0);
    }

    // Overlay slides DOWN from above
    tlIn.to(overlay, {
      y: '0%',
      duration: 0.65,
      ease: 'power3.inOut',
    }, 0);
  };

  return (
    <WaveTransitionContext.Provider value={{ waveNavigate, transitionOverlayRef, navbarRef, isTransitioning }}>
      {children}
    </WaveTransitionContext.Provider>
  );
};

export const WaveLink = ({ to, children, className, ...props }) => {
  const { waveNavigate } = useWaveTransition();
  
  const handleClick = (e) => {
    e.preventDefault();
    waveNavigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
