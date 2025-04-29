// ... importaciones ...
//los cruds que faltaba completar agregando datos escenciales 
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function SaleForm() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [itemsVenta, setItemsVenta] = useState([]);
  const [boleta, setBoleta] = useState(null);
  const [mensajeVenta, setMensajeVenta] = useState("");

  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");

  const boletaRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, empleadosRes, productosRes] = await Promise.all([
          axios.get("http://localhost:3000/api/clientes"),
          axios.get("http://localhost:3000/api/empleados"),
          axios.get("http://localhost:3000/api/medicamentos")
        ]);
        setClientes(clientesRes.data);
        setEmpleados(empleadosRes.data);
        setProductos(productosRes.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleAgregarItem = () => {
    if (!productoSeleccionado || cantidad < 1) return;

    const producto = productos.find(p => p.id === Number(productoSeleccionado));
    if (!producto) return;

    const existente = itemsVenta.find(i => i.id === producto.id);
    const precio = parseFloat(producto.precio_venta) || 0;

    if (existente) {
      setItemsVenta(itemsVenta.map(i =>
        i.id === producto.id
          ? { ...i, cantidad: i.cantidad + cantidad }
          : i
      ));
    } else {
      setItemsVenta([
        ...itemsVenta,
        {
          id: producto.id,
          nombre: producto.nombre_comercial,
          cantidad,
          precio
        }
      ]);
    }

    setCantidad(1);
    setProductoSeleccionado("");
  };

  const handleEliminarItem = (id) => {
    setItemsVenta(itemsVenta.filter(i => i.id !== id));
  };

  const calcularTotal = (items = itemsVenta) => {
    return items.reduce((total, item) => total + item.cantidad * item.precio, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemsVenta.length === 0 || !clienteSeleccionado || !empleadoSeleccionado) return;

    const totalVenta = calcularTotal();

    try {
      const ventaRes = await axios.post("http://localhost:3000/api/ventas", {
        fecha: new Date().toISOString().split('T')[0],
        total: totalVenta,
        cliente_id: clienteSeleccionado,
        empleado_id: empleadoSeleccionado
      });

      const ventaId = ventaRes.data.id;

      for (const item of itemsVenta) {
        await axios.post("http://localhost:3000/api/detalles-venta", {
          venta_id: ventaId,
          medicamento_id: item.id,
          cantidad: item.cantidad,
          precio_unitario: item.precio
        });
      }

      const copiaItems = [...itemsVenta]; // ✅ COPIA antes de vaciar
      setBoleta(copiaItems);
      setItemsVenta([]);
      setMensajeVenta("✅ ¡Venta registrada exitosamente!");
      setTimeout(() => setMensajeVenta(""), 3000);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("❌ Error al registrar la venta.");
    }
  };

  const handleImprimirBoleta = () => {
    const printContent = boletaRef.current.innerHTML;
    const ventana = window.open('', '', 'height=600,width=800');
    ventana.document.write('<html><head><title>Boleta de Venta</title>');
    ventana.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ccc; padding: 8px; text-align: left; } </style>');
    ventana.document.write('</head><body>');
    ventana.document.write(printContent);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-4">Registrar Nueva Venta</h4>

        {mensajeVenta && (
          <div className="alert alert-success">{mensajeVenta}</div>
        )}

        {/* Selects de cliente y empleado */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(e.target.value)}
              required
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Empleado</label>
            <select
              className="form-select"
              value={empleadoSeleccionado}
              onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
              required
            >
              <option value="">Selecciona un empleado</option>
              {empleados.map((e) => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Selección de medicamento */}
        <div className="row mb-3">
          <div className="col-md-8">
            <label className="form-label">Medicamento</label>
            <select
              className="form-select"
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
            >
              <option value="">Selecciona un medicamento</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre_comercial}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mb-3">
          <button type="button" className="btn btn-success" onClick={handleAgregarItem}>
            ➕ Añadir producto
          </button>
        </div>

        {/* Lista de productos añadidos */}
        {itemsVenta.length > 0 && (
          <div className="mb-3">
            <h5>🧾 Detalles de la venta:</h5>
            <ul className="list-group">
              {itemsVenta.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.nombre} - {item.cantidad} unidad(es)
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminarItem(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="btn btn-primary mb-4">
          ✅ Confirmar Venta
        </button>

        {/* Boleta de venta */}
        {boleta && (
          <>
            <div className="card mb-4 shadow-sm" ref={boletaRef}>
              <div className="card-header bg-primary text-white">Boleta de Venta</div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boleta.map(item => (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>S/ {item.precio.toFixed(2)}</td>
                        <td>S/ {(item.cantidad * item.precio).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3"><strong>Total</strong></td>
                      <td><strong>S/ {calcularTotal(boleta).toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <button type="button" className="btn btn-outline-secondary" onClick={handleImprimirBoleta}>
              🖨️ Imprimir Boleta
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default SaleForm;
