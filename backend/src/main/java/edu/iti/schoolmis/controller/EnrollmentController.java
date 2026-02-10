package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.Enrollment;
import edu.iti.schoolmis.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for enrollment management endpoints
 */
@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    /**
     * Enroll student in course
     * POST /api/enrollments
     */
    @PostMapping
    public ResponseEntity<Enrollment> enrollStudent(
            @RequestParam String studentId,
            @RequestParam String courseId) {
        Enrollment response = enrollmentService.enrollStudent(studentId, courseId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get enrollment by ID
     * GET /api/enrollments/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable String id) {
        Enrollment response = enrollmentService.getEnrollmentById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student enrollments
     * GET /api/enrollments/student/{studentId}
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable String studentId) {
        List<Enrollment> response = enrollmentService.getStudentEnrollments(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get active enrollments
     * GET /api/enrollments/student/{studentId}/active
     */
    @GetMapping("/student/{studentId}/active")
    public ResponseEntity<List<Enrollment>> getActiveEnrollments(@PathVariable String studentId) {
        List<Enrollment> response = enrollmentService.getActiveEnrollments(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get course enrollments
     * GET /api/enrollments/course/{courseId}
     */
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getCourseEnrollments(@PathVariable String courseId) {
        List<Enrollment> response = enrollmentService.getCourseEnrollments(courseId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update enrollment grade
     * PATCH /api/enrollments/{id}/grade
     */
    @PatchMapping("/{id}/grade")
    public ResponseEntity<Enrollment> updateEnrollmentGrade(
            @PathVariable String id,
            @RequestParam String grade,
            @RequestParam double gradePoint,
            @RequestParam double finalScore) {
        Enrollment response = enrollmentService.updateEnrollmentGrade(id, grade, gradePoint, finalScore);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Drop enrollment
     * PATCH /api/enrollments/{id}/drop
     */
    @PatchMapping("/{id}/drop")
    public ResponseEntity<Void> dropEnrollment(@PathVariable String id) {
        enrollmentService.dropEnrollment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Complete enrollment
     * PATCH /api/enrollments/{id}/complete
     */
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Void> completeEnrollment(@PathVariable String id) {
        enrollmentService.completeEnrollment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete enrollment
     * DELETE /api/enrollments/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable String id) {
        enrollmentService.deleteEnrollment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

