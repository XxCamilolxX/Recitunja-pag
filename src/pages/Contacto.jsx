import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje de Contacto Enviado:", formData);
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Comunícate con Nosotros</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Comunícate con nosotros y nos pondremos en contacto contigo tan pronto como nos sea posible. ¡Esperamos tener noticias tuyas!
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> Content */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Contact Content Grid */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Info cards and Map */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-1">
                <span className="w-6 h-[2px] bg-primary"></span>
                Información de Contacto
              </div>
              <h2 className="text-3xl font-extrabold text-secondary-dark mb-2">Contáctanos</h2>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Estamos aquí para ayudarte. Puedes escribirnos, llamarnos o visitarnos directamente en nuestra sede administrativa.
              </p>

              {/* Email Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm flex gap-4 items-start hover:-translate-x-1 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-secondary-dark mb-1 text-sm md:text-base">Correo Electrónico</h4>
                  <p className="text-primary text-sm font-semibold hover:underline">
                    <a href="mailto:recitunja@gmail.com">recitunja@gmail.com</a>
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm flex gap-4 items-start hover:-translate-x-1 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-secondary-dark mb-1 text-sm md:text-base">Teléfono</h4>
                  <p className="text-primary text-sm font-semibold hover:underline">
                    <a href="tel:3123365396">312 336 5396</a>
                  </p>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-sm flex gap-4 items-start hover:-translate-x-1 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 className="font-bold text-secondary-dark mb-1 text-sm md:text-base">Dirección</h4>
                  <p className="text-gray-500 text-sm font-medium">
                    Cr 13 No 3 - 171 SUR Tunja, Boyacá, Colombia
                  </p>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md h-60 mt-2">
                <iframe 
                  src="https://www.google.com/maps?q=Cr+13+No+3+-+171+SUR+Tunja+Boyac%C3%A1+Colombia&output=embed" 
                  className="w-full h-full border-0 block" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación ReciTunja"
                />
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200/50 shadow-xl self-start">
              {submitted ? (
                /* Success Card */
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <h3 className="text-2xl font-extrabold text-secondary-dark mb-3">¡Mensaje Enviado!</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Gracias por ponerte en contacto con nosotros, <strong>{formData.nombre}</strong>. Hemos recibido tu mensaje de forma exitosa. Nos comunicaremos contigo muy pronto.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ nombre: '', email: '', mensaje: '' });
                    }}
                    className="px-6 py-2.5 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
                    <span className="w-6 h-[2px] bg-primary"></span>
                    Escríbenos
                  </div>
                  <h2 className="text-2xl font-extrabold text-secondary-dark mb-6">Formulario de Contacto</h2>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-nombre" className="font-semibold text-xs md:text-sm text-gray-700">Nombre Completo *</label>
                      <input 
                        type="text" 
                        id="contact-nombre" 
                        name="nombre" 
                        required 
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="font-semibold text-xs md:text-sm text-gray-700">Correo Electrónico *</label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="correo@ejemplo.com"
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-mensaje" className="font-semibold text-xs md:text-sm text-gray-700">Mensaje *</label>
                      <textarea 
                        id="contact-mensaje" 
                        name="mensaje" 
                        required 
                        rows="5"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="¿En qué podemos ayudarte?"
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none bg-white"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 rounded-full font-bold text-sm bg-primary text-secondary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 mt-2 shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                      <i className="fa-solid fa-paper-plane mr-2"></i> Enviar Mensaje
                    </button>
                  </form>
                </div>
              )}
            </div>

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

export default Contacto;
