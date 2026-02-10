package edu.iti.schoolmis.service;

import edu.iti.schoolmis.entity.Teacher;
import edu.iti.schoolmis.exception.DuplicateResourceException;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for teacher management
 */
@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    /**
     * Create a new teacher
     */
    public Teacher createTeacher(Teacher teacher) {
        if (teacherRepository.findByTeacherId(teacher.getTeacherId()).isPresent()) {
            throw new DuplicateResourceException("Teacher ID already exists");
        }

        teacher.setCreatedAt(LocalDateTime.now());
        teacher.setUpdatedAt(LocalDateTime.now());
        teacher.setActive(true);

        return teacherRepository.save(teacher);
    }

    /**
     * Get teacher by ID
     */
    public Teacher getTeacherById(String id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
    }

    /**
     * Get teacher by user ID
     */
    public Teacher getTeacherByUserId(String userId) {
        return teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found for user: " + userId));
    }

    /**
     * Get teacher by teacher ID
     */
    public Teacher getTeacherByTeacherId(String teacherId) {
        return teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with teacher ID: " + teacherId));
    }

    /**
     * Get all active teachers
     */
    public List<Teacher> getAllActiveTeachers() {
        return teacherRepository.findByActive(true);
    }

    /**
     * Get teachers by department
     */
    public List<Teacher> getTeachersByDepartment(String department) {
        return teacherRepository.findByDepartment(department);
    }

    /**
     * Update teacher
     */
    public Teacher updateTeacher(String id, Teacher teacher) {
        Teacher existingTeacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));

        existingTeacher.setDepartment(teacher.getDepartment());
        existingTeacher.setQualification(teacher.getQualification());
        existingTeacher.setYearsOfExperience(teacher.getYearsOfExperience());
        existingTeacher.setSpecialization(teacher.getSpecialization());
        existingTeacher.setOfficeLocation(teacher.getOfficeLocation());
        existingTeacher.setOfficePhone(teacher.getOfficePhone());
        existingTeacher.setUpdatedAt(LocalDateTime.now());

        return teacherRepository.save(existingTeacher);
    }

    /**
     * Deactivate teacher
     */
    public void deactivateTeacher(String id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));

        teacher.setActive(false);
        teacher.setUpdatedAt(LocalDateTime.now());
        teacherRepository.save(teacher);
    }

    /**
     * Delete teacher
     */
    public void deleteTeacher(String id) {
        if (!teacherRepository.existsById(id)) {
            throw new ResourceNotFoundException("Teacher not found with id: " + id);
        }
        teacherRepository.deleteById(id);
    }
}

