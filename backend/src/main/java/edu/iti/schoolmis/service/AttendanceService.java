package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.Attendance;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for attendance management
 */
@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    /**
     * Create attendance record
     */
    public Attendance recordAttendance(Attendance attendance) {
        attendance.setCreatedAt(LocalDateTime.now());
        attendance.setUpdatedAt(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    /**
     * Get attendance by ID
     */
    public Attendance getAttendanceById(String id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + id));
    }

    /**
     * Get student attendance records
     */
    public List<Attendance> getStudentAttendance(String studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    /**
     * Get attendance for enrollment
     */
    public List<Attendance> getEnrollmentAttendance(String enrollmentId) {
        return attendanceRepository.findByEnrollmentId(enrollmentId);
    }

    /**
     * Get attendance for date range
     */
    public List<Attendance> getAttendanceByDateRange(String studentId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByStudentIdAndAttendanceDateBetween(studentId, startDate, endDate);
    }

    /**
     * Calculate attendance percentage
     */
    public double calculateAttendancePercentage(String enrollmentId) {
        List<Attendance> records = attendanceRepository.findByEnrollmentId(enrollmentId);

        if (records.isEmpty()) {
            return 0.0;
        }

        long presentCount = records.stream()
                .filter(a -> "PRESENT".equals(a.getStatus()))
                .count();

        return (presentCount * 100.0) / records.size();
    }

    /**
     * Update attendance record
     */
    public Attendance updateAttendance(String id, String status, String remarks) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + id));

        attendance.setStatus(status);
        attendance.setRemarks(remarks);
        attendance.setUpdatedAt(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    /**
     * Delete attendance record
     */
    public void deleteAttendance(String id) {
        if (!attendanceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Attendance record not found with id: " + id);
        }
        attendanceRepository.deleteById(id);
    }
}

