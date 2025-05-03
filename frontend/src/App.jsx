<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import EmpleadoForm from './components/EmpleadoForm';
import EmpleadoList from './components/EmpleadoList';
import MedicamentoForm from './components/MedicamentoForm';
import MedicamentoList from './components/MedicamentoList';
import ProveedorForm from './components/ProveedorForm';
import ProveedorList from './components/ProveedorList';
import SaleForm from './components/SaleForm';
import DetalleVentaForm from './components/DetalleVentaForm';
import Login from './components/Login';

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
=======
import './App.css';
import { useState, useRef } from 'react';
import MedicamentoForm from './components/MedicamentoForm';
import MedicamentoList from './components/MedicamentoList';
import SaleForm from './components/SaleForm';
import DetalleVentaForm from './components/DetalleVentaForm';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import ProveedorForm from './components/ProveedorForm';
import ProveedorList from './components/ProveedorList';
import EmpleadoForm from './components/EmpleadoForm';
import EmpleadoList from './components/EmpleadoList';

function App() {
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
  const [seccionActiva, setSeccionActiva] = useState('clientes');
  const [empleadoEdit, setEmpleadoEdit] = useState(null);
  const [clienteEdit, setClienteEdit] = useState(null);
  const clienteListRef = useRef();

<<<<<<< HEAD
  // Recuperar sesión desde localStorage al cargar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuarioAutenticado(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Guardar sesión al iniciar sesión
  const handleLogin = (usuario) => {
    setUsuarioAutenticado(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  // Cerrar sesión
  const handleLogout = () => {
    setUsuarioAutenticado(null);
    localStorage.removeItem('usuario');
  };

  if (!usuarioAutenticado) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="display-4">✨ Farmacia Vida y Salud ✨ </h1>
        <p className="lead">Sistema de Gestión de Inventario y Ventas</p>
        <p className="lead">Bienvenido, {usuarioAutenticado.nombre}</p>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
=======
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="display-4">💊 Farmacia Vida y salud</h1>
        <p className="lead">Sistema de Gestión de Inventario y Ventas</p>
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
      </div>

      {/* Panel de navegación */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        <button className="btn btn-info text-white" onClick={() => setSeccionActiva('clientes')}>Gestión de Clientes</button>
        <button className="btn btn-warning text-dark" onClick={() => setSeccionActiva('proveedores')}>Gestión de Proveedores</button>
        <button className="btn btn-dark text-white" onClick={() => setSeccionActiva('empleados')}>Gestión de Empleados</button>
        <button className="btn btn-primary text-white" onClick={() => setSeccionActiva('medicamentos')}>Gestión de Medicamentos</button>
        <button className="btn btn-success text-white" onClick={() => setSeccionActiva('ventas')}>Registrar Venta</button>
        <button className="btn btn-secondary text-white" onClick={() => setSeccionActiva('detalle')}>Detalle Venta</button>
      </div>

      {/* Secciones condicionales */}
      {seccionActiva === 'clientes' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-info text-white">
            <h2 className="h5 mb-0">Gestión de Clientes</h2>
          </div>
          <div className="card-body">
            <ClienteForm
              clienteEdit={clienteEdit}
              setClienteEdit={setClienteEdit}
              onClienteAgregado={() => {
                clienteListRef.current?.recargar();
                setClienteEdit(null);
              }}
            />
            <hr />
            <ClienteList ref={clienteListRef} onEdit={setClienteEdit} />
          </div>
        </div>
      )}

      {seccionActiva === 'proveedores' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-warning text-dark">
            <h2 className="h5 mb-0">Gestión de Proveedores</h2>
          </div>
          <div className="card-body">
            <ProveedorForm />
            <hr />
            <ProveedorList />
          </div>
        </div>
      )}

      {seccionActiva === 'empleados' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-dark text-white">
            <h2 className="h5 mb-0">Gestión de Empleados</h2>
          </div>
          <div className="card-body">
            <EmpleadoForm empleadoEdit={empleadoEdit} setEmpleadoEdit={setEmpleadoEdit} />
            <hr />
            <EmpleadoList onEdit={setEmpleadoEdit} />
          </div>
        </div>
      )}

      {seccionActiva === 'medicamentos' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0">Gestión de Medicamentos</h2>
          </div>
          <div className="card-body">
            <MedicamentoForm />
            <hr />
            <MedicamentoList />
          </div>
        </div>
      )}

      {seccionActiva === 'ventas' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-success text-white">
            <h2 className="h5 mb-0">Registrar Venta</h2>
          </div>
          <div className="card-body">
            <SaleForm />
          </div>
        </div>
      )}

      {seccionActiva === 'detalle' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-secondary text-white">
            <h2 className="h5 mb-0">Detalle de Venta</h2>
          </div>
          <div className="card-body">
            <DetalleVentaForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
