package edu.iti.schoolmis.repository;

import edu.iti.schoolmis.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository for Course entity
 */
@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    Optional<Course> findByCourseCode(String courseCode);
    List<Course> findByTeacherId(String teacherId);
    List<Course> findByDepartment(String department);
    List<Course> findByLevelAndActive(String level, boolean active);
    List<Course> findBySemester(String semester);
}

