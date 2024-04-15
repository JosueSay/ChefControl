import React, { useState, useEffect } from 'react';
import './OrderComidas.css';

function OrderComidas() {
  const [pedidos, setPedidos] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [filtroCuenta, setFiltroCuenta] = useState('');
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  const fetchPedidos = () => {
    fetch('http://localhost:3000/pedidos-comidas')
      .then(response => response.json())
      .then(data => {
        setPedidos(data);
        // Obtener todas las cuentas únicas de los pedidos
        const cuentasUnicas = [...new Set(data.map(pedido => pedido.id_cuenta))];
        setCuentas(cuentasUnicas);
      })
      .catch(error => console.error('Error fetching pedidos:', error));
  };

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Aplicar filtro cuando cambia la cuenta seleccionada
    if (filtroCuenta !== '') {
      const pedidosFiltrados = pedidos.filter(pedido => pedido.id_cuenta === parseInt(filtroCuenta));
      setPedidosFiltrados(pedidosFiltrados);
    } else {
      setPedidosFiltrados(pedidos);
    }
  }, [filtroCuenta, pedidos]);

  const handlePedidoHecho = (idPedido) => {
    // Envía una solicitud al endpoint para marcar el pedido como hecho
    fetch('http://localhost:3000/marcarPedidoFinalizado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idPedido }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Pedido marcado como hecho:', idPedido);
          // Elimina el pedido de los pedidos filtrados
          setPedidosFiltrados(pedidosFiltrados.filter(pedido => pedido.id_pedido !== idPedido));
        } else {
          console.error('Error al marcar el pedido como hecho');
        }
      })
      .catch(error => console.error('Error al marcar el pedido como hecho:', error));
  };

  return (
    <div className="OrderComidas">
      <h2>Órdenes de Comidas Pendientes</h2>
      <div className="filtro-cuenta">
        <label htmlFor="cuenta-select">Filtrar por cuenta:</label>
        <select id="cuenta-select" value={filtroCuenta} onChange={(e) => setFiltroCuenta(e.target.value)}>
          <option value="">Todas las cuentas</option>
          {cuentas.map(cuenta => (
            <option key={cuenta} value={cuenta}>Cuenta {cuenta}</option>
          ))}
        </select>
      </div>
      <div className="pedido-list">
        {pedidosFiltrados.map(pedido => (
          <div key={pedido.id_pedido} className="pedido-item">
            <div className="pedido-info">
              <p>Número de Pedido: {pedido.id_pedido}</p>
              <p>Cuenta: {pedido.id_cuenta}</p>
              <p>Alimento: {pedido.nombre_alimento}</p>
              <p>Mesa: {pedido.id_mesa}</p>
              <p>Cantidad: {pedido.cantidad}</p>
            </div>
            <button className="pedido-button" onClick={() => handlePedidoHecho(pedido.id_pedido)}>Hecho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderComidas;
