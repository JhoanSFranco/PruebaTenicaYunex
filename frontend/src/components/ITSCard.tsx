import type { ITS } from '../types/its.types';

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
    <div className="its-card">

      <div className="its-card-header">
        <h3>ID: {its.id}</h3>

        <div className="its-card-actions">
            
        
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
      <div className="its-card-body">
        <div className="its-info-row">
          <span >Tipo:</span>
          <span >{its.type}</span>
        </div>
        
        <div className="its-info-row">
          <span >Ubicación:</span>
          <span >{its.location}</span>
        </div>
        
        <div className="its-info-row">
          <span>Estado:</span>
          <span>
            {its.status} {getStatusEmoji(its.status)}
          </span>
        </div>
        
        <div className="its-info-row">
          <span >Fecha de Instalación:</span>
          <span > {formatDate(its.instalation_date)}</span>
        </div>
        
        {its.roadSegment && (
          <div className="its-info-row">
            <span >Segmento:</span>
            <span >{its.roadSegment.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ITSCard;
