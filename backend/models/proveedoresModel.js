// backend/models/proveedoresModel.js
<<<<<<< HEAD
=======
//los provedores para el sql backend
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
import db from './db.js';

export const getProveedores = async () => {
  const [rows] = await db.query('SELECT * FROM proveedores');
  return rows;
};

<<<<<<< HEAD
=======

>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
export const getProveedorById = async (id) => {
  const [rows] = await db.query('SELECT * FROM proveedores WHERE id = ?', [id]);
  return rows[0];
};

export const createProveedor = async (proveedor) => {
  const { nombre_empresa, contacto, telefono, direccion } = proveedor;
  const [result] = await db.query(
    'INSERT INTO proveedores (nombre_empresa, contacto, telefono, direccion) VALUES (?, ?, ?, ?)',
    [nombre_empresa, contacto, telefono, direccion]
  );
  return { id: result.insertId, ...proveedor };
};

export const updateProveedor = async (id, proveedor) => {
  const { nombre_empresa, contacto, telefono, direccion } = proveedor;
  await db.query(
    'UPDATE proveedores SET nombre_empresa = ?, contacto = ?, telefono = ?, direccion = ? WHERE id = ?',
    [nombre_empresa, contacto, telefono, direccion, id]
  );
  return { id, ...proveedor };
};

export const deleteProveedor = async (id) => {
  await db.query('DELETE FROM proveedores WHERE id = ?', [id]);
};
