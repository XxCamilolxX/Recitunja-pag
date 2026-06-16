import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsappWidget from './WhatsappWidget';

const AppLayout = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Association Background Image - Fixed backdrop texture */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/_MG_6921_1 Modificado.jpg')",
          backgroundBlendMode: 'overlay'
        }}
        aria-hidden="true"
      />
      
      {/* Secondary overlay for blending */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent to-cream/30"
        aria-hidden="true"
      />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow z-10 relative">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <WhatsappWidget />
    </div>
  );
};

export default AppLayout;
