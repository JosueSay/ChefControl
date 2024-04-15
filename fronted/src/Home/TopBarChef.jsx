// TopBarChef.jsx
import React from 'react';
import './TopBarChef.css';

function TopBarChef({ onScreenChange }) {
  return (
    <div className="top-bar">
      <button onClick={() => onScreenChange('comidas')}>COMIDAS</button>
      <button onClick={() => onScreenChange('bebidas')}>BEBIDAS</button>
      <button onClick={() => onScreenChange('salir')}>SALIR</button>
      
    </div>
  );
}

export default TopBarChef;
