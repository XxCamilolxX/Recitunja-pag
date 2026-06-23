import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import WaveDivider from '../components/ui/WaveDivider';
import InfoImage from '../components/ui/InfoImage';

const Educacion = () => {
  return (
    <div className="w-full">
      <PageHero
        title="Educacion Ambiental"
        description="Pequenos habitos diarios que protegen toda la ruta del reciclaje en Tunja."
      />
      <WaveDivider />

      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Consejos Practicos" title="Como reciclar correctamente?" className="text-center max-w-2xl mx-auto mb-16">
            Sigue estos consejos para que los materiales que entregas a los Verdecitos de ReciTunja lleguen en las mejores condiciones y puedan ser aprovechados.
          </SectionHeader>

          <div className="max-w-4xl mx-auto grid gap-8">
            <InfoImage src="/separando-paso-a-paso.png" alt="Separando paso a paso - Educacion ambiental" />
            <InfoImage src="/volante-caracterizacion.jpg" alt="Volante de caracterizacion ReciTunja" />
          </div>

          <div className="text-center mt-16">
            <Link
              to="/separacion"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 shadow-md"
            >
              Ver que materiales aceptamos <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider from="bg-cream" to="text-secondary-dark" variant="dip" />
    </div>
  );
};

export default Educacion;
