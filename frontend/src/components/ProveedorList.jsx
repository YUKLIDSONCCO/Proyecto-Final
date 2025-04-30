import { useEffect, useState } from 'react';
import axios from 'axios';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editForm, setEditForm] = useState(null);

  const fetchProveedores = async () => {
    const res = await axios.get('http://localhost:3000/api/proveedores');
    setProveedores(res.data);
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      await axios.delete(`http://localhost:3000/api/proveedores/${id}`);
      fetchProveedores();
    }
  };

  const handleEdit = (proveedor) => {
    setEditForm(proveedor);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/proveedores/${editForm.id}`, editForm);
    setEditForm(null);
    fetchProveedores();
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h4 className="mt-4">Lista de Proveedores</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.nombre_empresa}</td>
              <td>{prov.contacto}</td>
              <td>{prov.telefono}</td>
              <td>{prov.direccion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(prov)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(prov.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editForm && (
        <form onSubmit={handleEditSubmit} className="mt-3">
          <h5>Editar Proveedor</h5>
          <input type="text" name="nombre_empresa" className="form-control mb-2" value={editForm.nombre_empresa} onChange={handleEditChange} required />
          <input type="text" name="contacto" className="form-control mb-2" value={editForm.contacto} onChange={handleEditChange} />
          <input type="text" name="telefono" className="form-control mb-2" value={editForm.telefono} onChange={handleEditChange} />
          <input type="text" name="direccion" className="form-control mb-2" value={editForm.direccion} onChange={handleEditChange} />
          <button className="btn btn-success">Actualizar</button>
        </form>
      )}
    </div>
  );
};

export default ProveedorList;
