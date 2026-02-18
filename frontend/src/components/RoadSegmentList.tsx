import { useState, useEffect } from 'react';
import { roadSegmentService } from '../services/roadSegmentService';
import type { RoadSegment, RoadSegmentFormData } from '../types/roadSegment.types';
import RoadSegmentCard from './RoadSegmentCard';
import RoadSegmentForm from './RoadSegmentForm';

const RoadSegmentList = () => {
  const [segmentsList, setSegmentsList] = useState<RoadSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSegment, setEditingSegment] = useState<RoadSegment | null>(null);

  // Cargar segmentos al montar el componente
  useEffect(() => {
    loadRoadSegments();
  }, []);

  // Auto-limpiar mensajes de éxito después de 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const loadRoadSegments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await roadSegmentService.getAllRoadSegments();
      setSegmentsList(data);
    } catch (err) {
      setError('Error al cargar los segmentos viales. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: RoadSegmentFormData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      await roadSegmentService.createRoadSegment(formData);
      setShowForm(false);
      await loadRoadSegments();
      setSuccessMessage('✅ Segmento vial creado exitosamente');
    } catch (err) {
      setError('Error al crear el segmento vial');
      console.error(err);
    }
  };

  const handleUpdate = async (formData: RoadSegmentFormData) => {
    if (!editingSegment?.id) return;
    
    try {
      setError(null);
      setSuccessMessage(null);
      await roadSegmentService.updateRoadSegment(editingSegment.id, formData);
      setEditingSegment(null);
      setShowForm(false);
      await loadRoadSegments();
      setSuccessMessage('✅ Segmento vial actualizado exitosamente');
    } catch (err) {
      setError('Error al actualizar el segmento vial');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este segmento vial?')) {
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      await roadSegmentService.deleteRoadSegment(id);
      await loadRoadSegments();
      setSuccessMessage('✅ Segmento vial eliminado exitosamente');
    } catch (err) {
      setError('Error al eliminar el segmento vial');
      console.error(err);
    }
  };

  const handleEdit = (segment: RoadSegment) => {
    setEditingSegment(segment);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSegment(null);
  };

  const handleNewSegment = () => {
    setEditingSegment(null);
    setShowForm(true);
  };

  const handleViewITS = async (segment: RoadSegment) => {
    // Esta función se puede expandir para cargar ITS en tiempo real si es necesario
    // Por ahora, los ITS ya vienen en el objeto segment desde el backend
    if (segment.id) {
      try {
        const itsList = await roadSegmentService.getITSBySegment(segment.id);
        console.log('ITS del segmento:', itsList);
      } catch (err) {
        console.error('Error al cargar ITS del segmento:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">⏳ Cargando segmentos viales...</div>;
  }

  return (
    <div className="road-segment-list-container">
      <div className="road-segment-header">
        <h1>🛣️ Gestión de Segmentos Viales</h1>
        <button 
          className="btn-new"
          onClick={handleNewSegment}
          disabled={showForm}
        >
          ➕ Nuevo Segmento
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {showForm && (
        <RoadSegmentForm
          segment={editingSegment}
          onSubmit={editingSegment ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <div className="road-segment-list">
        {segmentsList.length === 0 ? (
          <div className="empty-state">
            <p>📭 No hay segmentos viales registrados</p>
            <p>Haz clic en "Nuevo Segmento" para agregar uno</p>
          </div>
        ) : (
          <div className="road-segment-grid">
            {segmentsList.map((segment) => (
              <RoadSegmentCard
                key={segment.id}
                segment={segment}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewITS={handleViewITS}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadSegmentList;
