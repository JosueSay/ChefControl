// HomeChef.jsx
import React, { useState } from 'react';
import './HomeChef.css';

import TopBarChef from './TopBarChef';
import OrderComidas from './OrderComidas'; 
import OrderBebida from './OrderBebidas';

function HomeChef() {
  const [activeScreen, setActiveScreen] = useState('comidas'); // Inicia en 'comidas'

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div className="home-chef">
      <TopBarChef onScreenChange={handleScreenChange} />
      <div className="content">
        {activeScreen === 'comidas' && <OrderComidas />} {/* Ahora mostrará OrderComidas por defecto */}
        {activeScreen === 'bebidas' && <OrderBebida />} {/* Se mostrará OrderBebida si activeScreen es 'bebidas' */}
      </div>
    </div>
  );
}

export default HomeChef;
