package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;

/**
 * Repository for Attendance entity
 */
@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByEnrollmentId(String enrollmentId);
    List<Attendance> findByStudentIdAndAttendanceDateBetween(String studentId, LocalDate startDate, LocalDate endDate);
    List<Attendance> findByEnrollmentIdAndStatus(String enrollmentId, String status);
}

