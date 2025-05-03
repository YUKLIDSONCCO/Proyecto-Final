import db from './db.js';

export const getDetallesVenta = async () => {
  const [rows] = await db.query(`
    SELECT dv.*, m.nombre_comercial AS medicamento
    FROM detalle_venta dv
    JOIN medicamentos m ON dv.medicamento_id = m.id
  `);
  return rows;
};

export const getDetalleVentaById = async (id) => {
  const [rows] = await db.query('SELECT * FROM detalle_venta WHERE id = ?', [id]);
  return rows[0];
};

export const createDetalleVenta = async (detalle) => {
  const { venta_id, medicamento_id, cantidad, precio_unitario } = detalle;
  const [result] = await db.query(
    'INSERT INTO detalle_venta (venta_id, medicamento_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    [venta_id, medicamento_id, cantidad, precio_unitario]
  );
  return { id: result.insertId, ...detalle };
};

export const updateDetalleVenta = async (id, detalle) => {
  const { venta_id, medicamento_id, cantidad, precio_unitario } = detalle;
  await db.query(
    'UPDATE detalle_venta SET venta_id = ?, medicamento_id = ?, cantidad = ?, precio_unitario = ? WHERE id = ?',
    [venta_id, medicamento_id, cantidad, precio_unitario, id]
  );
  return { id, ...detalle };
};

export const deleteDetalleVenta = async (id) => {
  await db.query('DELETE FROM detalle_venta WHERE id = ?', [id]);
};
