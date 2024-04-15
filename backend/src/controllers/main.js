import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { getUserLoginInfo } from '../database/auth.js';
import { registerUser } from '../database/auth.js';
import { getTiposUsuarios } from '../database/tiposUsuarios.js';
import { getPedidosComidas } from '../database/pedidosChef.js';
import { marcarPedidoComoFinalizado } from '../database/pedidosChef.js';
import { getPedidosBebidas } from '../database/pedidosChef.js';


const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(cors());

// Función para registrar los logs
function logRequest(type, endpoint, result, requestData) {
  const log = `${type} - ${new Date().toISOString()} - Endpoint: ${endpoint} - Resultado: ${result} - Datos: ${JSON.stringify(requestData)}\n`;
  fs.appendFile('logs.txt', log, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de logs:', err);
    }
  });
}

// Endpoint para marcar un pedido como finalizado
app.post('/marcarPedidoFinalizado', async (req, res) => {
  try {
    const { idPedido } = req.body; // Obtener el ID del pedido desde el cuerpo de la solicitud
    await marcarPedidoComoFinalizado(idPedido); // Llamar a la función para marcar el pedido como finalizado
    logRequest('POST', '/marcarPedidoFinalizado', 'Éxito', req.body); // Registrar el evento en los logs
    res.status(200).json({ message: `Pedido con ID ${idPedido} marcado como finalizado.` });
  } catch (error) {
    console.error('Error al marcar el pedido como finalizado:', error);
    logRequest('POST', '/marcarPedidoFinalizado', 'Error', req.body); // Registrar el evento en los logs
    res.status(500).json({ error: 'Error al marcar el pedido como finalizado.' });
  }
});

// Endpoint para obtener los pedidos de tipo "Cuenta"
app.get('/pedidos-comidas', async (req, res) => {
  try {
    const pedidosCuenta = await getPedidosComidas();
    return res.status(200).json(pedidosCuenta);
  } catch (error) {
    console.error('Error en el endpoint /pedidos-comidas:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para obtener los pedidos de bebidas
app.get('/pedidos-bebidas', async (req, res) => {
  try {
    const pedidosBebidas = await getPedidosBebidas();
    return res.status(200).json(pedidosBebidas);
  } catch (error) {
    console.error('Error en el endpoint /pedidos-bebidas:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para obtener el listado de tipos de usuarios
app.get('/tipos-usuarios', async (req, res) => {
  try {
    const tiposUsuarios = await getTiposUsuarios();
    logRequest('GET', '/tipos-usuarios', 'Éxito', null);
    return res.status(200).json(tiposUsuarios);
  } catch (error) {
    console.error('Error al obtener los tipos de usuarios:', error);
    logRequest('GET', '/tipos-usuarios', 'Error', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para el inicio de sesión
app.post('/login', async (req, res) => {
  console.log('Datos recibidos del cliente:', req.body); // Agrega este console.log
  
  const { id_tipo_usuario, contrasenia, nombre } = req.body;
  const requestData = { id_tipo_usuario, nombre }; // Guardar los datos enviados

  try {
    // Verificar si los campos requeridos están presentes
    if (!id_tipo_usuario || !contrasenia || !nombre) {
      logRequest('POST', '/login', 'Error', 'Faltan parámetros');
      return res.status(400).json({ error: 'Faltan parámetros' });
    }

    // Consulta la base de datos para obtener el usuario
    const usuario = await getUserLoginInfo(id_tipo_usuario, nombre);

    // Verifica si se encontró el usuario
    if (!usuario) {
      logRequest('POST', '/login', 'Error', 'Usuario no encontrado');
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verifica la contraseña almacenada en el usuario encontrado
    const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!contraseniaValida) {
      logRequest('POST', '/login', 'Error', 'Contraseña incorrecta');
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si la contraseña es válida, devolver un mensaje de éxito
    logRequest('POST', '/login', 'Éxito', requestData);
    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    logRequest('POST', '/login', 'Error', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Endpoint para el registro de usuarios
app.post('/register', async (req, res) => {
  const { id_tipo_usuario, nombre, contrasenia } = req.body;
  const requestData = { id_tipo_usuario, nombre }; // Guardar los datos enviados

  try {
    // Verificar si los campos requeridos están presentes
    if (!id_tipo_usuario || !nombre || !contrasenia) {
      logRequest('POST', '/register', 'Error', 'Faltan parámetros');
      return res.status(400).json({ error: 'Faltan parámetros' });
    }

    // Realizar el registro del usuario en la base de datos
    await registerUser(id_tipo_usuario, nombre, contrasenia);

    logRequest('POST', '/register', 'Éxito', requestData);
    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    logRequest('POST', '/register', 'Error', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
