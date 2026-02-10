package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

/**
 * Notification entity for system notifications
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String userId;

    private String title;

    private String message;

    private String notificationType; // INFO, WARNING, ERROR, SUCCESS

    private String relatedEntityId;

    private String relatedEntityType; // COURSE, ENROLLMENT, PAYMENT, etc.

    private boolean read;

    private LocalDateTime readAt;

    private LocalDateTime createdAt;
}

