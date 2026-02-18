package yunex_trafic.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yunex_trafic.backend.services.ITSService;
import yunex_trafic.backend.models.ITSModel;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/its")
@Validated
public class ITSController {
    @Autowired
    private ITSService itsService;

    @GetMapping
    public ResponseEntity<List<ITSModel>> getAllITS() {
        try {
            List<ITSModel> itsList = itsService.getAllITS();
            return ResponseEntity.ok(itsList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<ITSModel> createITS(@Valid @RequestBody ITSModel its) {
        try {
            ITSModel createdITS = itsService.createITS(its);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdITS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITSModel> updateITS(@PathVariable Long id, @Valid @RequestBody ITSModel itsDetails) {
        try {
            ITSModel updatedITS = itsService.updateITS(id, itsDetails);
            return ResponseEntity.ok(updatedITS);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteITS(@PathVariable Long id) {
        try {
            itsService.deleteITS(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
