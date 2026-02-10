package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

/**
 * Course entity representing courses in the system
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "courses")
public class Course {

    @Id
    private String id;

    private String courseCode;

    private String courseName;

    private String description;

    private String level;

    private int creditHours;

    private String teacherId;

    private String department;

    private int maxCapacity;

    private int currentEnrollment;

    private String semester;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

