import type{ ITS } from '../types/its.types';

// Base URL para el API - ajusta según tu configuración
const API_BASE_URL = 'http://localhost:8080/its';

// Servicio para interactuar con el API de ITS
export const itsService = {
  // Obtener todos los equipos ITS
  getAllITS: async (): Promise<ITS[]> => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los equipos ITS');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAllITS:', error);
      throw error;
    }
  },

  // Crear un nuevo equipo ITS
  createITS: async (its: Omit<ITS, 'id'>): Promise<ITS> => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(its),
      });
      if (!response.ok) {
        throw new Error('Error al crear el equipo ITS');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en createITS:', error);
      throw error;
    }
  },

  // Actualizar un equipo ITS existente
  updateITS: async (id: number, its: Omit<ITS, 'id'>): Promise<ITS> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(its),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el equipo ITS');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en updateITS:', error);
      throw error;
    }
  },

  // Eliminar un equipo ITS
  deleteITS: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el equipo ITS');
      }
    } catch (error) {
      console.error('Error en deleteITS:', error);
      throw error;
    }
  },
};
