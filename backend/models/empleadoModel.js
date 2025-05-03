import db from './db.js';

export const getAllEmpleados = async () => {
  const [rows] = await db.execute('SELECT * FROM empleados');
  return rows;
};

export const getEmpleadoById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM empleados WHERE id = ?', [id]);
  return rows[0];
};

export const createEmpleado = async (empleado) => {
  const { nombre, apellido, dni, cargo, telefono, fecha_ingreso } = empleado;
  const [result] = await db.execute(
    'INSERT INTO empleados (nombre, apellido, dni, cargo, telefono, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, dni, cargo, telefono, fecha_ingreso]
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
