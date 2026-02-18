// Tipos e interfaces para RoadSegment (Segmentos Viales)

import type { ITS } from './its.types';

export interface RoadSegment {
  id?: number;
  name: string;
  location: string;
  length: number;
  condition: string;
  itsList?: ITS[];
}

export interface RoadSegmentFormData {
  name: string;
  location: string;
  length: number;
  condition: string;
}

export type RoadCondition = 'Excelente' | 'Bueno' | 'Regular' | 'Malo';

export const ROAD_CONDITION_OPTIONS: RoadCondition[] = ['Excelente', 'Bueno', 'Regular', 'Malo'];
