import React, { useState } from 'react';
import './HomeChef.css';

import TopBarChef from './TopBarChef';
import OrderComidas from './OrderComidas'; 
import OrderBebida from './OrderBebidas';
import LoginForm from '../Login/LoginForm';

function HomeChef() {
  const [activeScreen, setActiveScreen] = useState('comidas');

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };

  const handleLogout = () => {
    setActiveScreen('salir');
  };

  return (
    <div className="home-chef">
      {activeScreen !== 'salir' && (
        <TopBarChef onScreenChange={handleScreenChange} onLogout={handleLogout} />
      )}
      <div className="content">
        {activeScreen === 'comidas' && <OrderComidas />}
        {activeScreen === 'bebidas' && <OrderBebida />}
        {activeScreen === 'salir' && <LoginForm />}
      </div>
    </div>
  );
}

export default HomeChef;
