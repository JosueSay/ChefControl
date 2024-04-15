import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrearCuenta({ userId }) {
  console.log("UserID en CrearCuenta:", userId); // Agregar este console.log

  // Estado para almacenar las mesas disponibles
  const [mesasDisponibles, setMesasDisponibles] = useState([]);

  // Estado para almacenar los grupos de mesas
  const [gruposMesas, setGruposMesas] = useState([
    { id: 1, mesas: [], mesaSeleccionadaId: null, mesaRepresentante: '' }
  ]);

  // Función para manejar el cambio de una mesa seleccionada en un grupo
  const handleMesaChange = (groupId, event) => {
    const nuevaSeleccionId = parseInt(event.target.value);
    setGruposMesas(gruposMesas.map(grupo => {
      if (grupo.id === groupId) {
        return { ...grupo, mesaSeleccionadaId: nuevaSeleccionId };
      }
      return grupo;
    }));
  };

  // Función para agregar un nuevo grupo de mesas
  const agregarGrupoMesas = () => {
    const nuevoGrupoId = gruposMesas.length + 1;
    const nuevoGrupo = { id: nuevoGrupoId, mesas: [], mesaSeleccionadaId: null, mesaRepresentante: '' };
    setGruposMesas([...gruposMesas, nuevoGrupo]);
  };

  // Función para quitar el último grupo de mesas
  const quitarUltimoGrupoMesas = () => {
    if (gruposMesas.length > 1) {
      setGruposMesas(gruposMesas.slice(0, -1));
    }
  };

  // Función para establecer la mesa representante de un grupo
  const establecerMesaRepresentante = (grupoId, mesaSeleccionada) => {
    setGruposMesas(gruposMesas.map(grupo => {
      if (grupo.id === grupoId) {
        return { ...grupo, mesaRepresentante: mesaSeleccionada };
      }
      return grupo;
    }));
  };

  // Función para obtener las mesas disponibles desde el servidor
  const obtenerMesasDisponibles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/mesas/disponibles');
      setMesasDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener las mesas disponibles:', error);
    }
  };

  // Obtener las mesas disponibles al cargar el componente
  useEffect(() => {
    obtenerMesasDisponibles();
  }, []);

  return (
    <div>
      <h2>Bienvenido a Crear una Cuenta</h2>
      <p>Ingresa la cantidad de personas por atender:</p>
      <select style={{ width: 'calc(50% - 5px)', marginRight: '5px' }}>
        {/* Opciones para la cantidad de personas */}
        {[...Array(14).keys()].map(num => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>
      <p>Mesas:</p>
      {/* Mostrar cada grupo de mesas con su selector */}
      {gruposMesas.map(grupo => (
        <div key={grupo.id}>
          <select value={grupo.mesaSeleccionadaId || ''} onChange={(e) => { handleMesaChange(grupo.id, e); establecerMesaRepresentante(grupo.id, e.target.value); }} style={{ width: 'calc(50% - 5px)', marginRight: '5px' }}>
            {/* Opciones para las mesas disponibles */}
            <option value="">Seleccione una mesa</option>
            {mesasDisponibles.map(mesa => (
              <option key={mesa.id_mesa} value={mesa.id_mesa}>
                {`Mesa ${mesa.id_mesa} - Área ${mesa.id_area} - Capacidad ${mesa.capacidad}`}
              </option>
            ))}
          </select>
        </div>
      ))}
      {/* Botón para agregar otro grupo de mesas */}
      <button onClick={agregarGrupoMesas} style={{ width: 'calc(50% - 5px)', marginRight: '5px' }}>Agregar  Mesa</button>
      {/* Botón para quitar el último grupo de mesas */}
      <button onClick={quitarUltimoGrupoMesas} style={{ width: 'calc(50% - 5px)', marginRight: '5px' }}>Quitar Mesa</button>
      <p>Mesero responsable: {userId}</p>
    </div>
  );
}

export default CrearCuenta;
