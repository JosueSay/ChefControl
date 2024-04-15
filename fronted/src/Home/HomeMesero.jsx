import React, { useState, useEffect } from 'react';
import './HomeMesero.css';
import TopBarMesero from './TopBarMesero';
import Cuentas from './Cuentas'; 
import LoginForm from '../Login/LoginForm'; 
import { useLocation, useHistory } from 'react-router-dom';

function HomeMesero() {
  const [activeScreen, setActiveScreen] = useState('cuentas');
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userIdFromURL = searchParams.get('userId');
    setUserId(userIdFromURL);
    console.log("UserID from URL:", userIdFromURL);
  }, [location.search]);

  useEffect(() => {
    if (activeScreen === 'salir') {
      history.push('/login');
    }
  }, [activeScreen, history]);

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
        {activeScreen === 'cuentas' && <Cuentas userId={userId} />}
        {activeScreen === 'salir' && <LoginForm />}
      </div>
    </div>
  );
}

export default HomeMesero;
