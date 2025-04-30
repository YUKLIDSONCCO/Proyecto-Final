import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegistrarVenta = () => {
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedEmpleado, setSelectedEmpleado] = useState('');
  const [selectedMedicamento, setSelectedMedicamento] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const [detalles, setDetalles] = useState([]);
  const [ventaId, setVentaId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/clientes').then(res => setClientes(res.data));
    axios.get('http://localhost:3001/api/empleados').then(res => setEmpleados(res.data));
    axios.get('http://localhost:3001/api/medicamentos').then(res => setMedicamentos(res.data));
  }, []);

  const handleConfirmarVenta = () => {
    if (!selectedCliente || !selectedEmpleado) {
      alert('Selecciona cliente y empleado');
      return;
    }

    axios
      .post('http://localhost:3001/api/ventas', {
        id_cliente: selectedCliente,
        id_empleado: selectedEmpleado,
        fecha: new Date()
      })
      .then(res => {
        setVentaId(res.data.id_venta); // guarda ID de venta creada
        alert('Venta registrada correctamente');
      });
  };

  const handleAgregarDetalle = () => {
    if (!ventaId) {
      alert('Primero confirma la venta');
      return;
    }

    const medicamento = medicamentos.find(m => m.id_medicamento === parseInt(selectedMedicamento));
    if (!medicamento) return;

    const precio_unitario = medicamento.precio;
    const subtotal = precio_unitario * cantidad;

    const nuevoDetalle = {
      id_venta: ventaId,
      id_medicamento: medicamento.id_medicamento,
      nombre: medicamento.nombre,
      cantidad,
      precio_unitario,
      subtotal
    };

    axios.post('http://localhost:3001/api/detalle_venta', nuevoDetalle).then(() => {
      setDetalles([...detalles, nuevoDetalle]);
      setSelectedMedicamento('');
      setCantidad(1);
    });
  };

  return (
    <div>
      <h2>Registrar Venta</h2>

      {/* Cliente */}
      <div>
        <label>Cliente</label>
        <select value={selectedCliente} onChange={e => setSelectedCliente(e.target.value)}>
          <option value="">Selecciona un cliente</option>
          {clientes.map(c => (
            <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* Empleado */}
      <div>
        <label>Empleado</label>
        <select value={selectedEmpleado} onChange={e => setSelectedEmpleado(e.target.value)}>
          <option value="">Selecciona un empleado</option>
          {empleados.map(e => (
            <option key={e.id_empleado} value={e.id_empleado}>{e.nombre}</option>
          ))}
        </select>
      </div>

      {/* Botón Confirmar */}
      <button onClick={handleConfirmarVenta}>Confirmar Venta</button>

      <h3>Detalle de Venta</h3>

      {/* Detalle de Venta (Medicamento + Cantidad) */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <select value={selectedMedicamento} onChange={e => setSelectedMedicamento(e.target.value)}>
          <option value="">Selecciona un medicamento</option>
          {medicamentos.map(m => (
            <option key={m.id_medicamento} value={m.id_medicamento}>{m.nombre}</option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={e => setCantidad(parseInt(e.target.value))}
        />

        <button onClick={handleAgregarDetalle}>Agregar</button>
      </div>

      {/* Tabla Detalles */}
      <table style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>{detalle.nombre}</td>
              <td>{detalle.cantidad}</td>
              <td>{detalle.precio_unitario}</td>
              <td>{detalle.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrarVenta;
