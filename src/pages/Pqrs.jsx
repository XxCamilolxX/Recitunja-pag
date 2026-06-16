import React, { useState } from 'react';

const Pqrs = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    tipos: {
      peticion: false,
      queja: false,
      reclamo: false,
      felicitaciones: false,
      sugerencias: false
    }
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      tipos: {
        ...formData.tipos,
        [value]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that at least one request type is selected
    const selectedTypes = Object.values(formData.tipos).some(val => val);
    if (!selectedTypes) {
      alert("Por favor, selecciona al menos un Tipo de solicitud.");
      return;
    }
    
    // Process form (simulate API request)
    console.log("Formulario PQRS Enviado:", formData);
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">PQRS</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Peticiones, Quejas, Reclamos y Sugerencias — Tu voz es importante para nosotros.
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> Content */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Form Section */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[700px] mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200/50 shadow-xl">
            
            {submitted ? (
              /* Success card */
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3 className="text-2xl font-extrabold text-secondary-dark mb-3">¡Formulario Enviado!</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                  Muchas gracias por escribirnos, <strong>{formData.nombre}</strong>. Tu requerimiento ha sido registrado con éxito. Nos pondremos en contacto contigo a la brevedad a través de tu correo <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nombre: '',
                      email: '',
                      asunto: '',
                      mensaje: '',
                      tipos: { peticion: false, queja: false, reclamo: false, felicitaciones: false, sugerencias: false }
                    });
                  }}
                  className="px-6 py-2.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              /* Actual form */
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
                  <span className="w-6 h-[2px] bg-primary"></span>
                  Formulario PQRS
                </div>
                <h2 className="text-2xl font-extrabold text-secondary-dark mb-2">Peticiones, Quejas y Reclamos</h2>
                <p className="text-gray-500 text-xs md:text-sm mb-8">
                  Completa los siguientes campos y nuestro equipo dará respuesta en un plazo máximo de 15 días hábiles.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pqrs-nombre" className="font-semibold text-xs md:text-sm text-gray-700">Nombre Completo *</label>
                    <input 
                      type="text" 
                      id="pqrs-nombre" 
                      name="nombre" 
                      required 
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre y apellidos"
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pqrs-email" className="font-semibold text-xs md:text-sm text-gray-700">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      id="pqrs-email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="correo@ejemplo.com"
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pqrs-asunto" className="font-semibold text-xs md:text-sm text-gray-700">Asunto</label>
                    <input 
                      type="text" 
                      id="pqrs-asunto" 
                      name="asunto" 
                      value={formData.asunto}
                      onChange={handleInputChange}
                      placeholder="Tema central de tu solicitud"
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs md:text-sm text-gray-700">Tipo de solicitud * (Puedes seleccionar varios)</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.keys(formData.tipos).map((type) => (
                        <label 
                          key={type}
                          className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                            formData.tipos[type] 
                              ? 'border-primary bg-primary/10 text-primary-dark shadow-sm' 
                              : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            name="tipo" 
                            value={type}
                            checked={formData.tipos[type]}
                            onChange={handleCheckboxChange}
                            className="accent-primary w-4 h-4 hidden"
                          />
                          <span>
                            {type === 'peticion' ? 'Petición' : 
                             type === 'queja' ? 'Queja' : 
                             type === 'reclamo' ? 'Reclamo' : 
                             type === 'felicitaciones' ? 'Felicitaciones' : 'Sugerencias'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pqrs-mensaje" className="font-semibold text-xs md:text-sm text-gray-700">Mensaje / Detalle de la Solicitud</label>
                    <textarea 
                      id="pqrs-mensaje" 
                      name="mensaje" 
                      rows="4" 
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      placeholder="Describe de manera detallada los hechos..."
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none bg-white"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 mt-2 shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    <i className="fa-solid fa-paper-plane mr-2"></i> Enviar Solicitud
                  </button>
                </form>
              </div>
            )}

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

export default Pqrs;
