package edu.iti.schoolmis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for student response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {

    private String id;

    private String userId;

    private String studentId;

    private String dateOfBirth;

    private String gender;

    private String parentName;

    private String parentPhone;

    private String currentLevel;

    private double gpa;

    private boolean active;
}

