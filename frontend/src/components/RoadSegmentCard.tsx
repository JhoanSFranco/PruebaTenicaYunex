import { useState } from 'react';
import type { RoadSegment } from '../types/roadSegment.types';
import type { ITS } from '../types/its.types';

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
    <div className="road-segment-card">
      <div className="road-segment-card-header">
        <h3>🛣️ {segment.name}</h3>
        <div className="road-segment-card-actions">
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
      
      <div className="road-segment-card-body">
        <div className="road-segment-info-row">
          <span className="road-segment-label">ID:</span>
          <span className="road-segment-value">{segment.id}</span>
        </div>

        <div className="road-segment-info-row">
          <span className="road-segment-label">Ubicación:</span>
          <span className="road-segment-value">{segment.location}</span>
        </div>
        
        <div className="road-segment-info-row">
          <span className="road-segment-label">Longitud:</span>
          <span className="road-segment-value">{segment.length} km</span>
        </div>
        
        <div className="road-segment-info-row">
          <span className="road-segment-label">Condición:</span>
          <span className="road-segment-value">
            {segment.condition} {getConditionColor(segment.condition)}
          </span>
        </div>

        <div className="road-segment-info-row">
          <span className="road-segment-label">Equipos ITS:</span>
          <span className="road-segment-value">
            {segment.itsList?.length || 0} equipo(s)
          </span>
        </div>
      </div>

      {segment.itsList && segment.itsList.length > 0 && (
        <div className="road-segment-its-section">
          <button 
            className="btn-toggle-its"
            onClick={toggleITSView}
          >
            {showITS ? '▼ Ocultar Equipos ITS' : '▶ Ver Equipos ITS'}
          </button>
          
          {showITS && (
            <div className="its-list-mini">
              {segment.itsList.map((its: ITS) => (
                <div key={its.id} className="its-mini-card">
                  <div className="its-mini-header">
                    <strong>🚦 {its.type}</strong>
                    <span className={`status-badge status-${its.status.toLowerCase()}`}>
                      {its.status}
                    </span>
                  </div>
                  <div className="its-mini-location">📍 {its.location}</div>
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
