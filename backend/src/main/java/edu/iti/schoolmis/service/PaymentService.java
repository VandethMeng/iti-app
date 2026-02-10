package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.Payment;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for payment management
 */
@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * Create payment record
     */
    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    /**
     * Get payment by ID
     */
    public Payment getPaymentById(String id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }

    /**
     * Get student payments
     */
    public List<Payment> getStudentPayments(String studentId) {
        return paymentRepository.findByStudentId(studentId);
    }

    /**
     * Get student completed payments
     */
    public List<Payment> getStudentCompletedPayments(String studentId) {
        return paymentRepository.findByStudentIdAndStatus(studentId, "COMPLETED");
    }

    /**
     * Get payments by status
     */
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    /**
     * Get payments by type
     */
    public List<Payment> getPaymentsByType(String paymentType) {
        return paymentRepository.findByPaymentType(paymentType);
    }

    /**
     * Calculate total paid amount for student
     */
    public double calculateTotalPaid(String studentId) {
        return paymentRepository.findByStudentIdAndStatus(studentId, "COMPLETED")
                .stream()
                .mapToDouble(Payment::getAmount)
                .sum();
    }

    /**
     * Update payment status
     */
    public Payment updatePaymentStatus(String id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));

        payment.setStatus(status);
        payment.setUpdatedAt(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    /**
     * Record payment completion
     */
    public Payment completePayment(String id, String transactionId) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));

        payment.setStatus("COMPLETED");
        payment.setTransactionId(transactionId);
        payment.setUpdatedAt(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    /**
     * Delete payment
     */
    public void deletePayment(String id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }
}

