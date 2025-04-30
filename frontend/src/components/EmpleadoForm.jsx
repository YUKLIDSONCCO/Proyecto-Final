import { useEffect, useState } from 'react';
import axios from 'axios';

function EmpleadoForm({ empleadoEdit, setEmpleadoEdit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    cargo: '',
    telefono: '',
    fecha_ingreso: ''
  });

  useEffect(() => {
    if (empleadoEdit) {
      setFormData(empleadoEdit);
    } else {
      setFormData({
        nombre: '',
        apellido: '',
        dni: '',
        cargo: '',
        telefono: '',
        fecha_ingreso: ''
      });
    }
  }, [empleadoEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (empleadoEdit) {
        await axios.put(`/api/empleados/${empleadoEdit.id}`, formData);
        alert('Empleado actualizado correctamente');
      } else {
        await axios.post('/api/empleados', formData);
        alert('Empleado registrado correctamente');
      }
      setFormData({
        nombre: '',
        apellido: '',
        dni: '',
        cargo: '',
        telefono: '',
        fecha_ingreso: ''
      });
      setEmpleadoEdit(null); // Limpiar modo edición
    } catch (error) {
      console.error('Error al guardar empleado:', error);
      alert('Error al guardar empleado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4 mb-3">
          <input className="form-control" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <input className="form-control" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <input className="form-control" name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <input className="form-control" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <input className="form-control" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <input className="form-control" name="fecha_ingreso" type="date" value={formData.fecha_ingreso} onChange={handleChange} required />
        </div>
      </div>
      <button type="submit" className="btn btn-success me-2">
        {empleadoEdit ? 'Actualizar' : 'Registrar'}
      </button>
      {empleadoEdit && (
        <button type="button" className="btn btn-secondary" onClick={() => setEmpleadoEdit(null)}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default EmpleadoForm;
