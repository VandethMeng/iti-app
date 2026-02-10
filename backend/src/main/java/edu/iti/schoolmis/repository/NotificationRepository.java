package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for Notification entity
 */
@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserId(String userId);
    List<Notification> findByUserIdAndRead(String userId, boolean read);
    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId);
}

