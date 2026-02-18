package yunex_trafic.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="road_segment")
public class RoadSegmentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @Positive(message = "Length must be positive")
    private double length;
    
    @NotBlank(message = "Condition is required")
    private String condition;
    
    @OneToMany(mappedBy = "roadSegment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ITSModel> itsList = new ArrayList<>();
    public RoadSegmentModel() {
    }

    public RoadSegmentModel(Long id, String name, String location, double length, String condition) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.length = length;
        this.condition = condition;
        this.itsList = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public List<ITSModel> getItsList() {
        return itsList;
    }

    public void setItsList(List<ITSModel> itsList) {
        this.itsList = itsList;
    }
    
    // Helper methods to manage bidirectional relationship
    public void addITS(ITSModel its) {
        itsList.add(its);
        its.setRoadSegment(this);
    }
    
    public void removeITS(ITSModel its) {
        itsList.remove(its);
        its.setRoadSegment(null);
    }
}
