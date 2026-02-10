package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

/**
 * Enrollment entity representing student course enrollments
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "enrollments")
public class Enrollment {

    @Id
    private String id;

    private String studentId;

    private String courseId;

    private LocalDateTime enrollmentDate;

    private String grade;

    private double gradePoint;

    private double finalScore;

    private String status; // ACTIVE, COMPLETED, DROPPED, PENDING

    private LocalDateTime completedDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

