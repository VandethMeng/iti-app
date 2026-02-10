package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository for Student entity
 */
@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByUserId(String userId);
    Optional<Student> findByStudentId(String studentId);
    List<Student> findByActive(boolean active);
    List<Student> findByCurrentLevel(String currentLevel);
}

