// src/services/ventaService.js
import axios from 'axios';

const API = "http://localhost:3000/api/ventas";

export const crearVenta = async (ventaData) => {
  const res = await axios.post(API, ventaData);
  return res.data;
};
