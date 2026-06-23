import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import WaveDivider from '../components/ui/WaveDivider';
import InfoImage from '../components/ui/InfoImage';

const Separacion = () => {
  return (
    <div className="w-full">
      <PageHero
        title="Separacion de Residuos"
        description="Que reciben los Verdecitos de ReciTunja y que no hace parte de la ruta selectiva."
      />
      <WaveDivider />

      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Ruta Selectiva" title="?Que materiales reciclamos?" className="text-center max-w-2xl mx-auto mb-16">
            Para que el proceso de reciclaje funcione bien, es importante saber que materiales acepta nuestro equipo. Recuerda: deben estar limpios y secos.
          </SectionHeader>

          <div className="grid gap-8 max-w-4xl mx-auto">
            <InfoImage src="/si-recibimos.png" alt="Si recibimos" />
            <InfoImage src="/no-recibimos.png" alt="No recibimos" />
            <div className="max-w-3xl mx-auto bg-rose-50 border border-rose-100/50 p-5 rounded-2xl text-sm text-center text-rose-800 leading-relaxed italic">
              <strong>Importante:</strong> Los residuos no aprovechables deben depositarse en el servicio de aseo ordinario de la ciudad de Tunja (Bolsa Negra) para su disposicion final en relleno sanitario. No los mezcles con el reciclaje.
            </div>
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
