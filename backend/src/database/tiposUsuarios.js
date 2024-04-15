import client from '../connections/conn.js';

// Función para obtener el listado de tipos de usuarios
export async function getTiposUsuarios() {
  try {
    // Consultar la base de datos para obtener los tipos de usuarios
    const query = 'SELECT * FROM TiposUsuarios';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los tipos de usuarios:', error);
    throw error;
  }
}