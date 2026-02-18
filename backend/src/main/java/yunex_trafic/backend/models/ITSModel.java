package yunex_trafic.backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="its")
public class ITSModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Type is required")
    private String type;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotBlank(message = "Status is required")
    private String status;
    
    @NotNull(message = "Installation date is required")
    private LocalDate instalation_date;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "road_segment_id")
    @JsonBackReference
    private RoadSegmentModel roadSegment;
    public ITSModel() {
    }

    public ITSModel(Long id, String type, String location, String status, LocalDate instalation_date, RoadSegmentModel roadSegment) {
        this.id = id;
        this.type = type;
        this.location = location;
        this.status = status;
        this.instalation_date = instalation_date;
        this.roadSegment = roadSegment;
    }
    
    //Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public LocalDate getInstalation_date() {
        return instalation_date;
    }
    public void setInstalation_date(LocalDate instalation_date) {
        this.instalation_date = instalation_date;
    }
    
    public RoadSegmentModel getRoadSegment() {
        return roadSegment;
    }
    
    public void setRoadSegment(RoadSegmentModel roadSegment) {
        this.roadSegment = roadSegment;
    }

}

