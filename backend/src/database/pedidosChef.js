// pedidosController.js
import client from '../connections/conn.js';

// Función para obtener los pedidos de tipo "Cuenta" con nombres de alimentos
export async function getPedidosComidas() {
  try {
    // Consulta SQL para seleccionar los pedidos de tipo "Cuenta" y comidas
    const query = `
    SELECT p.id_pedido, p.id_cuenta, p.id_alimento, p.id_mesa, p.id_tipo_consumo, p.cantidad, a.nombre AS nombre_alimento
    FROM Pedidos p
    JOIN Alimentos a ON p.id_alimento = a.id_alimento
    JOIN Cuentas c ON p.id_cuenta = c.id_cuenta
    WHERE p.id_tipo_consumo = (SELECT id_tipo_consumo FROM TiposConsumos WHERE nombre = 'Cuenta') 
    AND c.estado = 'Abierta'
    AND p.estado_pedido = 'pendiente'
    and a.id_tipo_alimento not in (select id_tipo_alimento from tiposalimentos where nombre = 'Bebida');
    `;
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los pedidos de tipo "Cuenta":', error);
    throw error;
  }
}

// Función para obtener los pedidos de tipo "Cuenta" con nombres de alimentos
export async function getPedidosBebidas() {
  try {
    // Consulta SQL para seleccionar los pedidos de tipo "Cuenta" y bebidas
    const query = `
    SELECT p.id_pedido, p.id_cuenta, p.id_alimento, p.id_mesa, p.id_tipo_consumo, p.cantidad, a.nombre AS nombre_alimento
    FROM Pedidos p
    JOIN Alimentos a ON p.id_alimento = a.id_alimento
    JOIN Cuentas c ON p.id_cuenta = c.id_cuenta
    WHERE p.id_tipo_consumo = (SELECT id_tipo_consumo FROM TiposConsumos WHERE nombre = 'Cuenta') 
    AND c.estado = 'Abierta'
    AND p.estado_pedido = 'pendiente'
    AND a.id_tipo_alimento IN (SELECT id_tipo_alimento FROM tiposalimentos WHERE nombre = 'Bebida');
    `;
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los pedidos de bebidas:', error);
    throw error;
  }
}


// Función para actualizar el estado de un pedido a "finalizado"
export async function marcarPedidoComoFinalizado(idPedido) {
  try {
    // Consulta SQL para actualizar el estado de un pedido a "finalizado"
    const query = `
    UPDATE Pedidos
    SET estado_pedido = 'finalizado'
    WHERE id_pedido = $1;
    `;
    await client.query(query, [idPedido]);
    console.log(`Pedido con ID ${idPedido} marcado como finalizado.`);
  } catch (error) {
    console.error(`Error al marcar el pedido con ID ${idPedido} como finalizado:`, error);
    throw error;
  }
}
