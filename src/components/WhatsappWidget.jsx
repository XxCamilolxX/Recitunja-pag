import React from 'react';

const WhatsappWidget = () => {
  return (
    <a
      href="https://wa.me/3123365396?text=Hola Asesor En Linea escribo desde la pagina web de Recitunja, necesito asesoria"
      className="fixed bottom-[30px] right-[30px] bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-[1.75rem] shadow-lg z-[1000] transition-all duration-300 hover:scale-110 animate-pulse-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
};

export default WhatsappWidget;
