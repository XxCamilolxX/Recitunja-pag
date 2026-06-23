import React from 'react';

const InfoImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
      loading="lazy"
    />
  );
};

export default InfoImage;
