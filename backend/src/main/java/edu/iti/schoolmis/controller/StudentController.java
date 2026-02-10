package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.dto.StudentRequest;
import edu.iti.schoolmis.dto.StudentResponse;
import edu.iti.schoolmis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

/**
 * REST Controller for student management endpoints
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * Create a new student
     * POST /api/students
     */
    @PostMapping
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.createStudent(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get student by ID
     * GET /api/students/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable String id) {
        StudentResponse response = studentService.getStudentById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student by user ID
     * GET /api/students/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<StudentResponse> getStudentByUserId(@PathVariable String userId) {
        StudentResponse response = studentService.getStudentByUserId(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student by student ID
     * GET /api/students/student-id/{studentId}
     */
    @GetMapping("/student-id/{studentId}")
    public ResponseEntity<StudentResponse> getStudentByStudentId(@PathVariable String studentId) {
        StudentResponse response = studentService.getStudentByStudentId(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get all active students
     * GET /api/students/active
     */
    @GetMapping("/active")
    public ResponseEntity<List<StudentResponse>> getAllActiveStudents() {
        List<StudentResponse> response = studentService.getAllActiveStudents();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get students by level
     * GET /api/students/level/{level}
     */
    @GetMapping("/level/{level}")
    public ResponseEntity<List<StudentResponse>> getStudentsByLevel(@PathVariable String level) {
        List<StudentResponse> response = studentService.getStudentsByLevel(level);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update student
     * PUT /api/students/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable String id,
            @Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.updateStudent(id, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update student GPA
     * PATCH /api/students/{id}/gpa
     */
    @PatchMapping("/{id}/gpa")
    public ResponseEntity<Void> updateStudentGpa(
            @PathVariable String id,
            @RequestParam double gpa) {
        studentService.updateStudentGpa(id, gpa);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Deactivate student
     * PATCH /api/students/{id}/deactivate
     */
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateStudent(@PathVariable String id) {
        studentService.deactivateStudent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete student
     * DELETE /api/students/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

