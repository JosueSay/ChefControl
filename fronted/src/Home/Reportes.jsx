import React, { useState } from 'react';
import { PlatosMasPedidos, PromedioTiempoComida, QuejasPorUsuario, QuejasPorPlato, EficienciaMeseros } from '../../../backend/src/database/reportes';

function ReportesComponent() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      switch (selectedReport) {
        case 'PlatosMasPedidos':
          data = await PlatosMasPedidos(fechaInicio, fechaFin);
          break;
        case 'PromedioTiempoComida':
          data = await PromedioTiempoComida(fechaInicio, fechaFin);
          break;
        case 'QuejasPorUsuario':
          data = await QuejasPorUsuario(fechaInicio, fechaFin);
          break;
        case 'QuejasPorPlato':
          data = await QuejasPorPlato(fechaInicio, fechaFin);
          break;
        case 'EficienciaMeseros':
          data = await EficienciaMeseros();
          break;
        default:
          break;
      }
      setReportData(data);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
    }
  };

  return (
    <div>
      <h2>Generar Reportes</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

        <label htmlFor="fechaFin">Fecha de Fin:</label>
        <input type="date" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

        <label htmlFor="reporte">Seleccionar Reporte:</label>
        <select id="reporte" value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} required>
          <option value="">Seleccione un reporte</option>
          <option value="PlatosMasPedidos">Platos más Pedidos</option>
          <option value="PromedioTiempoComida">Promedio de Tiempo de Comida</option>
          <option value="QuejasPorUsuario">Quejas por Usuario</option>
          <option value="QuejasPorPlato">Quejas por Plato</option>
          <option value="EficienciaMeseros">Eficiencia de Meseros</option>
        </select>

        <button type="submit">Generar Reporte</button>
      </form>

      {/* Mostrar los resultados de los reportes aquí */}
      <div>
        <h3>Resultados del Reporte</h3>
        <ul>
          {reportData.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default ReportesComponent;
