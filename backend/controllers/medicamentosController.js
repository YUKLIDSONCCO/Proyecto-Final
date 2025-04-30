import {
  getAllMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento
} from '../models/medicamentosModel.js';

export const obtenerMedicamentos = async (req, res) => {
  try {
    const medicamentos = await getAllMedicamentos();
    res.json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos:', error.message);
    res.status(500).json({ error: 'Error al obtener medicamentos' });
  }
};

export const obtenerMedicamento = async (req, res) => {
  try {
    const medicamento = await getMedicamentoById(req.params.id);
    if (!medicamento) return res.status(404).json({ error: 'Medicamento no encontrado' });
    res.json(medicamento);
  } catch (error) {
    console.error('Error al obtener medicamento:', error.message);
    res.status(500).json({ error: 'Error al obtener medicamento' });
  }
};

export const crearMedicamento = async (req, res) => {
  try {
    const nuevoMedicamento = await createMedicamento(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    console.error('Error al crear medicamento:', error.message);
    res.status(400).json({ error: error.message });
  }
};

export const actualizarMedicamento = async (req, res) => {
  try {
    const medicamentoActualizado = await updateMedicamento(req.params.id, req.body);
    res.json(medicamentoActualizado);
  } catch (error) {
    console.error('Error al actualizar medicamento:', error.message);
    res.status(400).json({ error: error.message });
  }
};

export const eliminarMedicamento = async (req, res) => {
  try {
    await deleteMedicamento(req.params.id);
    res.json({ mensaje: 'Medicamento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar medicamento:', error.message);
    res.status(500).json({ error: 'Error al eliminar medicamento' });
  }
};
