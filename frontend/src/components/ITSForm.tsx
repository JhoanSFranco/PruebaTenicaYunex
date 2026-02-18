import { useState, useEffect } from 'react';
import type { ITS, ITSFormData } from '../types/its.types';
import styles from './ITSForm.module.css';

interface ITSFormProps {
  its?: ITS | null;
  onSubmit: (data: ITSFormData) => void;
  onCancel: () => void;
}

const ITSForm = ({ its, onSubmit, onCancel }: ITSFormProps) => {
  const [formData, setFormData] = useState<ITSFormData>({
    type: '',
    location: '',
    status: 'Activo',
    instalation_date: new Date().toISOString().split('T')[0],
    roadSegmentId: null
  });

  useEffect(() => {
    if (its) {
      setFormData({
        type: its.type,
        location: its.location,
        status: its.status,
        instalation_date: its.instalation_date.split('T')[0],
        roadSegmentId: its.roadSegment?.id || null
      });
    }
  }, [its]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'roadSegmentId' ? (value ? parseInt(value) : null) : value
    }));
  };

  return (
    <div className={styles.formContainer}>
      <h2>{its ? 'Editar Equipo ITS' : 'Agregar Nuevo Equipo ITS'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="type">Tipo de Equipo:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Ej: Cámara de Tráfico, Sensor, Semáforo..."
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Ubicación:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej: Calle 100 con Carrera 15"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Estado:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="instalation_date">Fecha de Instalación:</label>
          <input
            type="date"
            id="instalation_date"
            name="instalation_date"
            value={formData.instalation_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="roadSegmentId">ID Segmento de Carretera (opcional):</label>
          <input
            type="number"
            id="roadSegmentId"
            name="roadSegmentId"
            value={formData.roadSegmentId || ''}
            onChange={handleChange}
            placeholder="Deja vacío si no aplica"
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className="btn-submit">
            {its ? '💾 Actualizar' : '✅ Guardar'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ITSForm;
