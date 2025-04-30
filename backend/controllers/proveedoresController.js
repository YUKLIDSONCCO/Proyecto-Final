import {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from '../models/proveedoresModel.js';

export const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await getProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

export const obtenerProveedor = async (req, res) => {
  try {
    const proveedor = await getProveedorById(req.params.id);
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proveedor' });
  }
};

export const crearProveedor = async (req, res) => {
  try {
    const nuevo = await createProveedor(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

export const actualizarProveedor = async (req, res) => {
  try {
    const actualizado = await updateProveedor(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
};

export const eliminarProveedor = async (req, res) => {
  try {
    await deleteProveedor(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
};
