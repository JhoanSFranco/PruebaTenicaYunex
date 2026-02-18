package yunex_trafic.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import yunex_trafic.backend.services.RoadSegmentService;
import yunex_trafic.backend.models.RoadSegmentModel;
import yunex_trafic.backend.models.ITSModel;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/road-segments")
@Validated
public class RoadSegmentController {
    @Autowired
    private RoadSegmentService roadSegmentService;

    @GetMapping
    public ResponseEntity<List<RoadSegmentModel>> getAllRoadSegments() {
        try {
            List<RoadSegmentModel> segments = roadSegmentService.getAllRoadSegments();
            return ResponseEntity.ok(segments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<RoadSegmentModel> createRoadSegment(@Valid @RequestBody RoadSegmentModel roadSegment) {
        try {
            RoadSegmentModel createdSegment = roadSegmentService.createRoadSegment(roadSegment);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSegment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoadSegmentModel> updateRoadSegment(@PathVariable Long id, @Valid @RequestBody RoadSegmentModel roadSegmentDetails) {
        try {
            RoadSegmentModel updatedSegment = roadSegmentService.updateRoadSegment(id, roadSegmentDetails);
            return ResponseEntity.ok(updatedSegment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoadSegment(@PathVariable Long id) {
        try {
            roadSegmentService.deleteRoadSegment(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Relationship endpoints 
    // These endpoint allow US to esaily search and mange the relationship OF MODELS 

    @PostMapping("/{segmentId}/its/{itsId}")
    public ResponseEntity<RoadSegmentModel> assignITSToSegment(@PathVariable Long segmentId, @PathVariable Long itsId) {
        try {
            RoadSegmentModel updatedSegment = roadSegmentService.assignITSToSegment(segmentId, itsId);
            return ResponseEntity.ok(updatedSegment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @GetMapping("/{segmentId}/its")
    public ResponseEntity<List<ITSModel>> getITSBySegment(@PathVariable Long segmentId) {
        try {
            List<ITSModel> itsList = roadSegmentService.getITSBySegment(segmentId);
            return ResponseEntity.ok(itsList);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
