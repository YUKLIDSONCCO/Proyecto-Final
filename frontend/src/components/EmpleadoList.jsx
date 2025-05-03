import { useEffect, useState } from 'react';
import axios from 'axios';

function EmpleadoList({ onEdit }) {
  const [empleados, setEmpleados] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/empleados');
      setEmpleados(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      setEmpleados([]);
    }
  };

  const handleDelete = async id => {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      await axios.delete(`/api/empleados/${id}`);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table className="table table-bordered table-hover mt-3">
      <thead className="table-secondary">
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Cargo</th>
          <th>Teléfono</th>
          <th>Fecha Ingreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map(emp => (
          <tr key={emp.id}>
            <td>{emp.nombre}</td>
            <td>{emp.apellido}</td>
            <td>{emp.dni}</td>
            <td>{emp.cargo}</td>
            <td>{emp.telefono}</td>
            <td>{emp.fecha_ingreso}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(emp)}>Editar</button>
<<<<<<< HEAD
              <button className="btn btn-success" onClick={() => handleDelete(emp.id)}>Eliminar</button>
=======
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Eliminar</button>
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmpleadoList;
