import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect
} from 'react';
import axios from 'axios';

const ClienteList = forwardRef((_, ref) => {
  const [clientes, setClientes] = useState([]);

  // Función para obtener la lista de clientes
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  // Exponer la función fetchClientes al componente padre
  useImperativeHandle(ref, () => ({
    recargar: fetchClientes
  }));

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>
              <button
  className="btn btn-sm btn-warning me-2"
  onClick={() => onEdit(cliente)} // ✅ pasa el cliente al padre
>
  Editar
</button>

                <button
                  className="btn btn-success"
                  onClick={() => handleEliminar(cliente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No hay clientes registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default ClienteList;
