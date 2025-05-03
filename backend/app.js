<<<<<<< HEAD
// backend/app.js
import express from 'express';
import cors from 'cors';

// Importa las rutas usando 'import'
=======
import express from 'express';
import cors from 'cors';

>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
import detalleVentaRoutes from './routes/detalleVentaRoutes.js';
import medicamentosRoutes from './routes/medicamentosRoutes.js';
import proveedoresRoutes from './routes/proveedoresRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
<<<<<<< HEAD
import ventasRoutes from './routes/ventas.js';
import clientesRoutes from './routes/clientesRoutes.js';
import authRoutes from './routes/authRoutes.js';  // ✅
=======
import ventasRoutes from "./routes/ventas.js";
import clientesRoutes from './routes/clientesRoutes.js'; // ✅ Añadido
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/detalles-venta', detalleVentaRoutes);
app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/empleados', empleadosRoutes);
<<<<<<< HEAD
app.use('/api/clientes', clientesRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/auth', authRoutes);  // ✅
=======
app.use('/api/clientes', clientesRoutes); // ✅ Añadido
app.use('/api/ventas', ventasRoutes);
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

export default app;
