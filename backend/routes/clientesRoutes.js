// backend/routes/clientesRoutes.js
import express from 'express';
import {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerCliente);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;
