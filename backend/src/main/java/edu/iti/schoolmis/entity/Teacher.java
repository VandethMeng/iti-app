package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

/**
 * Teacher entity representing teacher information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "teachers")
public class Teacher {

    @Id
    private String id;

    private String userId;

    private String teacherId;

    private String department;

    private String qualification;

    private int yearsOfExperience;

    private String specialization;

    private String officeLocation;

    private String officePhone;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

