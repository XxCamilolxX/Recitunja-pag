import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Galeria = () => {
  const slides = [
    { src: '/_MG_6829_2.jpg', title: "Equipo ReciTunja", desc: "El corazón y la fuerza laboral de nuestra asociación." },
    { src: '/_MG_6831_1.jpg', title: "Actividades de Reciclaje", desc: "Clasificación meticulosa en nuestra estación de servicios." },
    { src: '/_MG_6848_1.jpg', title: "Jornada de Recolección", desc: "Servicio de reciclaje empresarial certificado." },
    { src: '/_MG_6852_1.jpg', title: "Nuestro Equipo en Acción", desc: "Dignificando y profesionalizando la labor del reciclador." },
    { src: '/_MG_6872_1.jpg', title: "Labores de Clasificación", desc: "Asegurando altos estándares de pureza en materiales." },
    { src: '/_MG_6892_1.jpg', title: "Rutas Selectivas Tunja", desc: "Recorremos los barrios recogiendo tu bolsa azul." },
    { src: '/_MG_6921_1 Modificado.jpg', title: "Equipo Completo ReciTunja", desc: "Una asociación unida por el bienestar social y ambiental." }
  ];

  const videos = [
    { id: 'bzlRK5unP74', title: "ReciTunja en acción", desc: "Conoce nuestro trabajo diario en la ruta selectiva de Tunja." },
    { id: 'IvbAoRYY0pM', title: "Impacto ambiental ReciTunja", desc: "El impacto positivo de nuestra labor en la comunidad tunjana." }
  ];

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0 opacity-10 bg-radial-gradient from-primary via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }} />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Galería</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Momentos que capturan nuestra pasión por el reciclaje y la transformación ambiental en Tunja.
          </p>
        </div>
      </section>

      {/* Wave Transition Hero -> Gallery */}
      <div className="section-wave bg-secondary-dark text-cream">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Gallery Section with Swiper Carousel */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Nuestro Trabajo
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">Momentos en imágenes</h2>
            <p className="text-gray-500 text-sm">
              Cada fotografía es el testimonio del compromiso de nuestro equipo con el reciclaje y el medio ambiente en la ciudad de Tunja.
            </p>
          </div>

          {/* Carousel Slider container */}
          <div className="w-full relative py-6">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1.5,
                slideShadows: false,
              }}
              pagination={{ clickable: true, el: '.swiper-pagination' }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="gallery-swiper pb-16"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-secondary-dark relative">
                  <img 
                    src={slide.src} 
                    alt={slide.title} 
                    className="w-full h-[320px] md:h-[400px] object-cover block"
                    loading="lazy"
                  />
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <h3 className="text-lg font-bold text-primary mb-1">{slide.title}</h3>
                    <p className="text-xs text-white/80 leading-relaxed">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Pagination and Buttons elements */}
              <div className="swiper-pagination !bottom-2"></div>
              <div className="swiper-button-prev !text-black !w-10 !h-10 after:!text-xl bg-white rounded-full hidden md:flex hover:scale-110 transition-all shadow-md border border-gray-200"></div>
              <div className="swiper-button-next !text-black !w-10 !h-10 after:!text-xl bg-white rounded-full hidden md:flex hover:scale-110 transition-all shadow-md border border-gray-200"></div>
            </Swiper>
          </div>

        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-cream pb-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              Videos
            </div>
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">Conócenos en video</h2>
            <p className="text-gray-500 text-sm">
              Mira de cerca nuestra labor diaria y el impacto positivo del reciclaje en Tunja.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 bg-white">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-secondary-dark mb-1">{video.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Wave Transition Gallery -> Footer */}
      <div className="section-wave bg-cream text-secondary-dark">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default Galeria;
