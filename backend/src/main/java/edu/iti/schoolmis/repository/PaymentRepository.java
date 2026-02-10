package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for Payment entity
 */
@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByStudentId(String studentId);
    List<Payment> findByStatus(String status);
    List<Payment> findByStudentIdAndStatus(String studentId, String status);
    List<Payment> findByPaymentType(String paymentType);
}

