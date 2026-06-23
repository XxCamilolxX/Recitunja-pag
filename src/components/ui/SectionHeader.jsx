import React from 'react';

const SectionHeader = ({ eyebrow, title, children, className = 'text-center max-w-2xl mx-auto mb-12' }) => {
  return (
    <div className={className}>
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
        <span className="w-6 h-[2px] bg-primary"></span>
        {eyebrow}
      </div>
      <h2 className="text-3xl font-extrabold text-secondary-dark mb-4">{title}</h2>
      {children && <p className="text-gray-500 text-sm">{children}</p>}
    </div>
  );
};

export default SectionHeader;
