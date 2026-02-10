package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Attendance entity representing student attendance records
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "attendance")
public class Attendance {

    @Id
    private String id;

    private String enrollmentId;

    private String studentId;

    private String courseId;

    private LocalDate attendanceDate;

    private String status; // PRESENT, ABSENT, LATE, EXCUSED

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

