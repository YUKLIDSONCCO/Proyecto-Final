import * as Venta from '../models/ventaModel.js';

export const getAllVentas = async (req, res) => {
  const ventas = await Venta.getVentas();
  res.json(ventas);
};

export const getVenta = async (req, res) => {
  const venta = await Venta.getVentaById(req.params.id);
  if (venta) res.json(venta);
  else res.status(404).json({ message: 'Venta no encontrada' });
};

export const createVenta = async (req, res) => {
  const nuevaVenta = await Venta.createVenta(req.body);
  res.status(201).json(nuevaVenta);
};

export const updateVenta = async (req, res) => {
  const updated = await Venta.updateVenta(req.params.id, req.body);
  res.json(updated);
};

export const deleteVenta = async (req, res) => {
  await Venta.deleteVenta(req.params.id);
  res.status(204).end();
};
