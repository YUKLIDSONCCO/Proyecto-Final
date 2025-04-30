import express from 'express';
import {
  obtenerEmpleados,
  obtenerEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
} from '../controllers/empleadoController.js'; // ← nombre corregido

const router = express.Router();

router.get('/', obtenerEmpleados);
router.get('/:id', obtenerEmpleado);
router.post('/', crearEmpleado);
router.put('/:id', actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

export default router;
