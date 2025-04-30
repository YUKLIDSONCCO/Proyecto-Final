import {
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
  } from '../models/empleadoModel.js';
  
  export const obtenerEmpleados = async (req, res) => {
    try {
      const empleados = await getAllEmpleados();
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener empleados' });
    }
  };
  
  export const obtenerEmpleado = async (req, res) => {
    try {
      const empleado = await getEmpleadoById(req.params.id);
      if (empleado) {
        res.json(empleado);
      } else {
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener empleado' });
    }
  };
  
  export const crearEmpleado = async (req, res) => {
    try {
      const nuevoEmpleado = await createEmpleado(req.body);
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear empleado' });
    }
  };
  
  export const actualizarEmpleado = async (req, res) => {
    try {
      await updateEmpleado(req.params.id, req.body);
      res.json({ mensaje: 'Empleado actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar empleado' });
    }
  };
  
  export const eliminarEmpleado = async (req, res) => {
    try {
      await deleteEmpleado(req.params.id);
      res.json({ mensaje: 'Empleado eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar empleado' });
    }
  };
  