// RegisterForm.jsx
import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

function RegisterForm({ onShowLoginForm }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tipos-usuarios')
      .then(response => response.json())
      .then(data => setUserTypes(data))
      .catch(error => console.error('Error fetching user types:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !userType) {
      alert('Por favor, completa todos los campos');
      return;
    }

    console.log('Datos de registro enviados al servidor:', { nombre: username, contrasenia: password, id_tipo_usuario: userType });

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: username, contrasenia: password, id_tipo_usuario: userType }),
    })
    .then(response => {
      if (response.ok) {
        alert('Registro exitoso');
        history.push('/login')
      } else {
        alert('Error en el registro. Por favor, intenta nuevamente más tarde.');
      }
    })
    .catch(error => {
      console.error('Error en el registro:', error);
      alert('Error en el registro. Por favor, intenta nuevamente más tarde.');
    });
  };

  return (
    <div className="container">
      <h1 className='titulo'>Registro de Usuario</h1> {/* Título del formulario */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Nombre:</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Contraseña:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Tipo de usuario:</label>
          <select
            className="input"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Selecciona el tipo de usuario</option>
            {userTypes.map((type) => (
              <option key={type.id_tipo_usuario} value={type.id_tipo_usuario}>
                {type.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">REGISTRO</button>
        <button type="button" onClick={() => history.push('/login')}>CANCELAR</button>

      </form>
    </div>
  );
}

export default RegisterForm;
