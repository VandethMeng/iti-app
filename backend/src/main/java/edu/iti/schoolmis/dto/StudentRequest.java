package edu.iti.schoolmis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO for student creation
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Student ID is required")
    private String studentId;

    private String dateOfBirth;

    private String gender;

    private String parentName;

    private String parentPhone;

    private String parentEmail;
}

