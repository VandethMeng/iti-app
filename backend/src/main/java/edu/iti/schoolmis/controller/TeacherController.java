package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.Teacher;
import edu.iti.schoolmis.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for teacher management endpoints
 */
@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    /**
     * Create a new teacher
     * POST /api/teachers
     */
    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher response = teacherService.createTeacher(teacher);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get teacher by ID
     * GET /api/teachers/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable String id) {
        Teacher response = teacherService.getTeacherById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get teacher by user ID
     * GET /api/teachers/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Teacher> getTeacherByUserId(@PathVariable String userId) {
        Teacher response = teacherService.getTeacherByUserId(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get teacher by teacher ID
     * GET /api/teachers/teacher-id/{teacherId}
     */
    @GetMapping("/teacher-id/{teacherId}")
    public ResponseEntity<Teacher> getTeacherByTeacherId(@PathVariable String teacherId) {
        Teacher response = teacherService.getTeacherByTeacherId(teacherId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get all active teachers
     * GET /api/teachers/active
     */
    @GetMapping("/active")
    public ResponseEntity<List<Teacher>> getAllActiveTeachers() {
        List<Teacher> response = teacherService.getAllActiveTeachers();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get teachers by department
     * GET /api/teachers/department/{department}
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Teacher>> getTeachersByDepartment(@PathVariable String department) {
        List<Teacher> response = teacherService.getTeachersByDepartment(department);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update teacher
     * PUT /api/teachers/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(
            @PathVariable String id,
            @RequestBody Teacher teacher) {
        Teacher response = teacherService.updateTeacher(id, teacher);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Deactivate teacher
     * PATCH /api/teachers/{id}/deactivate
     */
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateTeacher(@PathVariable String id) {
        teacherService.deactivateTeacher(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete teacher
     * DELETE /api/teachers/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable String id) {
        teacherService.deleteTeacher(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

