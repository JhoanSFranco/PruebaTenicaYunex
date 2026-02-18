import type { RoadSegment, RoadSegmentFormData } from '../types/roadSegment.types';
import type { ITS } from '../types/its.types';

// Base URL para el API - ajusta según tu configuración
const API_BASE_URL = 'http://localhost:8080/road-segments';

// Servicio para interactuar con el API de RoadSegment
export const roadSegmentService = {
  // Obtener todos los segmentos viales
  getAllRoadSegments: async (): Promise<RoadSegment[]> => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los segmentos viales');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAllRoadSegments:', error);
      throw error;
    }
  },

  // Crear un nuevo segmento vial
  createRoadSegment: async (roadSegment: RoadSegmentFormData): Promise<RoadSegment> => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roadSegment),
      });
      if (!response.ok) {
        throw new Error('Error al crear el segmento vial');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en createRoadSegment:', error);
      throw error;
    }
  },

  // Actualizar un segmento vial existente
  updateRoadSegment: async (id: number, roadSegment: RoadSegmentFormData): Promise<RoadSegment> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roadSegment),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el segmento vial');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en updateRoadSegment:', error);
      throw error;
    }
  },

  // Eliminar un segmento vial
  deleteRoadSegment: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el segmento vial');
      }
    } catch (error) {
      console.error('Error en deleteRoadSegment:', error);
      throw error;
    }
  },

  // Obtener equipos ITS de un segmento específico
  getITSBySegment: async (segmentId: number): Promise<ITS[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${segmentId}/its`);
      if (!response.ok) {
        throw new Error('Error al obtener los equipos ITS del segmento');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getITSBySegment:', error);
      throw error;
    }
  },

  // Asignar un equipo ITS a un segmento vial
  assignITSToSegment: async (segmentId: number, itsId: number): Promise<RoadSegment> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${segmentId}/its/${itsId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Error al asignar el equipo ITS al segmento');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en assignITSToSegment:', error);
      throw error;
    }
  },
};
