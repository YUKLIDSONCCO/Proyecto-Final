import db from './db.js';

export const getAllMedicamentos = async () => {
  const [rows] = await db.execute('SELECT * FROM medicamentos');
  return rows;
};

export const getMedicamentoById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM medicamentos WHERE id = ?', [id]);
  return rows[0];
};

export const createMedicamento = async (medicamento) => {
  const {
    nombre_comercial,
    nombre_generico,
    descripcion,
    laboratorio,
    concentracion,
    forma_farmaceutica,
    precio_compra,
    precio_venta,
    stock,
    fecha_vencimiento,
    proveedor_id,
  } = medicamento;

  // Validaciones simples
  if (!nombre_comercial || !precio_compra || !precio_venta || !stock || !proveedor_id) {
    throw new Error('Faltan campos obligatorios');
  }

  if (isNaN(proveedor_id)) {
    throw new Error('ID de proveedor no válido');
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO medicamentos 
        (nombre_comercial, nombre_generico, descripcion, laboratorio, concentracion, forma_farmaceutica,
         precio_compra, precio_venta, stock, fecha_vencimiento, proveedor_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre_comercial, nombre_generico, descripcion, laboratorio, concentracion, forma_farmaceutica,
       precio_compra, precio_venta, stock, fecha_vencimiento, proveedor_id]
    );

    return { id: result.insertId, ...medicamento };
  } catch (error) {
    console.error('❌ Error al insertar medicamento:', error.message);
    throw new Error('No se pudo crear el medicamento. Verifica los datos.');
  }
};

export const updateMedicamento = async (id, medicamento) => {
  const {
    nombre_comercial,
    nombre_generico,
    descripcion,
    laboratorio,
    concentracion,
    forma_farmaceutica,
    precio_compra,
    precio_venta,
    stock,
    fecha_vencimiento,
    proveedor_id,
  } = medicamento;

  if (!id || isNaN(id)) {
    throw new Error('ID inválido para actualizar');
  }

  try {
    await db.execute(
      `UPDATE medicamentos SET 
        nombre_comercial = ?, nombre_generico = ?, descripcion = ?, laboratorio = ?, concentracion = ?,
        forma_farmaceutica = ?, precio_compra = ?, precio_venta = ?, stock = ?, fecha_vencimiento = ?, proveedor_id = ?
       WHERE id = ?`,
      [nombre_comercial, nombre_generico, descripcion, laboratorio, concentracion, forma_farmaceutica,
       precio_compra, precio_venta, stock, fecha_vencimiento, proveedor_id, id]
    );

    return { id, ...medicamento };
  } catch (error) {
    console.error('❌ Error al actualizar medicamento:', error.message);
    throw new Error('No se pudo actualizar el medicamento.');
  }
};

export const deleteMedicamento = async (id) => {
  try {
    await db.execute('DELETE FROM medicamentos WHERE id = ?', [id]);
  } catch (error) {
    console.error('❌ Error al eliminar medicamento:', error.message);
    throw new Error('No se pudo eliminar el medicamento.');
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
