package yunex_trafic.backend.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yunex_trafic.backend.models.ITSModel;

@Repository
public interface ITSRepository extends JpaRepository<ITSModel, Long> {
    ITSModel findByType(String type);
    
}
