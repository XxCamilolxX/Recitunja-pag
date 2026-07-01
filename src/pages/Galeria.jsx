import React, { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { GALLERY_SLIDES, GALLERY_VIDEOS } from '../constants/data';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import WaveDivider from '../components/ui/WaveDivider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Galeria = () => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const navigateLightbox = useCallback((direction) => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + direction + GALLERY_SLIDES.length) % GALLERY_SLIDES.length,
    }));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox.open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightbox.open, navigateLightbox]);

  return (
    <div className="w-full">
      <PageHero
        title="Galería"
        description="Momentos que capturan nuestra pasión por el reciclaje y la transformación ambiental en Tunja."
      />
      <WaveDivider />

      {/* Image Carousel Section */}
      <section className="bg-cream py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Nuestro Trabajo" title="Momentos en imágenes">
            Cada fotografía es el testimonio del compromiso de nuestro equipo con el reciclaje y el medio ambiente en la ciudad de Tunja.
          </SectionHeader>

          <div className="w-full relative py-6 group/carousel">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              speed={700}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                el: '.gallery-pagination-custom',
              }}
              navigation={{
                nextEl: '.gallery-btn-next',
                prevEl: '.gallery-btn-prev',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              className="gallery-swiper-v2 pb-14"
            >
              {GALLERY_SLIDES.map((slide, idx) => (
                <SwiperSlide key={slide.src}>
                  <div
                    className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-secondary-dark relative cursor-pointer group"
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-[300px] md:h-[380px] object-cover block transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <svg className="w-6 h-6 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                      <h3 className="text-lg font-bold text-primary mb-1">{slide.title}</h3>
                      <p className="text-xs text-white/80 leading-relaxed">{slide.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <button
              className="gallery-btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50 flex items-center justify-center text-secondary-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-2 group-hover/carousel:translate-x-0 disabled:opacity-30"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="gallery-btn-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50 flex items-center justify-center text-secondary-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-2 group-hover/carousel:translate-x-0 disabled:opacity-30"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="gallery-pagination-custom flex justify-center gap-1.5 mt-4"></div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-cream pb-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Videos" title="Conócenos en video">
            Mira de cerca nuestra labor diaria y el impacto positivo del reciclaje en Tunja.
          </SectionHeader>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            {GALLERY_VIDEOS.map((video) => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 bg-white">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {video.type === 'facebook' ? (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1877F2] to-[#0a4da3] flex flex-col items-center justify-center gap-4 group cursor-pointer"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <span className="text-white font-semibold text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        Ver en Facebook
                      </span>
                    </a>
                  ) : (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
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

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 border border-white/20"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/60 text-sm font-medium">
            {lightbox.index + 1} / {GALLERY_SLIDES.length}
          </div>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 border border-white/20"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_SLIDES[lightbox.index].src}
              alt={GALLERY_SLIDES[lightbox.index].title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-bold">{GALLERY_SLIDES[lightbox.index].title}</h3>
              <p className="text-white/60 text-sm mt-1">{GALLERY_SLIDES[lightbox.index].desc}</p>
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 border border-white/20"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Galeria;
