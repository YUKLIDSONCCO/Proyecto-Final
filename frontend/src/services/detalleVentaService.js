// src/services/detalleVentaService.js
import axios from 'axios';

const API = "http://localhost:3000/api/detalles-venta";

export const createDetalleVenta = async (detalle) => {
  const res = await axios.post(API, detalle);
  return res.data;
};

export const getDetallesVenta = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getDetalleVenta = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const updateDetalleVenta = async (id, detalle) => {
  const res = await axios.put(`${API}/${id}`, detalle);
  return res.data;
};

export const deleteDetalleVenta = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
