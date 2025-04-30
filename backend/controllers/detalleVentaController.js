import * as Detalle from '../models/detalleVentaModel.js';

export const getAllDetalles = async (req, res) => {
  const detalles = await Detalle.getDetallesVenta();
  res.json(detalles);
};

export const getDetalle = async (req, res) => {
  const detalle = await Detalle.getDetalleVentaById(req.params.id);
  if (detalle) res.json(detalle);
  else res.status(404).json({ message: 'Detalle de venta no encontrado' });
};

export const createDetalle = async (req, res) => {
  const nuevoDetalle = await Detalle.createDetalleVenta(req.body);
  res.status(201).json(nuevoDetalle);
};

export const updateDetalle = async (req, res) => {
  const updated = await Detalle.updateDetalleVenta(req.params.id, req.body);
  res.json(updated);
};

export const deleteDetalle = async (req, res) => {
  await Detalle.deleteDetalleVenta(req.params.id);
  res.status(204).end();
};
