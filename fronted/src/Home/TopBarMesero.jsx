// TopBarChef.jsx
import React from 'react';
import './TopBarChef.css';

function TopBarMesero({ onScreenChange }) {
  return (
    <div className="top-bar">
      <button onClick={() => onScreenChange('cuentas')}>CUENTAS</button>
      <button onClick={() => onScreenChange('pedidos')}>PEDIDOS</button>
      
    </div>
  );
}

export default TopBarMesero;
