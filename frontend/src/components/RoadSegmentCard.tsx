import { useState } from 'react';
import type { RoadSegment } from '../types/roadSegment.types';
import type { ITS } from '../types/its.types';
import styles from './RoadSegmentCard.module.css';

interface RoadSegmentCardProps {
  segment: RoadSegment;
  onEdit: (segment: RoadSegment) => void;
  onDelete: (id: number) => void;
  onViewITS: (segment: RoadSegment) => void;
}

const RoadSegmentCard = ({ segment, onEdit, onDelete, onViewITS }: RoadSegmentCardProps) => {
  const [showITS, setShowITS] = useState(false);

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excelente':
        return '🟢';
      case 'bueno':
        return '🟡';
      case 'regular':
        return '🟠';
      case 'malo':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const toggleITSView = () => {
    setShowITS(!showITS);
    if (!showITS) {
      onViewITS(segment);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>🛣️ {segment.name}</h3>
        <div className={styles.cardActions}>
          <button 
            className="btn-edit"
            onClick={() => onEdit(segment)}
            title="Editar"
          >
            ✏️ Editar
          </button>
          <button 
            className="btn-delete"
            onClick={() => segment.id && onDelete(segment.id)}
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <span className={styles.label}>ID:</span>
          <span className={styles.value}>{segment.id}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Ubicación:</span>
          <span className={styles.value}>{segment.location}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Longitud:</span>
          <span className={styles.value}>{segment.length} km</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Condición:</span>
          <span className={styles.value}>
            {segment.condition} {getConditionColor(segment.condition)}
          </span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Equipos ITS:</span>
          <span className={styles.value}>
            {segment.itsList?.length || 0} equipo(s)
          </span>
        </div>
      </div>

      {segment.itsList && segment.itsList.length > 0 && (
        <div className={styles.itsSection}>
          <button 
            className={styles.btnToggleIts}
            onClick={toggleITSView}
          >
            {showITS ? '▼ Ocultar Equipos ITS' : '▶ Ver Equipos ITS'}
          </button>
          
          {showITS && (
            <div className={styles.itsListMini}>
              {segment.itsList.map((its: ITS) => (
                <div key={its.id} className={styles.itsMiniCard}>
                  <div className={styles.itsMiniHeader}>
                    <strong>🚦 {its.type}</strong>
                    <span className={`${styles.statusBadge} ${styles[`status${its.status}`]}`}>
                      {its.status}
                    </span>
                  </div>
                  <div className={styles.itsMiniLocation}>📍 {its.location}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadSegmentCard;
