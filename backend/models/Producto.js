const db = require('./db');

const Producto = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM productos');
    return rows;
  },

  create: async (producto) => {
    const { nombre, precio, stock } = producto;
    await db.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [nombre, precio, stock]
    );
  },

  update: async (id, producto) => {
    const { nombre, precio, stock } = producto;
    await db.query(
      'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
      [nombre, precio, stock, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
  }
};

module.exports = Producto;
