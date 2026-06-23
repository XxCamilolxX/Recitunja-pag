import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WaveLink, useWaveTransition } from './WaveTransitionContext';
import { NAV_LINKS } from '../constants/data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { navbarRef } = useWaveTransition();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/95 shadow-lg border-b border-gray-200' : 'py-5 bg-white/90 border-b border-gray-100'
      } backdrop-blur-md`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <WaveLink to="/" className="flex items-center gap-2">
          <img 
            src="/logo-recitunja-2-20.png" 
            alt="ReciTunja Logo" 
            className="w-[42px] h-[42px] object-contain"
          />
        </WaveLink>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <WaveLink
              key={link.path}
              to={link.path}
              className={`relative font-medium text-sm transition-colors duration-300 py-1 ${
                isActive(link.path) 
                  ? 'text-primary' 
                  : 'text-secondary-dark/80 hover:text-primary'
              } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-primary before:transition-all before:duration-300 ${
                isActive(link.path) ? 'before:w-full' : 'hover:before:w-full'
              }`}
            >
              {link.name}
            </WaveLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden xl:block">
          <WaveLink 
            to="/contacto" 
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            Contáctanos 
            <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
          </WaveLink>
        </div>

        {/* Burger Button */}
        <button 
          className="xl:hidden text-secondary-dark text-xl p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`xl:hidden fixed top-[70px] left-0 w-full bg-white/95 border-b border-gray-200 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] py-6 shadow-xl' : 'max-h-0 py-0'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <WaveLink
              key={link.path}
              to={link.path}
              className={`font-semibold text-base py-2 border-b border-gray-100 transition-colors ${
                isActive(link.path) ? 'text-primary' : 'text-secondary-dark hover:text-primary'
              }`}
            >
              {link.name}
            </WaveLink>
          ))}
          <WaveLink 
            to="/contacto" 
            className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-colors"
          >
            Contáctanos 
            <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
          </WaveLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
