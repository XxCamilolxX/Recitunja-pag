import React from 'react';

const LaEmpresa = () => {
  const valores = [
    {
      title: "Solidaridad",
      desc: "Apoyo y adhesión circunstancial a una causa o al interés de otros, siendo la razón de ser de nuestra Asociación tanto con los asociados como con los usuarios.",
      icon: "fa-hands-holding-circle"
    },
    {
      title: "Generar Confianza en el Cambio",
      desc: "El liderazgo en el proceso de aprovechamiento genera confianza, cambio y colaboración para lograr las metas del Plan de Fortalecimiento.",
      icon: "fa-handshake"
    },
    {
      title: "Compromiso",
      desc: "Vamos más allá de cumplir con una obligación; ponemos en juego todas nuestras capacidades para honrar aquello que nos ha sido confiado.",
      icon: "fa-heart"
    },
    {
      title: "Trabajo en Equipo",
      desc: "Acción coordinada individual y colectiva que, al conseguir objetivos compartidos, robustece la cohesión del equipo de trabajo.",
      icon: "fa-people-group"
    },
    {
      title: "Respeto",
      desc: "Reconocer, valorar, apreciar las cualidades de los seres humanos y sus derechos, promoviendo la equidad de género en nuestra labor.",
      icon: "fa-scale-balanced"
    },
    {
      title: "Transparencia y Honestidad",
      desc: "Garantizamos confianza, seguridad y respaldo en cada uno de nuestros procesos. En una palabra: integridad.",
      icon: "fa-shield-halved"
    }
  ];

  const teamImages = [
    { url: "http://www.recitunja.com/wp-content/uploads/2017/03/IMG_6576-bna3.png", alt: "Equipo ReciTunja formal" },
    { url: "http://www.recitunja.com/wp-content/uploads/2017/03/WhatsApp-Image-2018-12-19-at-5.10.10-PM.jpeg", alt: "Actividades de recolección selectiva" },
    { url: "http://www.recitunja.com/wp-content/uploads/2017/03/WhatsApp-Image-2018-12-19-at-5.11.15-PM.jpeg", alt: "Operación en bodega" },
    { url: "http://www.recitunja.com/wp-content/uploads/2017/03/WhatsApp-Image-2018-12-19-at-5.11.51-PM.jpeg", alt: "Capacitaciones comunitarias" }
  ];

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">La Empresa</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Conoce nuestra historia, nuestros valores y el equipo humano que hace posible la transformación ambiental en Tunja.
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> History */}
      <div className="section-wave bg-secondary-dark text-white">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Reseña Histórica */}
      <section className="bg-white py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 max-h-[380px]">
            <img 
              src="http://www.recitunja.com/wp-content/uploads/2017/03/reseña-1.jpg" 
              alt="Campaña Ruta Selectiva" 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/_MG_6892_1.jpg"; // Local fallback if offline
              }}
            />
          </div>

          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-4">
              <span className="w-6 h-[2px] bg-primary"></span>
              Nuestra Trayectoria
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-6">Reseña Histórica</h2>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed flex flex-col gap-4">
              <p>
                Constituida legalmente el <strong>7 de agosto de 2009</strong> y conformada inicialmente por 19 recicladores de oficio, de los cuales el 80% son mujeres cabeza de familia. Nuestros asociados corresponden a sectores vulnerables (estratos 1 y 2 de Sisbén) con el anhelo conjunto de dignificar su labor.
              </p>
              <p>
                Nuestro principal objetivo es mejorar la calidad de vida de los recicladores y de la comunidad mediante la gestión integral y el aprovechamiento adecuado de los residuos sólidos.
              </p>
              <p>
                En la actualidad, <strong>ReciTunja</strong> opera activamente la implementación de rutas selectivas domiciliarias en los diferentes sectores de la ciudad, al igual que planes de reciclaje empresarial e institucional a través de capacitación a la comunidad y recolección selectiva en la fuente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Transition History -> Values */}
      <div className="section-wave bg-white text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Valores Corporativos */}
      <section className="bg-cream py-20 relative z-10 text-center">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Nuestros Principios
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">Valores Corporativos</h2>
            <p className="text-gray-500 text-sm">
              Nuestros valores se analizan constantemente al interior de la Asociación para garantizar que nuestros usuarios, clientes y asociados sean siempre lo más importante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((val, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30 transition-all duration-300 text-left relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-primary-dark"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg mb-4">
                  <i className={`fa-solid ${val.icon}`}></i>
                </div>
                <h4 className="text-lg font-bold text-secondary-dark mb-2">{val.title}</h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Wave Transition Values -> Team */}
      <div className="section-wave bg-cream text-white">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Nuestro Equipo Gallery */}
      <section className="bg-white py-20 relative z-10 text-center">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Nuestro Equipo
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">La Labor Diaria</h2>
            <p className="text-gray-500 text-sm">
              Contamos con un valioso equipo de recicladores comprometidos con el manejo integral de los residuos sólidos aprovechables y la conservación ambiental de Tunja.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamImages.map((img, i) => (
              <div 
                key={i} 
                className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer aspect-square bg-gray-100"
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // fallbacks from our local copied list
                    const fallbackPhotos = [
                      "/_MG_6831_1.jpg",
                      "/_MG_6852_1.jpg",
                      "/_MG_6872_1.jpg",
                      "/_MG_6921_1 Modificado.jpg"
                    ];
                    e.target.src = fallbackPhotos[i % fallbackPhotos.length];
                  }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white bg-secondary-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-left">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Wave Transition Team -> Footer */}
      <div className="section-wave bg-white text-secondary-dark">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default LaEmpresa;
