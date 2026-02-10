package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Student entity representing student information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {

    @Id
    private String id;

    private String userId;

    private String studentId;

    private LocalDate dateOfBirth;

    private String gender;

    private String parentName;

    private String parentPhone;

    private String parentEmail;

    private String guardianName;

    private String guardianPhone;

    private LocalDate enrollmentDate;

    private String currentLevel;

    private double gpa;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

