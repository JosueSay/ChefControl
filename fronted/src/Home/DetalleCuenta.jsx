// Componente DetalleCuenta.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './DetalleCuenta.css';

function DetalleCuenta() {
  const { idCuenta } = useParams();
  const [cuenta, setCuenta] = useState(null);
  const history = useHistory(); // Obteniendo el objeto history

  useEffect(() => {
    // Función para obtener la información de la cuenta específica del servidor
    const obtenerDetalleCuenta = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cuentas/${idCuenta}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de la cuenta');
        }
        const data = await response.json();
        setCuenta(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDetalleCuenta();
  }, [idCuenta]);

  // Función para formatear la fecha de apertura
  const obtenerFechaAperturaFormateada = () => {
    if (cuenta && cuenta.fecha_hora_apertura) {
      const fechaApertura = new Date(cuenta.fecha_hora_apertura);
      return fechaApertura.toISOString().split('T')[0];
    }
    return '';
  };

  // Función para manejar el clic en el botón REGRESAR
  const handleRegresar = () => {
    history.goBack(); // Regresando a la página anterior
  };

  return (
    <div className="detalle-cuenta">
      <h2 className='titulo-detalle-cuenta'>Detalle de la cuenta {idCuenta}</h2>
      {/* Renderizar la información de la cuenta */}
      {cuenta && (
        <div>
          <p>Apertura: {obtenerFechaAperturaFormateada()}</p>
          <p>Mesa: {cuenta.id_cuenta}</p>
          <p>Mesero: {cuenta.nombre}</p>
          <p>Total: Q. {cuenta.total_cuenta}</p>
          {/* Otras propiedades de la cuenta */}
        </div>
      )}
      {/* Botón CERRAR */}
      <button className="boton-detalle" onClick={handleRegresar}>REGRESAR</button>
      <button className="quitar-cuenta">CERRAR CUENTA</button>
    </div>
  );
}

export default DetalleCuenta;
