import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Inicio from './pages/Inicio';
import LaEmpresa from './pages/LaEmpresa';
import Galeria from './pages/Galeria';
import Educacion from './pages/Educacion';
import Separacion from './pages/Separacion';
import Documentos from './pages/Documentos';
import Pqrs from './pages/Pqrs';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/la-empresa" element={<LaEmpresa />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/educacion" element={<Educacion />} />
          <Route path="/separacion" element={<Separacion />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/pqrs" element={<Pqrs />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
