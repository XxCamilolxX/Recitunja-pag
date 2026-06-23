import React from 'react';

const PageHero = ({ title, description }) => {
  return (
    <section className="bg-secondary-dark text-white pt-36 pb-20 text-center relative overflow-hidden z-10">
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(96, 223, 120, 0.08) 0%, transparent 60%)' }}
      />
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
        <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
