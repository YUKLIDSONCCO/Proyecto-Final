import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClienteForm({ clienteEdit, setClienteEdit, onClienteAgregado }) {
  const [nombre, setNombre] = useState('');
<<<<<<< HEAD
  const [dni, setDni] = useState('');

  // ✅ Si hay cliente a editar, llena el formulario
  useEffect(() => {
    if (clienteEdit) {
      setNombre(clienteEdit.nombre);
      setDni(clienteEdit.dni);
    } else {
      setNombre('');
      setDni('');
=======
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    if (clienteEdit) {
      setNombre(clienteEdit.nombre);
      setApellido(clienteEdit.apellido);
      setDni(clienteEdit.dni);
      setTelefono(clienteEdit.telefono);
      setDireccion(clienteEdit.direccion);
    } else {
      setNombre('');
      setApellido('');
      setDni('');
      setTelefono('');
      setDireccion('');
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
    }
  }, [clienteEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const nuevoCliente = { nombre, dni };

    try {
      if (clienteEdit) {
        // ✅ Editar
        await axios.put(`http://localhost:3000/api/clientes/${clienteEdit.id}`, nuevoCliente);
      } else {
        // Crear nuevo
=======
    const nuevoCliente = { nombre, apellido, dni, telefono, direccion };

    try {
      if (clienteEdit) {
        await axios.put(`http://localhost:3000/api/clientes/${clienteEdit.id}`, nuevoCliente);
      } else {
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
        await axios.post('http://localhost:3000/api/clientes', nuevoCliente);
      }

      onClienteAgregado();
      setNombre('');
<<<<<<< HEAD
      setDni('');
      setClienteEdit(null); // ✅ Limpiar después de editar
=======
      setApellido('');
      setDni('');
      setTelefono('');
      setDireccion('');
      setClienteEdit(null);
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>{clienteEdit ? 'Editar Cliente' : 'Agregar Cliente'}</h5>
<<<<<<< HEAD
=======

>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
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
<<<<<<< HEAD
=======

      <div className="mb-3">
        <label className="form-label">Apellido</label>
        <input
          type="text"
          className="form-control"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>

>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
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
<<<<<<< HEAD
=======

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          className="form-control"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>

>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
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
