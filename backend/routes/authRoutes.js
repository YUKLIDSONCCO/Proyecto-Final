import { Router } from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcryptjs'; // Asegúrate de importar bcrypt

const router = Router();

// Ruta de login
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  console.log('Intentando login con:', usuario, contrasena);
  try {
    const [rows] = await pool.query(
      'SELECT * FROM empleados WHERE usuario = ? AND activo = TRUE',
      [usuario]
    );
    console.log('Resultado de consulta:', rows);


    if (rows.length === 0) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado o inactivo' });
    }

    const empleado = rows[0];
    console.log('Empleado encontrado:', empleado);

    // Verificamos que la contraseña no sea undefined o null
if (!empleado.contrasena) {
    return res.status(500).json({ mensaje: 'Contraseña no definida para este usuario' });
  }
    const esContrasenaValida = await bcrypt.compare(contrasena, empleado.contrasena);

    if (!esContrasenaValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    res.json({
      id: empleado.id,
      nombre: empleado.nombre,
      usuario: empleado.usuario,
      rol: empleado.rol
    });
} catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ mensaje: error.message || 'Error interno' });
  }
  
});

// Ruta de registro (nuevo usuario)
router.post('/register', async (req, res) => {
  const { nombre, usuario, contrasena } = req.body;

  // Hasheamos la contraseña antes de guardarla
  const saltRounds = 10; // Rondas de sal
  const contrasenaHashed = await bcrypt.hash(contrasena, saltRounds);

  try {
    // Inserción del nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO empleados (nombre, usuario, contrasena) VALUES (?, ?, ?)',
      [nombre, usuario, contrasenaHashed]
    );

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
});

export default router;
