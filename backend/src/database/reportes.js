import client from '../connections/conn.js';

// Reporte de los platos más pedidos por los clientes en un rango de fechas
export async function PlatosMasPedidos(fechaInicio, fechaFin) {
  try {
    const query = `
    SELECT a.nombre AS nombre_plato, COUNT(*) AS total_pedidos
    FROM Pedidos p
    JOIN Alimentos a ON p.id_alimento = a.id_alimento
    JOIN Cuentas c ON p.id_cuenta = c.id_cuenta
    WHERE c.fecha_hora_apertura >= $1 AND c.fecha_hora_apertura <= $2
    GROUP BY a.nombre
    ORDER BY total_pedidos DESC;
    `;
    const result = await client.query(query, [fechaInicio, fechaFin]);
    return result.rows;
  } catch (error) {
    console.error('Error al generar el reporte de platos más pedidos:', error);
    throw error;
  }

}

// Reporte para obtener tiempo promedio 
export async function PromedioTiempoComida(fechaInicio, fechaFin) {
  try {
    const query = `
      SELECT cantidad_personas,
             AVG(tiempo_comida) AS tiempo_promedio
      FROM (
          SELECT COUNT(p.id_cuenta) AS cantidad_personas,
                 AVG(EXTRACT(EPOCH FROM (c.fecha_hora_cierre - c.fecha_hora_apertura))) AS tiempo_comida
          FROM Pedidos p
          JOIN Cuentas c ON p.id_cuenta = c.id_cuenta
          WHERE c.fecha_hora_apertura >= $1 AND c.fecha_hora_apertura <= $2
          GROUP BY p.id_cuenta
      ) AS subquery
      GROUP BY cantidad_personas
      ORDER BY cantidad_personas;
    `;
    const result = await client.query(query, [fechaInicio, fechaFin]);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener el promedio de tiempo de comida:', error);
    throw error;
  }
}

// Reporte para obtener cantidad de quejas
export async function QuejasPorUsuario(fechaInicio, fechaFin) {
  try {
    const query = `
      SELECT id_usuario, COUNT(*) as cantidad_quejas
      FROM quejas
      WHERE fecha_hora BETWEEN $1 AND $2
      GROUP BY id_usuario;
    `;
    const result = await client.query(query, [fechaInicio, fechaFin]);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener la cantidad de quejas por usuario:', error);
    throw error;
  }
}

export async function QuejasPorPlato(fechaInicio, fechaFin) {
  try {
    const query = `
      SELECT a.nombre AS nombre_plato, COUNT(q.id_queja) AS total_quejas
      FROM Quejas q
      JOIN Alimentos a ON q.id_alimento = a.id_alimento
      WHERE q.fecha_hora BETWEEN $1 AND $2
      GROUP BY a.nombre
      ORDER BY total_quejas DESC;
    `;
    const values = [fechaInicio, fechaFin];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener el reporte de quejas por plato:', error);
    throw error;
  }
}

export async function EficienciaMeseros() {
  try {
    const query = `
      SELECT 
          id_usuario,
          DATE_TRUNC('month', fecha_hora) AS mes,
          AVG(calificacion_amabilidad) AS promedio_amabilidad,
          AVG(calificacion_exactitud) AS promedio_exactitud
      FROM 
          Encuestas
      WHERE 
          fecha_hora >= NOW() - INTERVAL '6 months'
      GROUP BY 
          id_usuario,
          mes
      ORDER BY 
          id_usuario,
          mes;
    `;
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener el reporte de eficiencia de meseros:', error);
    throw error;
  }
}
