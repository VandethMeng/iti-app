package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.Course;
import edu.iti.schoolmis.exception.DuplicateResourceException;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for course management
 */
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    /**
     * Create a new course
     */
    public Course createCourse(Course course) {
        if (courseRepository.findByCourseCode(course.getCourseCode()).isPresent()) {
            throw new DuplicateResourceException("Course code already exists");
        }

        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        course.setActive(true);
        course.setCurrentEnrollment(0);

        return courseRepository.save(course);
    }

    /**
     * Get course by ID
     */
    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    /**
     * Get course by course code
     */
    public Course getCourseByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with code: " + courseCode));
    }

    /**
     * Get courses by teacher
     */
    public List<Course> getCoursesByTeacher(String teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

    /**
     * Get courses by department
     */
    public List<Course> getCoursesByDepartment(String department) {
        return courseRepository.findByDepartment(department);
    }

    /**
     * Get courses by level
     */
    public List<Course> getCoursesByLevel(String level) {
        return courseRepository.findByLevelAndActive(level, true);
    }

    /**
     * Get courses by semester
     */
    public List<Course> getCoursesBySemester(String semester) {
        return courseRepository.findBySemester(semester);
    }

    /**
     * Update course
     */
    public Course updateCourse(String id, Course course) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setLevel(course.getLevel());
        existingCourse.setCreditHours(course.getCreditHours());
        existingCourse.setTeacherId(course.getTeacherId());
        existingCourse.setMaxCapacity(course.getMaxCapacity());
        existingCourse.setSemester(course.getSemester());
        existingCourse.setUpdatedAt(LocalDateTime.now());

        return courseRepository.save(existingCourse);
    }

    /**
     * Update enrollment count
     */
    public void updateEnrollmentCount(String courseId, int count) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        course.setCurrentEnrollment(count);
        course.setUpdatedAt(LocalDateTime.now());
        courseRepository.save(course);
    }

    /**
     * Deactivate course
     */
    public void deactivateCourse(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.setActive(false);
        course.setUpdatedAt(LocalDateTime.now());
        courseRepository.save(course);
    }

    /**
     * Delete course
     */
    public void deleteCourse(String id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}

