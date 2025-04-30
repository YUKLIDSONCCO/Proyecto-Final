// routes/detalleVentaRoutes.js
import express from 'express';
import {
  getAllDetalles,
  getDetalle,
  createDetalle,
  updateDetalle,
  deleteDetalle,
} from '../controllers/detalleVentaController.js';

const router = express.Router();

router.get('/', getAllDetalles); // <-- ¡Importante!

router.get('/:id', getDetalle);
router.post('/', createDetalle);
router.put('/:id', updateDetalle);
router.delete('/:id', deleteDetalle);

export default router;
