import express from 'express';
import {
  obtenerMedicamentos,
  obtenerMedicamento,
  crearMedicamento,
  actualizarMedicamento,
  eliminarMedicamento
} from '../controllers/medicamentosController.js';

const router = express.Router();

router.get('/', obtenerMedicamentos);
router.get('/:id', obtenerMedicamento);
router.post('/', crearMedicamento);
router.put('/:id', actualizarMedicamento);
router.delete('/:id', eliminarMedicamento);

export default router;
