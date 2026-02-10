package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.Payment;
import edu.iti.schoolmis.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for payment management endpoints
 */
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * Create payment record
     * POST /api/payments
     */
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment response = paymentService.createPayment(payment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get payment by ID
     * GET /api/payments/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable String id) {
        Payment response = paymentService.getPaymentById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student payments
     * GET /api/payments/student/{studentId}
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Payment>> getStudentPayments(@PathVariable String studentId) {
        List<Payment> response = paymentService.getStudentPayments(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student completed payments
     * GET /api/payments/student/{studentId}/completed
     */
    @GetMapping("/student/{studentId}/completed")
    public ResponseEntity<List<Payment>> getStudentCompletedPayments(@PathVariable String studentId) {
        List<Payment> response = paymentService.getStudentCompletedPayments(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get payments by status
     * GET /api/payments/status/{status}
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Payment>> getPaymentsByStatus(@PathVariable String status) {
        List<Payment> response = paymentService.getPaymentsByStatus(status);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get payments by type
     * GET /api/payments/type/{paymentType}
     */
    @GetMapping("/type/{paymentType}")
    public ResponseEntity<List<Payment>> getPaymentsByType(@PathVariable String paymentType) {
        List<Payment> response = paymentService.getPaymentsByType(paymentType);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Calculate total paid
     * GET /api/payments/student/{studentId}/total-paid
     */
    @GetMapping("/student/{studentId}/total-paid")
    public ResponseEntity<Double> calculateTotalPaid(@PathVariable String studentId) {
        double total = paymentService.calculateTotalPaid(studentId);
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    /**
     * Update payment status
     * PATCH /api/payments/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable String id,
            @RequestParam String status) {
        Payment response = paymentService.updatePaymentStatus(id, status);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Complete payment
     * PATCH /api/payments/{id}/complete
     */
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Payment> completePayment(
            @PathVariable String id,
            @RequestParam String transactionId) {
        Payment response = paymentService.completePayment(id, transactionId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Delete payment
     * DELETE /api/payments/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable String id) {
        paymentService.deletePayment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

