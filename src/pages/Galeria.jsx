import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { GALLERY_SLIDES, GALLERY_VIDEOS } from '../constants/data';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import WaveDivider from '../components/ui/WaveDivider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Galeria = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return (
    <div className="w-full">
      <PageHero
        title="Galería"
        description="Momentos que capturan nuestra pasión por el reciclaje y la transformación ambiental en Tunja."
      />
      <WaveDivider />

      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Nuestro Trabajo" title="Momentos en imágenes">
            Cada fotografía es el testimonio del compromiso de nuestro equipo con el reciclaje y el medio ambiente en la ciudad de Tunja.
          </SectionHeader>

          <div className="w-full relative py-6">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              speed={prefersReducedMotion ? 0 : 5200}
              autoplay={prefersReducedMotion ? false : {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
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
              {GALLERY_SLIDES.map((slide) => (
                <SwiperSlide key={slide.src} className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-secondary-dark relative">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-[320px] md:h-[400px] object-cover block"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <h3 className="text-lg font-bold text-primary mb-1">{slide.title}</h3>
                    <p className="text-xs text-white/80 leading-relaxed">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}

              <div className="swiper-pagination gallery-pagination"></div>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Videos" title="Conócenos en video">
            Mira de cerca nuestra labor diaria y el impacto positivo del reciclaje en Tunja.
          </SectionHeader>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {GALLERY_VIDEOS.map((video) => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 bg-white">
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

      <WaveDivider from="bg-cream" to="text-secondary-dark" variant="dip" />
    </div>
  );
};

export default Galeria;
