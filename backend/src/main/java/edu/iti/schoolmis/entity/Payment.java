package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Payment entity representing student payments
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "payments")
public class Payment {

    @Id
    private String id;

    private String studentId;

    private double amount;

    private String paymentType; // TUITION, EXAM_FEE, REGISTRATION, OTHER

    private LocalDate paymentDate;

    private String status; // PENDING, COMPLETED, FAILED, REFUNDED

    private String paymentMethod; // CASH, CREDIT_CARD, BANK_TRANSFER, ONLINE

    private String transactionId;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

