package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository for Teacher entity
 */
@Repository
public interface TeacherRepository extends MongoRepository<Teacher, String> {
    Optional<Teacher> findByUserId(String userId);
    Optional<Teacher> findByTeacherId(String teacherId);
    List<Teacher> findByDepartment(String department);
    List<Teacher> findByActive(boolean active);
}

