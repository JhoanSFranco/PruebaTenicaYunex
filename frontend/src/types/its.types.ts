// Tipos e interfaces para ITS (Intelligent Traffic Systems)

export interface ITS {
  id?: number;
  type: string;
  location: string;
  status: string;
  instalation_date: string;
  roadSegment?: RoadSegment | null;
}

export interface RoadSegment {
  id: number;
  name: string;
  length: number;
  traffic_level: string;
}

export interface ITSFormData {
  type: string;
  location: string;
  status: string;
  instalation_date: string;
  roadSegmentId?: number | null;
}

export type ITSStatus = 'Activo' | 'Inactivo' | 'Mantenimiento';

export const ITS_STATUS_OPTIONS: ITSStatus[] = ['Activo', 'Inactivo', 'Mantenimiento'];
