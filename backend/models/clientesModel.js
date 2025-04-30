// backend/models/clientesModel.js
import db from './db.js';

export const getClientes = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};

export const getClienteById = async (id) => {
  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

export const createCliente = async (cliente) => {
  const { nombre, apellido, dni, telefono, direccion } = cliente;
  const [result] = await db.query(
    'INSERT INTO clientes (nombre, apellido, dni, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, dni, telefono, direccion]
  );
  return { id: result.insertId, ...cliente };
};

export const updateCliente = async (id, cliente) => {
  const { nombre, apellido, dni, telefono, direccion } = cliente;
  await db.query(
    'UPDATE clientes SET nombre = ?, apellido = ?, dni = ?, telefono = ?, direccion = ? WHERE id = ?',
    [nombre, apellido, dni, telefono, direccion, id]
  );
  return { id, ...cliente };
};

export const deleteCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
};
