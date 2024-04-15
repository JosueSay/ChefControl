import client from '../connections/conn.js';

export async function getCuentas() {
    try {
      // Consulta SQL para obtener las cuentas
      const query = 'SELECT * FROM Cuentas WHERE estado = $1';
      const result = await client.query(query, ['Abierta']);
  
      // Devuelve el resultado de la consulta
      return result.rows;
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
      throw error;
    }
  }

  export async function getCuentaPorId(idCuenta) {
    try {
      // Consulta SQL para obtener la cuenta por su ID
      const query = 'SELECT C.*, U.nombre FROM Cuentas AS C JOIN Usuarios AS U ON C.id_usuario = U.id_usuario WHERE C.id_cuenta = $1';
      const result = await client.query(query, [idCuenta]);
  
      // Verificar si se encontró la cuenta
      if (result.rows.length === 0) {
        return null; // Devuelve null si la cuenta no se encontró
      }
  
      // Devuelve la cuenta encontrada
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener la cuenta por ID:', error);
      throw error;
    }
  }
  
  export async function cambiarEstadoCuenta(idCuenta, nuevoEstado) {
    try {
      // Consulta SQL para actualizar el estado de la cuenta
      const query = 'UPDATE Cuentas SET estado = $1 WHERE id_cuenta = $2';
      await client.query(query, [nuevoEstado, idCuenta]);
      
      // Devuelve un mensaje indicando que la actualización fue exitosa
      return `Estado de la cuenta ${idCuenta} actualizado a ${nuevoEstado} exitosamente.`;
    } catch (error) {
      console.error('Error al cambiar el estado de la cuenta:', error);
      throw error;
    }
  }
  