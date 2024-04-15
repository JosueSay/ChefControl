import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [userTypes, setUserTypes] = useState([]);
  const history = useHistory();

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

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: username, contrasenia: password, id_tipo_usuario: userType }),
    })




    .then(response => {
      if (response.ok) {
        alert('Login exitoso');
        // Encuentra el tipo de usuario en la lista basado en el id seleccionado
        const userTypeDetails = userTypes.find(type => type.id_tipo_usuario === parseInt(userType));
        if (userTypeDetails && userTypeDetails.nombre === 'Chef') {
          history.push('/home-chef');
        } else if(userTypeDetails && userTypeDetails.nombre === 'Mesero'){
          // Obtener el ID del usuario usando el endpoint get
          fetch(`http://localhost:3000/getUserId?id_tipo_usuario=${userType}&nombre=${username}`)
            .then(response => response.json())
            .then(data => {
              // ID del usuario
              const userId = data.id_usuario;
              //console.log(userId);
              history.push(`/home-mesero?userId=${userId}`);
            })
            .catch(error => console.error('Error al obtener el ID del usuario:', error));
        }
      }else {
        alert('Nombre de usuario, contraseña o tipo de usuario incorrectos');
      }
      
    })
    .catch(error => {
      console.error('Error en el login:', error);
      alert('Error en el login. Por favor, intenta nuevamente más tarde.');
    });
  };

  return (
    <div className="container">
      <h1 className='titulo'>Inicio de Sesión</h1> {/* Título del formulario */}
      <form onSubmit={handleSubmit}>
        
        {/* ENTRADA DE INFO*/}
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

        {/* BOTONES LOGIN Y REGISTER*/}
        <button type="submit">LOGIN</button>
        <button type="button" onClick={() => history.push('/register')}>REGISTRO</button>
      </form>
    </div>
  );
}

export default LoginForm;
