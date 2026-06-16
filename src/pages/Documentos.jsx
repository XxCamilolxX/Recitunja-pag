import React from 'react';

const Documentos = () => {
  const docs = [
    {
      title: "Concepto de Legalidad",
      desc: "Concepto oficial de legalidad emitido por la CRA.",
      url: "http://www.recitunja.com/wp-content/uploads/2017/03/Concepto-legalidad-CRA.pdf"
    },
    {
      title: "Contrato de Condiciones Uniformes 2022",
      desc: "Condiciones de la prestación del servicio público de aprovechamiento.",
      url: "http://www.recitunja.com/wp-content/uploads/2022/05/1.CONTRATO-DE-CONDICIONES-UNIFORMES-RECITUNJA-2022.pdf"
    },
    {
      title: "Rechazos y Toneladas Efectivamente Aprovechadas 2024",
      desc: "Informe detallado de toneladas aprovechadas y tasa de rechazo.",
      url: "http://www.recitunja.com/wp-content/uploads/2025/02/RECHAZOS-Y-TONELADAS-EFECTIVAMENTE-APROVECHADAS-2024.pdf"
    },
    {
      title: "Formato 5245 — Régimen Especial Tributario 2023",
      desc: "Actualización oficial del régimen tributario especial ante la DIAN.",
      url: "http://www.recitunja.com/wp-content/uploads/2023/06/FORMATO-5245-ACTUALIZACION-REGIMEN-TRIBUTARIO-ESPECIAL-2023.pdf"
    },
    {
      title: "Formato 5245 — Régimen Especial Tributario 2024",
      desc: "Actualización oficial ante la DIAN para el año gravable 2024.",
      url: "http://www.recitunja.com/wp-content/uploads/2024/07/FORMATO-5245-2024.pdf"
    },
    {
      title: "Formato 5245 — Régimen Especial Tributario 2025",
      desc: "Actualización oficial de régimen tributario especial DIAN para 2025.",
      url: "http://www.recitunja.com/wp-content/uploads/2025/07/52451002619431.pdf"
    }
  ];

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Documentos Legales</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Transparencia y cumplimiento normativo — accede a nuestra documentación oficial.
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> Content */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Documents List */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[800px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Documentación Oficial
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">Archivos Disponibles</h2>
            <p className="text-gray-500 text-sm">
              Haz clic en cualquier documento para visualizarlo o descargarlo directamente.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {docs.map((doc, idx) => (
              <a 
                key={idx}
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm flex items-center gap-5 hover:border-primary hover:-translate-x-1.5 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div className="flex-grow">
                  <h4 className="text-base md:text-lg font-bold text-secondary-dark mb-1 leading-tight">{doc.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">{doc.desc}</p>
                </div>
                <div className="text-primary hover:text-primary-dark transition-colors shrink-0">
                  <i className="fa-solid fa-arrow-up-right-from-square text-base"></i>
                </div>
              </a>
            ))}
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

export default Documentos;
