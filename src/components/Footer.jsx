import React from 'react';
import { WaveLink } from './WaveTransitionContext';
import { FOOTER_LINKS } from '../constants/data';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/share/1HF2E2ewop/', icon: 'fa-brands fa-facebook-f' },
    { name: 'X', url: 'https://x.com/ReciTunja', label: 'X' },
    { name: 'Instagram', url: 'https://www.instagram.com/asociacion_recitunja', icon: 'fa-brands fa-instagram' },
  ];

  return (
    <footer className="bg-secondary-dark text-white/70 py-16 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Content Wrapper */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-white/5">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {FOOTER_LINKS.map((link) => (
              <WaveLink 
                key={link.path} 
                to={link.path}
                className="text-sm text-white/60 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </WaveLink>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center text-sm transition-all duration-300 hover:bg-primary hover:text-secondary-dark hover:-translate-y-1"
              >
                {social.icon ? (
                  <i className={social.icon}></i>
                ) : (
                  <span className="font-black text-[13px] leading-none">X</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-white/40">
          <p>Diseñado por Marketinglive.com.co - Todos los derechos reservados Recitunja.com &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
