package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.entity.Attendance;
import edu.iti.schoolmis.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * REST Controller for attendance management endpoints
 */
@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    /**
     * Record attendance
     * POST /api/attendance
     */
    @PostMapping
    public ResponseEntity<Attendance> recordAttendance(@RequestBody Attendance attendance) {
        Attendance response = attendanceService.recordAttendance(attendance);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get attendance by ID
     * GET /api/attendance/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable String id) {
        Attendance response = attendanceService.getAttendanceById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get student attendance
     * GET /api/attendance/student/{studentId}
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@PathVariable String studentId) {
        List<Attendance> response = attendanceService.getStudentAttendance(studentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get enrollment attendance
     * GET /api/attendance/enrollment/{enrollmentId}
     */
    @GetMapping("/enrollment/{enrollmentId}")
    public ResponseEntity<List<Attendance>> getEnrollmentAttendance(@PathVariable String enrollmentId) {
        List<Attendance> response = attendanceService.getEnrollmentAttendance(enrollmentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get attendance percentage
     * GET /api/attendance/enrollment/{enrollmentId}/percentage
     */
    @GetMapping("/enrollment/{enrollmentId}/percentage")
    public ResponseEntity<Double> getAttendancePercentage(@PathVariable String enrollmentId) {
        double percentage = attendanceService.calculateAttendancePercentage(enrollmentId);
        return new ResponseEntity<>(percentage, HttpStatus.OK);
    }

    /**
     * Update attendance
     * PUT /api/attendance/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(
            @PathVariable String id,
            @RequestParam String status,
            @RequestParam(required = false) String remarks) {
        Attendance response = attendanceService.updateAttendance(id, status, remarks);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Delete attendance
     * DELETE /api/attendance/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable String id) {
        attendanceService.deleteAttendance(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

