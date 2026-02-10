package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository for Enrollment entity
 */
@Repository
public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    Optional<Enrollment> findByStudentIdAndCourseId(String studentId, String courseId);
    List<Enrollment> findByStudentId(String studentId);
    List<Enrollment> findByCourseId(String courseId);
    List<Enrollment> findByStatus(String status);
    List<Enrollment> findByStudentIdAndStatus(String studentId, String status);
}

