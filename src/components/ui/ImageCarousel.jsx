import React, { useState, useRef, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = images.length;

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    goTo((currentIndex - 1 + total) % total);
  };

  const handleNext = () => {
    goTo((currentIndex + 1) % total);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="flex items-center gap-3 md:gap-5 w-full">
      {/* Left Arrow - OUTSIDE the image */}
      {total > 1 && (
        <button
          onClick={handlePrev}
          className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-secondary-dark flex items-center justify-center shadow-lg border border-gray-200/50 hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="Imagen anterior"
        >
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </button>
      )}

      {/* Image container */}
      <div className="relative flex-1 overflow-hidden rounded-3xl shadow-lg bg-white min-w-0">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Counter Badge */}
        <div className="absolute top-4 right-4 bg-secondary-dark/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-20">
          {currentIndex + 1} / {total}
        </div>
      </div>

      {/* Right Arrow - OUTSIDE the image */}
      {total > 1 && (
        <button
          onClick={handleNext}
          className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-secondary-dark flex items-center justify-center shadow-lg border border-gray-200/50 hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="Siguiente imagen"
        >
          <i className="fa-solid fa-chevron-right text-lg"></i>
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
