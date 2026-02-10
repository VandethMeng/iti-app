package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.Enrollment;
import edu.iti.schoolmis.exception.DuplicateResourceException;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for enrollment management
 */
@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    /**
     * Create a new enrollment
     */
    public Enrollment enrollStudent(String studentId, String courseId) {
        // Check if student is already enrolled
        if (enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId).isPresent()) {
            throw new DuplicateResourceException("Student is already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrollmentDate(LocalDateTime.now());
        enrollment.setStatus("ACTIVE");
        enrollment.setCreatedAt(LocalDateTime.now());
        enrollment.setUpdatedAt(LocalDateTime.now());

        return enrollmentRepository.save(enrollment);
    }

    /**
     * Get enrollment by ID
     */
    public Enrollment getEnrollmentById(String id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
    }

    /**
     * Get student enrollments
     */
    public List<Enrollment> getStudentEnrollments(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    /**
     * Get active enrollments for student
     */
    public List<Enrollment> getActiveEnrollments(String studentId) {
        return enrollmentRepository.findByStudentIdAndStatus(studentId, "ACTIVE");
    }

    /**
     * Get course enrollments
     */
    public List<Enrollment> getCourseEnrollments(String courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    /**
     * Update enrollment grade
     */
    public Enrollment updateEnrollmentGrade(String enrollmentId, String grade, double gradePoint, double finalScore) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));

        enrollment.setGrade(grade);
        enrollment.setGradePoint(gradePoint);
        enrollment.setFinalScore(finalScore);
        enrollment.setUpdatedAt(LocalDateTime.now());

        return enrollmentRepository.save(enrollment);
    }

    /**
     * Drop enrollment
     */
    public void dropEnrollment(String enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));

        enrollment.setStatus("DROPPED");
        enrollment.setUpdatedAt(LocalDateTime.now());
        enrollmentRepository.save(enrollment);
    }

    /**
     * Complete enrollment
     */
    public void completeEnrollment(String enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));

        enrollment.setStatus("COMPLETED");
        enrollment.setCompletedDate(LocalDateTime.now());
        enrollment.setUpdatedAt(LocalDateTime.now());
        enrollmentRepository.save(enrollment);
    }

    /**
     * Delete enrollment
     */
    public void deleteEnrollment(String id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enrollment not found with id: " + id);
        }
        enrollmentRepository.deleteById(id);
    }
}

