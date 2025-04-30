import express from 'express';
import cors from 'cors';

import detalleVentaRoutes from './routes/detalleVentaRoutes.js';
import medicamentosRoutes from './routes/medicamentosRoutes.js';
import proveedoresRoutes from './routes/proveedoresRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import ventasRoutes from "./routes/ventas.js";
import clientesRoutes from './routes/clientesRoutes.js'; // ✅ Añadido

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/detalles-venta', detalleVentaRoutes);
app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/clientes', clientesRoutes); // ✅ Añadido
app.use('/api/ventas', ventasRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

export default app;
