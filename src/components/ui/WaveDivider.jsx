import React from 'react';

const wavePaths = {
  rise: 'M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z',
  dip: 'M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z',
};

const WaveDivider = ({ from = 'bg-secondary-dark', to = 'text-cream', variant = 'rise' }) => {
  return (
    <div className={`section-wave ${from} ${to}`}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d={wavePaths[variant]} fill="currentColor" />
      </svg>
    </div>
  );
};

export default WaveDivider;
