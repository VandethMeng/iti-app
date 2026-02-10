package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.Course;
import edu.iti.schoolmis.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for course management endpoints
 */
@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CourseController {

    @Autowired
    private CourseService courseService;

    /**
     * Create a new course
     * POST /api/courses
     */
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course response = courseService.createCourse(course);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get course by ID
     * GET /api/courses/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Course response = courseService.getCourseById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get course by code
     * GET /api/courses/code/{courseCode}
     */
    @GetMapping("/code/{courseCode}")
    public ResponseEntity<Course> getCourseByCourseCode(@PathVariable String courseCode) {
        Course response = courseService.getCourseByCourseCode(courseCode);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get courses by teacher
     * GET /api/courses/teacher/{teacherId}
     */
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Course>> getCoursesByTeacher(@PathVariable String teacherId) {
        List<Course> response = courseService.getCoursesByTeacher(teacherId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get courses by department
     * GET /api/courses/department/{department}
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Course>> getCoursesByDepartment(@PathVariable String department) {
        List<Course> response = courseService.getCoursesByDepartment(department);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get courses by level
     * GET /api/courses/level/{level}
     */
    @GetMapping("/level/{level}")
    public ResponseEntity<List<Course>> getCoursesByLevel(@PathVariable String level) {
        List<Course> response = courseService.getCoursesByLevel(level);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get courses by semester
     * GET /api/courses/semester/{semester}
     */
    @GetMapping("/semester/{semester}")
    public ResponseEntity<List<Course>> getCoursesBySemester(@PathVariable String semester) {
        List<Course> response = courseService.getCoursesBySemester(semester);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update course
     * PUT /api/courses/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable String id,
            @RequestBody Course course) {
        Course response = courseService.updateCourse(id, course);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Deactivate course
     * PATCH /api/courses/{id}/deactivate
     */
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateCourse(@PathVariable String id) {
        courseService.deactivateCourse(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete course
     * DELETE /api/courses/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

