// backend/controllers/clientesController.js
import {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
  } from '../models/clientesModel.js';
  
  export const obtenerClientes = async (req, res) => {
    try {
      const clientes = await getClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  };
  
  export const obtenerCliente = async (req, res) => {
    try {
      const cliente = await getClienteById(req.params.id);
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el cliente' });
    }
  };
  
  export const crearCliente = async (req, res) => {
    try {
      const nuevo = await createCliente(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear cliente' });
    }
  };
  
  export const actualizarCliente = async (req, res) => {
    try {
      const actualizado = await updateCliente(req.params.id, req.body);
      res.json(actualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  };
  
  export const eliminarCliente = async (req, res) => {
    try {
      await deleteCliente(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  };
  