import { useState } from 'react';
import axios from 'axios';

const ProveedorForm = () => {
  const [form, setForm] = useState({
    nombre_empresa: '',
    contacto: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/proveedores', form);
    setForm({ nombre_empresa: '', contacto: '', telefono: '', direccion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre_empresa" placeholder="Empresa" className="form-control mb-2" value={form.nombre_empresa} onChange={handleChange} required />
      <input type="text" name="contacto" placeholder="Contacto" className="form-control mb-2" value={form.contacto} onChange={handleChange} />
      <input type="text" name="telefono" placeholder="Teléfono" className="form-control mb-2" value={form.telefono} onChange={handleChange} />
      <input type="text" name="direccion" placeholder="Dirección" className="form-control mb-2" value={form.direccion} onChange={handleChange} />
      <button className="btn btn-primary">Guardar Proveedor</button>
    </form>
  );
};

export default ProveedorForm;
