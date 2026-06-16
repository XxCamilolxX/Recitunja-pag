import React from 'react';
import { Link } from 'react-router-dom';

const Educacion = () => {
  const tips = [
    {
      emoji: "🧴",
      title: "Enjuaga antes de entregar",
      desc: "Lava las bolsas plásticas de carnes y frascos de lácteos antes de entregárselos a los Verdecitos; una pequeña limpieza marca la diferencia para que no se arruinen en el transporte."
    },
    {
      emoji: "🥚",
      title: "Cubetas de huevo impecables",
      desc: "Las cubetas de huevo deben entregarse limpias, sin rotos ni estar aplastadas para poder ser reutilizadas correctamente en la cadena de empaque local."
    },
    {
      emoji: "🧃",
      title: "Tetra Pack sí es reciclable",
      desc: "Las cajas de leche y jugos son bienvenidas. Enjuágalas rápidamente por dentro, dobla las pestañas para aplanarlas y entrégalas secas."
    },
    {
      emoji: "♻️",
      title: "Separa en casa",
      desc: "Cartón, plástico, vidrio, metal y papel van en una bolsa aparte (preferiblemente de color azul) separada por completo de la basura orgánica u ordinaria."
    },
    {
      emoji: "🌿",
      title: "Un reciclable sucio contamina todos",
      desc: "Limpiar antes de separar es clave. Un solo frasco con grasa o residuos orgánicos puede mojar, pudrir y arruinar toneladas de papel y cartón limpio."
    },
    {
      emoji: "💧",
      title: "Reutiliza el agua de lavado",
      desc: "El agua usada para enjuagar los envases de plástico o vidrio puede ser agua reciclada de la lavadora o el agua con la que enjuagaste los platos. ¡Sé sostenible en todo el proceso!"
    },
    {
      emoji: "📦",
      title: "Aplana las cajas",
      desc: "Desarma y aplana las cajas de cartón. Esto optimiza el espacio de acopio en tu casa y facilita el pesaje y transporte de los recicladores en sus rutas."
    },
    {
      emoji: "🔵",
      title: "Usa la bolsa azul",
      desc: "Deposita todos tus materiales reciclables secos y limpios en la bolsa azul y entrégala a los recuperadores ambientales en el día y horario de la ruta selectiva de tu barrio."
    }
  ];

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Educación Ambiental</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Pequeños hábitos diarios que protegen toda la ruta del reciclaje en Tunja.
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> Content */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Tips content */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Consejos Prácticos
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">¿Cómo reciclar correctamente?</h2>
            <p className="text-gray-500 text-sm">
              Sigue estos consejos para que los materiales que entregas a los Verdecitos de ReciTunja lleguen en las mejores condiciones y puedan ser aprovechados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <span className="text-4xl p-2 bg-cream rounded-xl shrink-0 mt-1">{tip.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-secondary-dark mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/separacion" 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 shadow-md"
            >
              Ver qué materiales aceptamos <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
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

export default Educacion;
