import React, { useState } from 'react';
import './HomeMesero.css';
import TopBarMesero from './TopBarMesero';
import Cuentas from './Cuentas'; 
import Pedidos from './Pedidos';
import LoginForm from '../Login/LoginForm'; 

function HomeMesero() {
  const [activeScreen, setActiveScreen] = useState('cuentas');

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };

  const handleLogout = () => {
    setActiveScreen('salir');
  };

  return (
    <div className="home-mesero">
      {activeScreen !== 'salir' && (
        <TopBarMesero onScreenChange={handleScreenChange} onLogout={handleLogout} />
      )}
      <div className="content">
        {activeScreen === 'cuentas' && <Cuentas />}
        {activeScreen === 'salir' && <LoginForm />}
      </div>
    </div>
  );
}

export default HomeMesero;
