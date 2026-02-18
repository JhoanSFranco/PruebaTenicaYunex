package yunex_trafic.backend.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import yunex_trafic.backend.models.ITSModel;
import yunex_trafic.backend.respositories.ITSRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ITSServiceTest {

    @Mock
    private ITSRepository itsRepository;

    @InjectMocks
    private ITSService itsService;

    private ITSModel testITS;

    @BeforeEach
    void setUp() {
        testITS = new ITSModel();
        testITS.setId(1L);
        testITS.setType("Cámara CCTV");
        testITS.setLocation("Km 5 Norte");
        testITS.setStatus("Activo");
        testITS.setInstalation_date(LocalDate.of(2023, 1, 15));
    }

    @Test
    void getAllITS_ShouldReturnListOfITS() {
        // Arrange
        ITSModel its2 = new ITSModel();
        its2.setId(2L);
        its2.setType("Sensor de Velocidad");
        its2.setLocation("Km 10 Sur");
        its2.setStatus("Activo");
        its2.setInstalation_date(LocalDate.now());

        List<ITSModel> expectedList = Arrays.asList(testITS, its2);
        when(itsRepository.findAll()).thenReturn(expectedList);

        // Act
        List<ITSModel> result = itsService.getAllITS();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Cámara CCTV", result.get(0).getType());
        verify(itsRepository, times(1)).findAll();
    }

    @Test
    void createITS_ShouldSaveAndReturnITS() {
        // Arrange
        when(itsRepository.save(any(ITSModel.class))).thenReturn(testITS);

        // Act
        ITSModel result = itsService.createITS(testITS);

        // Assert
        assertNotNull(result);
        assertEquals("Cámara CCTV", result.getType());
        assertEquals("Km 5 Norte", result.getLocation());
        verify(itsRepository, times(1)).save(testITS);
    }

    @Test
    void updateITS_WhenITSExists_ShouldUpdateAndReturn() {
        // Arrange
        ITSModel updatedDetails = new ITSModel();
        updatedDetails.setType("Cámara CCTV Actualizada");
        updatedDetails.setLocation("Km 5 Norte - Actualizado");
        updatedDetails.setStatus("En Mantenimiento");
        updatedDetails.setInstalation_date(LocalDate.of(2023, 1, 15));

        when(itsRepository.findById(1L)).thenReturn(Optional.of(testITS));
        when(itsRepository.save(any(ITSModel.class))).thenReturn(testITS);

        // Act
        ITSModel result = itsService.updateITS(1L, updatedDetails);

        // Assert
        assertNotNull(result);
        assertEquals("Cámara CCTV Actualizada", testITS.getType());
        assertEquals("En Mantenimiento", testITS.getStatus());
        verify(itsRepository, times(1)).findById(1L);
        verify(itsRepository, times(1)).save(testITS);
    }

    @Test
    void updateITS_WhenITSNotFound_ShouldThrowException() {
        // Arrange
        when(itsRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            itsService.updateITS(999L, testITS);
        });

        assertTrue(exception.getMessage().contains("ITS not found"));
        verify(itsRepository, times(1)).findById(999L);
        verify(itsRepository, never()).save(any());
    }

    @Test
    void deleteITS_WhenITSExists_ShouldDeleteSuccessfully() {
        // Arrange
        when(itsRepository.findById(1L)).thenReturn(Optional.of(testITS));
        doNothing().when(itsRepository).deleteById(1L);

        // Act
        itsService.deleteITS(1L);

        // Assert
        verify(itsRepository, times(1)).findById(1L);
        verify(itsRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteITS_WhenITSNotFound_ShouldThrowException() {
        // Arrange
        when(itsRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            itsService.deleteITS(999L);
        });

        assertTrue(exception.getMessage().contains("ITS not found"));
        verify(itsRepository, times(1)).findById(999L);
        verify(itsRepository, never()).deleteById(anyLong());
    }

    @Test
    void getAllITS_WhenEmpty_ShouldReturnEmptyList() {
        // Arrange
        when(itsRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<ITSModel> result = itsService.getAllITS();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(itsRepository, times(1)).findAll();
    }
}
