
// backend/routes/authRoutes.js
import { Router } from 'express';
import pool from '../models/db.js';
import crypto from 'crypto';

const router = Router();

router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const hashedPassword = crypto.createHash('md5').update(contrasena).digest('hex');

    const [rows] = await pool.query(
      'SELECT * FROM empleados WHERE usuario = ? AND contrasena = ?',
      [usuario, hashedPassword]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const empleado = rows[0];
    res.json({
      id: empleado.id,
      nombre: empleado.nombre,
      usuario: empleado.usuario,
      rol: empleado.rol
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
});

export default router;
