import { useState, useEffect } from 'react';
import { itsService } from '../services/itsService';
import { roadSegmentService } from '../services/roadSegmentService';
import type { ITS, ITSFormData } from '../types/its.types';
import ITSCard from './ITSCard';
import ITSForm from './ITSForm';
import styles from './ITSList.module.css';

const ITSList = () => {
  const [itsList, setItsList] = useState<ITS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingITS, setEditingITS] = useState<ITS | null>(null);

  // Cargar equipos al montar el componente
  useEffect(() => {
    loadITSEquipment();
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

  const loadITSEquipment = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await itsService.getAllITS();
      setItsList(data);
    } catch (err) {
      setError('Error al cargar los equipos ITS. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: ITSFormData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      let assignmentError: string | null = null;
      
      // Crear el ITS
      const newITS = await itsService.createITS(formData);
      
      // Si tiene un roadSegmentId, asignar el ITS al segmento
      if (formData.roadSegmentId && newITS.id) {
        try {
          await roadSegmentService.assignITSToSegment(formData.roadSegmentId, newITS.id);
        } catch (err) {
          assignmentError = 'Error: El equipo ITS ya está asignado a este segmento vial o el segmento no existe';
          console.error(err);
        }
      }
      
      setShowForm(false);
      await loadITSEquipment();
      
      // Restaurar el error después de recargar, si hubo uno
      if (assignmentError) {
        setError(assignmentError);
      } else {
        setSuccessMessage('✅ Equipo ITS creado exitosamente');
      }
    } catch (err) {
      setError('Error al crear el equipo ITS');
      console.error(err);
    }
  };

  const handleUpdate = async (formData: ITSFormData) => {
    if (!editingITS?.id) return;
    
    try {
      setError(null);
      setSuccessMessage(null);
      let assignmentError: string | null = null;
      
      // Primero actualizar el ITS
      await itsService.updateITS(editingITS.id, formData);
      
      // Si tiene un roadSegmentId, asignar el ITS al segmento
      if (formData.roadSegmentId) {
        try {
          await roadSegmentService.assignITSToSegment(formData.roadSegmentId, editingITS.id);
        } catch (err) {
          assignmentError = 'Error: El equipo ITS ya está asignado a este segmento vial o el segmento no existe';
          console.error(err);
        }
      }
      
      setEditingITS(null);
      setShowForm(false);
      await loadITSEquipment();
      
      // Restaurar el error después de recargar, si hubo uno
      if (assignmentError) {
        setError(assignmentError);
      } else {
        setSuccessMessage('✅ Equipo ITS actualizado exitosamente');
      }
    } catch (err) {
      setError('Error al actualizar el equipo ITS');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      await itsService.deleteITS(id);
      await loadITSEquipment();
      setSuccessMessage('✅ Equipo ITS eliminado exitosamente');
    } catch (err) {
      setError('Error al eliminar el equipo ITS');
      console.error(err);
    }
  };

  const handleEdit = (its: ITS) => {
    setEditingITS(its);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingITS(null);
  };

  const handleNewEquipment = () => {
    setEditingITS(null);
    setShowForm(true);
  };

  if (loading) {
    return <div className={styles.loading}>⏳ Cargando equipos ITS...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🚦 Gestión de Equipos ITS</h1>
        <button 
          className="btn-new"
          onClick={handleNewEquipment}
          disabled={showForm}
        >
          ➕ Nuevo Equipo
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
        <ITSForm
          its={editingITS}
          onSubmit={editingITS ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <div className={styles.list}>
        {itsList.length === 0 ? (
          <div className={styles.emptyState}>
            <p>📭 No hay equipos ITS registrados</p>
            <p>Haz clic en "Nuevo Equipo" para agregar uno</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {itsList.map((its) => (
              <ITSCard
                key={its.id}
                its={its}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ITSList;
