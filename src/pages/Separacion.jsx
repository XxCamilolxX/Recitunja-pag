import React from 'react';
import { Link } from 'react-router-dom';
import { APROVECHABLES, NO_APROVECHABLES } from '../constants/data';

const Separacion = () => {
  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Separación de Residuos</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Qué reciben los Verdecitos de ReciTunja y qué no hace parte de la ruta selectiva.
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> Content */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Lists of Waste */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Ruta Selectiva
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">¿Qué materiales reciclamos?</h2>
            <p className="text-gray-500 text-sm">
              Para que el proceso de reciclaje funcione bien, es importante saber qué materiales acepta nuestro equipo. Recuerda: deben estar <strong>limpios y secos</strong>.
            </p>
          </div>

          <div className="grid gap-10 max-w-6xl mx-auto">
            {/* Sí recibimos */}
            <img 
              src="/si-recibimos.png" 
              alt="Sí recibimos" 
              className="w-full h-auto rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300" 
            />

            {/* No recibimos */}
            <div className="contents">
              <img 
                src="/no-recibimos.png" 
                alt="No recibimos" 
                className="w-full h-auto rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300" 
              />
              <div className="max-w-3xl mx-auto bg-rose-50 border border-rose-100/50 p-5 rounded-2xl text-sm text-center text-rose-800 leading-relaxed italic">
                <strong>Importante:</strong> Los residuos no aprovechables deben depositarse en el servicio de aseo ordinario de la ciudad de Tunja (Bolsa Negra) para su disposición final en relleno sanitario. No los mezcles con el reciclaje.
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/educacion" 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 shadow-md"
            >
              Ver consejos de educación ambiental <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </Link>
          </div>

        </div>
      </section>

      {/* Wave Transition Content -> Footer */}
      <div className="section-wave bg-cream text-secondary-dark">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default Separacion;
