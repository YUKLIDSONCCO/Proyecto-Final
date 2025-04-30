import db from '../models/db';
import bcrypt from 'bcryptjs';

export const getAllEmpleados = async () => {
  const [rows] = await db.execute('SELECT * FROM empleados');
  return rows;
};

export const getEmpleadoById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM empleados WHERE id = ?', [id]);
  return rows[0];
};

export const createEmpleado = async (empleado) => {
  const { nombre, apellido, dni, cargo, telefono, fecha_ingreso, usuario, contrasena} = empleado;
  const hashedPassword = await bcrypt.hash(contrasena, 10);  // Hashea la contraseña
  const [result] = await db.execute(
    'INSERT INTO empleados (nombre, apellido, dni, cargo, telefono, fecha_ingreso, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?,?,?)',
    [nombre, apellido, dni, cargo, telefono, fecha_ingreso, usuario, hashedPassword]
  );
  return { id: result.insertId, ...empleado };
};

export const updateEmpleado = async (id, empleado) => {
  const { nombre, apellido, dni, cargo, telefono, fecha_ingreso } = empleado;
  await db.execute(
    'UPDATE empleados SET nombre = ?, apellido = ?, dni = ?, cargo = ?, telefono = ?, fecha_ingreso = ? WHERE id = ?',
    [nombre, apellido, dni, cargo, telefono, fecha_ingreso, id]
  );
};

export const deleteEmpleado = async (id) => {
  await db.execute('DELETE FROM empleados WHERE id = ?', [id]);
};
