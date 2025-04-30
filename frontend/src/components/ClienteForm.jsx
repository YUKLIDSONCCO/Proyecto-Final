import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClienteForm({ clienteEdit, setClienteEdit, onClienteAgregado }) {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');

  // ✅ Si hay cliente a editar, llena el formulario
  useEffect(() => {
    if (clienteEdit) {
      setNombre(clienteEdit.nombre);
      setDni(clienteEdit.dni);
    } else {
      setNombre('');
      setDni('');
    }
  }, [clienteEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoCliente = { nombre, dni };

    try {
      if (clienteEdit) {
        // ✅ Editar
        await axios.put(`http://localhost:3001/clientes/${clienteEdit.id}`, nuevoCliente);
      } else {
        // Crear nuevo
        await axios.post('http://localhost:3001/clientes', nuevoCliente);
      }

      onClienteAgregado();
      setNombre('');
      setDni('');
      setClienteEdit(null); // ✅ Limpiar después de editar
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>{clienteEdit ? 'Editar Cliente' : 'Agregar Cliente'}</h5>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">DNI</label>
        <input
          type="text"
          className="form-control"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {clienteEdit ? 'Actualizar' : 'Agregar'}
      </button>
      {clienteEdit && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => setClienteEdit(null)}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ClienteForm;
