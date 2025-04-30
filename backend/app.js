// backend/app.js
import express from 'express';
import cors from 'cors';

// Importa las rutas usando 'import'
import detalleVentaRoutes from './routes/detalleVentaRoutes.js';
import medicamentosRoutes from './routes/medicamentosRoutes.js';
import proveedoresRoutes from './routes/proveedoresRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import ventasRoutes from './routes/ventas.js';
import clientesRoutes from './routes/clientesRoutes.js';
import authRoutes from './routes/authRoutes.js';  // ✅

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/detalles-venta', detalleVentaRoutes);
app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/auth', authRoutes);  // ✅

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

export default app;
