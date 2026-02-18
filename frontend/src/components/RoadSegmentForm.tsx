import { useState, useEffect } from 'react';
import type { RoadSegment, RoadSegmentFormData } from '../types/roadSegment.types';
import styles from './RoadSegmentForm.module.css';

interface RoadSegmentFormProps {
  segment?: RoadSegment | null;
  onSubmit: (data: RoadSegmentFormData) => void;
  onCancel: () => void;
}

const RoadSegmentForm = ({ segment, onSubmit, onCancel }: RoadSegmentFormProps) => {
  const [formData, setFormData] = useState<RoadSegmentFormData>({
    name: '',
    location: '',
    length: 0,
    condition: 'Bueno'
  });

  useEffect(() => {
    if (segment) {
      setFormData({
        name: segment.name,
        location: segment.location,
        length: segment.length,
        condition: segment.condition
      });
    }
  }, [segment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'length' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className={styles.formContainer}>
      <h2>🛣️ {segment ? 'Editar Segmento Vial' : 'Agregar Nuevo Segmento Vial'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre del Segmento:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Autopista Norte Sector 1"
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
            placeholder="Ej: Desde Calle 100 hasta Calle 200"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="length">Longitud (km):</label>
          <input
            type="number"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            placeholder="Ej: 5.5"
            step="0.1"
            min="0.1"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="condition">Condición del Segmento:</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="Excelente">Excelente 🟢</option>
            <option value="Bueno">Bueno 🟡</option>
            <option value="Regular">Regular 🟠</option>
            <option value="Malo">Malo 🔴</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className="btn-submit">
            {segment ? '💾 Actualizar' : '✅ Guardar'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoadSegmentForm;
