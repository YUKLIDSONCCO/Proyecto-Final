import React from "react";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <div className="mt-5">
      <h3>Productos Registrados</h3>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay productos registrados.</td>
            </tr>
          ) : (
            products.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>S/. {producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
