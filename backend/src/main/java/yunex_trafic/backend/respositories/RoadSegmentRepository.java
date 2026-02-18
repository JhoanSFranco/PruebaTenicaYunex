package yunex_trafic.backend.respositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yunex_trafic.backend.models.RoadSegmentModel;

@Repository
public interface RoadSegmentRepository extends JpaRepository<RoadSegmentModel, Long> {
    
}
