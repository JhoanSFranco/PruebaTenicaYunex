package yunex_trafic.backend.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import yunex_trafic.backend.models.ITSModel;
import yunex_trafic.backend.models.RoadSegmentModel;
import yunex_trafic.backend.respositories.ITSRepository;
import yunex_trafic.backend.respositories.RoadSegmentRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoadSegmentServiceTest {

    @Mock
    private RoadSegmentRepository roadSegmentRepository;

    @Mock
    private ITSRepository itsRepository;

    @InjectMocks
    private RoadSegmentService roadSegmentService;

    private RoadSegmentModel testSegment;
    private ITSModel testITS;

    @BeforeEach
    void setUp() {
        testSegment = new RoadSegmentModel();
        testSegment.setId(1L);
        testSegment.setName("Autopista Norte");
        testSegment.setLocation("Bogotá - Km 0 a Km 15");
        testSegment.setLength(15.5);
        testSegment.setCondition("Excelente");

        testITS = new ITSModel();
        testITS.setId(1L);
        testITS.setType("Cámara CCTV");
        testITS.setLocation("Km 5 Norte");
        testITS.setStatus("Activo");
        testITS.setInstalation_date(LocalDate.now());
    }

    @Test
    void getAllRoadSegments_ShouldReturnListOfSegments() {
        // Arrange
        RoadSegmentModel segment2 = new RoadSegmentModel();
        segment2.setId(2L);
        segment2.setName("Avenida 68");
        segment2.setLocation("Bogotá - Calle 13 a Calle 170");
        segment2.setLength(22.3);
        segment2.setCondition("Bueno");

        List<RoadSegmentModel> expectedList = Arrays.asList(testSegment, segment2);
        when(roadSegmentRepository.findAll()).thenReturn(expectedList);

        // Act
        List<RoadSegmentModel> result = roadSegmentService.getAllRoadSegments();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Autopista Norte", result.get(0).getName());
        assertEquals("Avenida 68", result.get(1).getName());
        verify(roadSegmentRepository, times(1)).findAll();
    }

    @Test
    void createRoadSegment_ShouldSaveAndReturnSegment() {
        // Arrange
        when(roadSegmentRepository.save(any(RoadSegmentModel.class))).thenReturn(testSegment);

        // Act
        RoadSegmentModel result = roadSegmentService.createRoadSegment(testSegment);

        // Assert
        assertNotNull(result);
        assertEquals("Autopista Norte", result.getName());
        assertEquals(15.5, result.getLength());
        verify(roadSegmentRepository, times(1)).save(testSegment);
    }

    @Test
    void updateRoadSegment_WhenSegmentExists_ShouldUpdateAndReturn() {
        // Arrange
        RoadSegmentModel updatedDetails = new RoadSegmentModel();
        updatedDetails.setName("Autopista Norte - Actualizada");
        updatedDetails.setLocation("Bogotá - Km 0 a Km 20");
        updatedDetails.setLength(20.0);
        updatedDetails.setCondition("Bueno");

        when(roadSegmentRepository.findById(1L)).thenReturn(Optional.of(testSegment));
        when(roadSegmentRepository.save(any(RoadSegmentModel.class))).thenReturn(testSegment);

        // Act
        RoadSegmentModel result = roadSegmentService.updateRoadSegment(1L, updatedDetails);

        // Assert
        assertNotNull(result);
        assertEquals("Autopista Norte - Actualizada", testSegment.getName());
        assertEquals(20.0, testSegment.getLength());
        verify(roadSegmentRepository, times(1)).findById(1L);
        verify(roadSegmentRepository, times(1)).save(testSegment);
    }

    @Test
    void updateRoadSegment_WhenSegmentNotFound_ShouldThrowException() {
        // Arrange
        when(roadSegmentRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            roadSegmentService.updateRoadSegment(999L, testSegment);
        });

        assertTrue(exception.getMessage().contains("Road Segment not found"));
        verify(roadSegmentRepository, times(1)).findById(999L);
        verify(roadSegmentRepository, never()).save(any());
    }

    @Test
    void deleteRoadSegment_WhenSegmentExists_ShouldDeleteSuccessfully() {
        // Arrange
        when(roadSegmentRepository.existsById(1L)).thenReturn(true);
        doNothing().when(roadSegmentRepository).deleteById(1L);

        // Act
        roadSegmentService.deleteRoadSegment(1L);

        // Assert
        verify(roadSegmentRepository, times(1)).existsById(1L);
        verify(roadSegmentRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteRoadSegment_WhenSegmentNotFound_ShouldThrowException() {
        // Arrange
        when(roadSegmentRepository.existsById(999L)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            roadSegmentService.deleteRoadSegment(999L);
        });

        assertTrue(exception.getMessage().contains("Road Segment not found"));
        verify(roadSegmentRepository, times(1)).existsById(999L);
        verify(roadSegmentRepository, never()).deleteById(anyLong());
    }

    @Test
    void assignITSToSegment_WhenBothExist_ShouldAssignSuccessfully() {
        // Arrange
        when(roadSegmentRepository.findById(1L)).thenReturn(Optional.of(testSegment));
        when(itsRepository.findById(1L)).thenReturn(Optional.of(testITS));
        when(roadSegmentRepository.save(any(RoadSegmentModel.class))).thenReturn(testSegment);

        // Act
        RoadSegmentModel result = roadSegmentService.assignITSToSegment(1L, 1L);

        // Assert
        assertNotNull(result);
        assertTrue(testSegment.getItsList().contains(testITS));
        assertEquals(testSegment, testITS.getRoadSegment());
        verify(roadSegmentRepository, times(1)).findById(1L);
        verify(itsRepository, times(1)).findById(1L);
        verify(roadSegmentRepository, times(1)).save(testSegment);
    }

    @Test
    void assignITSToSegment_WhenSegmentNotFound_ShouldThrowException() {
        // Arrange
        when(roadSegmentRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            roadSegmentService.assignITSToSegment(999L, 1L);
        });

        assertTrue(exception.getMessage().contains("Road Segment not found"));
        verify(roadSegmentRepository, times(1)).findById(999L);
        verify(itsRepository, never()).findById(anyLong());
    }

    @Test
    void assignITSToSegment_WhenITSNotFound_ShouldThrowException() {
        // Arrange
        when(roadSegmentRepository.findById(1L)).thenReturn(Optional.of(testSegment));
        when(itsRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            roadSegmentService.assignITSToSegment(1L, 999L);
        });

        assertTrue(exception.getMessage().contains("ITS not found"));
        verify(roadSegmentRepository, times(1)).findById(1L);
        verify(itsRepository, times(1)).findById(999L);
    }

    @Test
    void getITSBySegment_WhenSegmentExists_ShouldReturnITSList() {
        // Arrange
        testSegment.addITS(testITS);
        when(roadSegmentRepository.findById(1L)).thenReturn(Optional.of(testSegment));

        // Act
        List<ITSModel> result = roadSegmentService.getITSBySegment(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Cámara CCTV", result.get(0).getType());
        verify(roadSegmentRepository, times(1)).findById(1L);
    }

    @Test
    void getITSBySegment_WhenSegmentNotFound_ShouldThrowException() {
        // Arrange
        when(roadSegmentRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            roadSegmentService.getITSBySegment(999L);
        });

        assertTrue(exception.getMessage().contains("Road Segment not found"));
        verify(roadSegmentRepository, times(1)).findById(999L);
    }

    @Test
    void getAllRoadSegments_WhenEmpty_ShouldReturnEmptyList() {
        // Arrange
        when(roadSegmentRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<RoadSegmentModel> result = roadSegmentService.getAllRoadSegments();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(roadSegmentRepository, times(1)).findAll();
    }
}
