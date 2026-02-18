package yunex_trafic.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import yunex_trafic.backend.respositories.*;
import yunex_trafic.backend.models.*;


import java.util.List;

@Service
public class ITSService {
    @Autowired
    private ITSRepository itsRepository;

    // CRUD operations for ITSModel

    public List<ITSModel> getAllITS() {
        return itsRepository.findAll();
    }
    
    public ITSModel createITS(ITSModel its) {
        return itsRepository.save(its);
    }

    public ITSModel updateITS(Long id, ITSModel itsDetails) {
        
        ITSModel its = itsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ITS not found with id: " + id));
            
        // Update the fields of ITSModel
        its.setType(itsDetails.getType());
        its.setLocation(itsDetails.getLocation());
        its.setStatus(itsDetails.getStatus());
        its.setInstalation_date(itsDetails.getInstalation_date());
        
        // Update road segment relationship if provided
        if (itsDetails.getRoadSegment() != null) {
            its.setRoadSegment(itsDetails.getRoadSegment());
        }
        
        return itsRepository.save(its);
    }

    public void deleteITS(Long id) {
        ITSModel its = itsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ITS not found with id: " + id));
        
        // Remove ITS from RoadSegment if it's associated
        if (its.getRoadSegment() != null) {
            RoadSegmentModel segment = its.getRoadSegment();
            segment.removeITS(its);
        }
        
        itsRepository.deleteById(id);
    }
}
