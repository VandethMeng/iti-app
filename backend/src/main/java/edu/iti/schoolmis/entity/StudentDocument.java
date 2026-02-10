package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * StudentDocument entity representing student documents
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "documents")
public class StudentDocument {

    @Id
    private String id;

    private String studentId;

    private String documentType; // TRANSCRIPT, CERTIFICATE, ADMISSION_LETTER, etc.

    private String fileName;

    private String fileUrl;

    private String mimeType;

    private long fileSize;

    private LocalDate issueDate;

    private boolean verified;

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

