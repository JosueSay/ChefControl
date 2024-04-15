import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Cuentas.css';

function Cuentas({ userId }) {
  const [cuentasAbiertas, setCuentasAbiertas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const obtenerCuentasAbiertas = async () => {
      try {
        const response = await fetch('http://localhost:3000/cuentasAbiertas');
        if (!response.ok) {
          throw new Error('No se pudo obtener las cuentas abiertas');
        }
        const data = await response.json();
        setCuentasAbiertas(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerCuentasAbiertas();
  }, []);

  const handleCuentaClick = (id) => {
    history.push(`/cuentas/${id}`);
  };

  const handleAgregarClick = () => {
    if (userId) {
      history.push(`/crearCuenta?userId=${userId}`);
    } else {
      console.error("UserID no está disponible.");
    }
  };

  //console.log("UserID in Cuentas:", userId); 

  return (
    <div className="cuentas">
      <h2 className='titulo-cuentas'>Cuentas Abiertas</h2>
      <ul>
        {cuentasAbiertas.map(cuenta => (
          <button key={cuenta.id_cuenta} onClick={() => handleCuentaClick(cuenta.id_cuenta)}>Cuenta {cuenta.id_cuenta}</button>
        ))}
      </ul>
      <button className="agregar-button" onClick={handleAgregarClick}>AGREGAR</button>
    </div>
  );
}

export default Cuentas;
