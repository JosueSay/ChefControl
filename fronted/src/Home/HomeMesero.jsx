// HomeMesero.jsx
import React, { useState } from 'react';
import './HomeMesero.css';
import TopBarMesero from './TopBarMesero';
import Cuentas from './Cuentas'; 
import Pedidos from './Pedidos';

function HomeMesero() {
  const [activeScreen, setActiveScreen] = useState('cuentas');

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div className="home-mesero">
      <TopBarMesero onScreenChange={handleScreenChange} />
      <div className="content">
        {activeScreen === 'cuentas' && <Cuentas />} {/* Ahora mostrará OrderComidas por defecto */}
        {activeScreen === 'pedidos' && <Pedidos />} {/* Se mostrará OrderBebida si activeScreen es 'bebidas' */}
      </div>
    </div>
  );
}

export default HomeMesero;
