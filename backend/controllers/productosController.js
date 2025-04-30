const Producto = require('../models/Producto');

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.json(productos);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

exports.addProducto = async (req, res) => {
  try {
    await Producto.create(req.body);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (err) {
    console.error('Error al agregar producto:', err);
    res.status(500).json({ message: 'Error al agregar producto' });
  }
};

exports.updateProducto = async (req, res) => {
  const id = req.params.id;
  try {
    await Producto.update(id, req.body);
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

exports.deleteProducto = async (req, res) => {
  const id = req.params.id;
  try {
    await Producto.delete(id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
