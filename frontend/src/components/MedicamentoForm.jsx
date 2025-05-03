import { useEffect, useState } from 'react';
import axios from 'axios';

const MedicamentoForm = () => {
  const [form, setForm] = useState({
    nombre_comercial: '',
    nombre_generico: '',
    descripcion: '',
    laboratorio: '',
    concentracion: '',
    forma_farmaceutica: '',
    precio_compra: '',
    precio_venta: '',
    stock: '',
    fecha_vencimiento: '',
    proveedor_id: ''
  });

  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/proveedores');
        setProveedores(res.data);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };
    fetchProveedores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === 'proveedor_id' || name === 'stock' || name === 'precio_compra' || name === 'precio_venta'
          ? Number(value)
          : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/medicamentos', form);
<<<<<<< HEAD
      alert('Medicamento registrado');
=======
      alert('✅ Medicamento registrado correctamente');
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
      setForm({
        nombre_comercial: '',
        nombre_generico: '',
        descripcion: '',
        laboratorio: '',
        concentracion: '',
        forma_farmaceutica: '',
        precio_compra: '',
        precio_venta: '',
        stock: '',
        fecha_vencimiento: '',
        proveedor_id: ''
      });
    } catch (error) {
      alert('❌ Error al registrar medicamento');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Nombre Comercial</label>
        <input name="nombre_comercial" className="form-control" value={form.nombre_comercial} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Nombre Genérico</label>
        <input name="nombre_generico" className="form-control" value={form.nombre_generico} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Descripción</label>
        <input name="descripcion" className="form-control" value={form.descripcion} onChange={handleChange} />
      </div>

      <div className="col-md-6">
        <label className="form-label">Laboratorio</label>
        <input name="laboratorio" className="form-control" value={form.laboratorio} onChange={handleChange} />
      </div>

      <div className="col-md-6">
        <label className="form-label">Concentración</label>
        <input name="concentracion" className="form-control" value={form.concentracion} onChange={handleChange} />
      </div>

      <div className="col-md-6">
        <label className="form-label">Forma Farmacéutica</label>
        <input name="forma_farmaceutica" className="form-control" value={form.forma_farmaceutica} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Precio de Compra</label>
        <input name="precio_compra" type="number" className="form-control" value={form.precio_compra} onChange={handleChange} required />
      </div>

      <div className="col-md-4">
        <label className="form-label">Precio de Venta</label>
        <input name="precio_venta" type="number" className="form-control" value={form.precio_venta} onChange={handleChange} required />
      </div>

      <div className="col-md-4">
        <label className="form-label">Stock</label>
        <input name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Fecha de Vencimiento</label>
        <input name="fecha_vencimiento" type="date" className="form-control" value={form.fecha_vencimiento} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Proveedor</label>
        <select name="proveedor_id" className="form-select" value={form.proveedor_id} onChange={handleChange} required>
          <option value="">Seleccione un proveedor</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre_empresa}</option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary w-100">Registrar Medicamento</button>
      </div>
    </form>
  );
};

export default MedicamentoForm;
