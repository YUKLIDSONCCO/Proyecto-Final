import { useEffect, useState } from 'react';
import axios from 'axios';

const MedicamentoList = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [editForm, setEditForm] = useState(null);

  const fetchMedicamentos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/medicamentos');
      setMedicamentos(res.data);
    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este medicamento?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/medicamentos/${id}`);
      fetchMedicamentos();
    } catch (error) {
      console.error('Error al eliminar medicamento:', error);
    }
  };

  const handleEditClick = (med) => {
    setEditForm({ ...med }); // Copia el medicamento actual
    const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/medicamentos/${editForm.id}`, editForm);
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('editModal'));
      modal.hide();
      fetchMedicamentos();
    } catch (error) {
      console.error('Error al editar medicamento:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3>Lista de Medicamentos</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre Comercial</th>
            <th>Genérico</th>
            <th>Descripción</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.nombre_comercial}</td>
              <td>{med.nombre_generico}</td>
              <td>{med.descripcion}</td>
              <td>S/. {med.precio_venta}</td>
              <td>{med.stock}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(med)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(med.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Medicamento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              {editForm && (
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre_comercial"
                      placeholder="Nombre Comercial"
                      value={editForm.nombre_comercial || ''}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre_generico"
                      placeholder="Nombre Genérico"
                      value={editForm.nombre_generico || ''}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="descripcion"
                      placeholder="Descripción"
                      value={editForm.descripcion || ''}
                      onChange={handleEditChange}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="number"
                        className="form-control"
                        name="precio_venta"
                        placeholder="Precio Venta"
                        value={editForm.precio_venta || ''}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        placeholder="Stock"
                        value={editForm.stock || ''}
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-success" onClick={handleEditSubmit}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicamentoList;
