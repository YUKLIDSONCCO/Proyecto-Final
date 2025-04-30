import { useEffect, useState } from 'react';

function ProductForm({ onAdd, productoEditar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: ''
  });

  useEffect(() => {
    if (productoEditar) {
      setProducto(productoEditar);
    } else {
      setProducto({ nombre: '', precio: '', stock: '' });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(producto);
    setProducto({ nombre: '', precio: '', stock: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>{productoEditar ? "Editar Producto" : "Agregar Producto"}</h4>
      <div className="form-group mb-2">
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
      </div>
      <div className="form-group mb-2">
        <input
          type="number"
          name="precio"
          className="form-control"
          value={producto.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
      </div>
      <div className="form-group mb-2">
        <input
          type="number"
          name="stock"
          className="form-control"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
      </div>
      <button type="submit" className="btn btn-success w-100">
        {productoEditar ? "Actualizar Producto" : "Agregar Producto"}
      </button>
    </form>
  );
}

export default ProductForm;
