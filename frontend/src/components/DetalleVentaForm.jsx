import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getDetallesVenta,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta
} from '../services/detalleVentaService';

function DetalleVentaForm() {
  const [detalles, setDetalles] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [form, setForm] = useState({
    venta_id: '',
    medicamento_id: '',
    cantidad: '',
    precio_unitario: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDetalles = async () => {
    const data = await getDetallesVenta();
    setDetalles(data);
  };

  const fetchMedicamentos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/medicamentos');
      console.log('Medicamentos cargados:', res.data);
      setMedicamentos(res.data);
    } catch (err) {
      console.error('Error al obtener medicamentos:', err);
    }
  };

  useEffect(() => {
    fetchDetalles();
    fetchMedicamentos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...form,
      medicamento_id: parseInt(form.medicamento_id),
      venta_id: parseInt(form.venta_id)
    };
    if (editingId) {
      await updateDetalleVenta(editingId, formData);
      setEditingId(null);
    } else {
      await createDetalleVenta(formData);
    }
    setForm({
      venta_id: '',
      medicamento_id: '',
      cantidad: '',
      precio_unitario: ''
    });
    fetchDetalles();
  };

  const handleEdit = (detalle) => {
    setForm({
      venta_id: String(detalle.venta_id),
      medicamento_id: String(detalle.medicamento_id),
      cantidad: detalle.cantidad,
      precio_unitario: detalle.precio_unitario
    });
    setEditingId(detalle.id);
  };

  const handleDelete = async (id) => {
    await deleteDetalleVenta(id);
    fetchDetalles();
  };

  const getNombreMedicamento = (id) => {
    const med = medicamentos.find((m) => m.id === id);
    return med ? med.nombre_comercial : 'Desconocido';
  };

  return (
    <div>
      <h2>Detalle de Venta</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="venta_id"
          placeholder="ID Venta"
          value={form.venta_id}
          onChange={handleChange}
          required
        />

        <select
          name="medicamento_id"
          value={form.medicamento_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un medicamento</option>
          {medicamentos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre_comercial}
            </option>
          ))}
        </select>

        <input
          name="cantidad"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />
        <input
          name="precio_unitario"
          placeholder="Precio Unitario"
          value={form.precio_unitario}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Venta</th>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.venta_id}</td>
              <td>{getNombreMedicamento(d.medicamento_id)}</td>
              <td>{d.cantidad}</td>
              <td>{d.precio_unitario}</td>
              <td>{d.subtotal}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Editar</button>
                <button onClick={() => handleDelete(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetalleVentaForm;
