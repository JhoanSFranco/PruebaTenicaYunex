import type { ITS } from '../types/its.types';
import styles from './ITSCard.module.css';

interface ITSCardProps {
  its: ITS;
  onEdit: (its: ITS) => void;
  onDelete: (id: number) => void;
}

const ITSCard = ({ its, onEdit, onDelete }: ITSCardProps) => {
  const getStatusEmoji = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return '🟢';
      case 'inactivo':
        return '🔴';
      case 'mantenimiento':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>ID: {its.id}</h3>
        <div className={styles.cardActions}>
          <button 
            className="btn-edit"
            onClick={() => onEdit(its)}
            title="Editar"
          >
            Editar
          </button>
          <button 

            className="btn-delete"
            onClick={() => its.id && onDelete(its.id)}
            title="Eliminar"
          >
            Eliminar
          </button>
        </div>
      </div>
      
      {/* INFO OF ITS  */}
      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Tipo:</span>
          <span className={styles.value}>{its.type}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Ubicación:</span>
          <span className={styles.value}>{its.location}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Estado:</span>
          <span className={styles.value}>
            {its.status} {getStatusEmoji(its.status)}
          </span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Fecha de Instalación:</span>
          <span className={styles.value}>{formatDate(its.instalation_date)}</span>
        </div>
        
        {its.roadSegment && (
          <div className={styles.infoRow}>
            <span className={styles.label}>Segmento:</span>
            <span className={styles.value}>{its.roadSegment.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ITSCard;
