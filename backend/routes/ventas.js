import express from 'express';
import pool from '../models/db.js';

const router = express.Router();

// Registrar una venta
router.post('/', async (req, res) => {
  try {
    const { cliente_id, empleado_id, fecha } = req.body;

    const [result] = await pool.query(
      'INSERT INTO ventas (cliente_id, empleado_id, fecha) VALUES (?, ?, ?)',
      [cliente_id, empleado_id, fecha]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    res.status(500).json({ error: 'Error al registrar venta' });
  }
});

export default router;
