import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import WaveDivider from '../components/ui/WaveDivider';
import ImageCarousel from '../components/ui/ImageCarousel';

const SEPARACION_IMAGES = [
  { src: '/si-recibimos.png', alt: 'Sí recibimos - Materiales aprovechables' },
  { src: '/no-recibimos.png', alt: 'No recibimos - Materiales no aprovechables' },
];

const Separacion = () => {
  return (
    <div className="w-full">
      <PageHero
        title="Separación de Residuos"
        description="Que reciben los Verdecitos de ReciTunja y que no hace parte de la ruta selectiva."
      />
      <WaveDivider />

      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Ruta Selectiva" title="¿Que materiales reciclamos?" className="text-center max-w-2xl mx-auto mb-16">
            Para que el proceso de reciclaje funcione bien, es importante saber que materiales acepta nuestro equipo. Recuerda: deben estar limpios y secos.
          </SectionHeader>

          <div className="max-w-4xl mx-auto">
            <ImageCarousel images={SEPARACION_IMAGES} />
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <img
              src="/tip h1.png"
              alt="Tips de separación de residuos"
              className="w-full h-auto"
              style={{ transform: 'translateX(-70px)' }} /* ← Cambia 0px: negativo = izquierda, positivo = derecha */
              loading="lazy"
            />
          </div>

          <div className="text-center mt-16">
            <Link
              to="/educacion"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 shadow-md"
            >
              Ver consejos de educacion ambiental <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider from="bg-cream" to="text-secondary-dark" variant="dip" />
    </div>
  );
};

export default Separacion;
