import bcrypt from 'bcrypt';
import client from '../connections/conn.js'; // Ajusta la ruta según tu estructura de archivos

// Obtener información de inicio de sesión por PI y tipo de usuario
export async function getUserLoginInfo(id_tipo_usuario, nombre) {
  try {
    // Consultar la base de datos para obtener el usuario
    const query = 'SELECT * FROM Usuarios WHERE id_tipo_usuario = $1 AND nombre = $2';
    const result = await client.query(query, [id_tipo_usuario, nombre]);

    // Verificar si se encontró el usuario
    if (result.rows.length === 0) {
      return null; // Devuelve null si el usuario no se encontró
    }

    // Devuelve el usuario encontrado
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user login info:', error);
    throw error;
  }
}


// Función para registrar usuarios
export async function registerUser(id_tipo_usuario, nombre, contrasenia) {
  try {
    // Encriptar la contraseña antes de insertarla en la base de datos
    const hashedPassword = await bcrypt.hash(contrasenia, 10); // 10 es el número de rondas de encriptación
    
    // Insertar el nuevo usuario en la base de datos
    const query = 'INSERT INTO Usuarios (id_tipo_usuario, nombre, contrasenia) VALUES ($1, $2, $3)';
    await client.query(query, [id_tipo_usuario, nombre, hashedPassword]);
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    throw error;
  }
}