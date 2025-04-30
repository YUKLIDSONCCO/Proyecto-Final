import axios from "axios";

const API = "http://localhost:3000/api"; // <- CORREGIDO

// Funciones individuales
export const getProductos = async () => {
  const res = await axios.get(`${API}/productos`);
  return res.data;
};

export const addProducto = async (producto) => {
  await axios.post(`${API}/productos`, producto);
};

export const updateProducto = async (id, producto) => {
  await axios.put(`${API}/productos/${id}`, producto);
};

export const deleteProducto = async (id) => {
  await axios.delete(`${API}/productos/${id}`);
};

export const realizarVenta = async (venta) => {
  await axios.post(`${API}/ventas`, venta);
};

// 👇 Agrega esto al final del archivo para usarlo como default export
export default axios.create({
  baseURL: API,
});
