package yunex_trafic.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import yunex_trafic.backend.respositories.*;
import yunex_trafic.backend.models.*;

import java.util.List;

@Service
public class RoadSegmentService {
    @Autowired
    private RoadSegmentRepository roadSegmentRepository;
    
    @Autowired
    private ITSRepository itsRepository;

    // CRUD operations for RoadSegmentModel
    public List<RoadSegmentModel> getAllRoadSegments() {
        return roadSegmentRepository.findAll();
    }

    public RoadSegmentModel createRoadSegment(RoadSegmentModel roadSegment) {
        return roadSegmentRepository.save(roadSegment);
    }
    

    public RoadSegmentModel updateRoadSegment(Long id, RoadSegmentModel roadSegmentDetails) {
        RoadSegmentModel roadSegment = roadSegmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Road Segment not found with id: " + id));
        
        // Update the fields of RoadSegmentModel
        roadSegment.setName(roadSegmentDetails.getName());
        roadSegment.setLocation(roadSegmentDetails.getLocation());
        roadSegment.setLength(roadSegmentDetails.getLength());
        roadSegment.setCondition(roadSegmentDetails.getCondition());
        
        return roadSegmentRepository.save(roadSegment);
    }

    public void deleteRoadSegment(Long id) {
        RoadSegmentModel segment = roadSegmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Road Segment not found with id: " + id));
        
        // Remove all ITS associations before deleting the segment
        // This prevents ITS equipment from being deleted when segment is removed
        if (segment.getItsList() != null && !segment.getItsList().isEmpty()) {
            // Create a copy to avoid ConcurrentModificationException
            List<ITSModel> itsCopy = new java.util.ArrayList<>(segment.getItsList());
            for (ITSModel its : itsCopy) {
                segment.removeITS(its);
            }
        }
        
        roadSegmentRepository.deleteById(id);
    }

    // Methods to manage ITS-RoadSegment relationship
    public RoadSegmentModel assignITSToSegment(Long segmentId, Long itsId) {
        RoadSegmentModel segment = roadSegmentRepository.findById(segmentId)
            .orElseThrow(() -> new RuntimeException("Road Segment not found with id: " + segmentId));
        
        ITSModel its = itsRepository.findById(itsId)
            .orElseThrow(() -> new RuntimeException("ITS not found with id: " + itsId));
        
        // Check if ITS is already assigned to the same segment
        if (its.getRoadSegment() != null && its.getRoadSegment().getId().equals(segmentId)) {
            throw new RuntimeException("ITS is already assigned to this Road Segment");
        }
        
        // Use the helper method to maintain bidirectional relationship
        segment.addITS(its);
        
        return roadSegmentRepository.save(segment);
    }
    
    public List<ITSModel> getITSBySegment(Long segmentId) {
        RoadSegmentModel segment = roadSegmentRepository.findById(segmentId)
            .orElseThrow(() -> new RuntimeException("Road Segment not found with id: " + segmentId));
        
        return segment.getItsList();
    }

    


    
}