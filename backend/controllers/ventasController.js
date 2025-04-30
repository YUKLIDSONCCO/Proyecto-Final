const db = require('../models/db'); // Asegúrate de apuntar a models/db.js

exports.createVenta = async (req, res) => {
  const productos = req.body.productos;

  const conn = await db.getConnection(); // mysql2/promise
  try {
    await conn.beginTransaction();

    for (const item of productos) {
      const [rows] = await conn.query('SELECT stock FROM productos WHERE id = ?', [item.id]);

      if (rows.length === 0) {
        throw new Error(`Producto con ID ${item.id} no encontrado`);
      }

      const stockActual = rows[0].stock;

      if (stockActual < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto con ID ${item.id}`);
      }

      await conn.query(
        'UPDATE productos SET stock = stock - ? WHERE id = ?',
        [item.cantidad, item.id]
      );
    }

    await conn.commit();
    res.json({ message: 'Venta realizada con éxito' });
  } catch (err) {
    await conn.rollback();
    console.error('Error en createVenta:', err);
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};
