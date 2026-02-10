package edu.iti.schoolmis.service;

import edu.iti.schoolmis.dto.StudentRequest;
import edu.iti.schoolmis.dto.StudentResponse;
import edu.iti.schoolmis.entity.Student;
import edu.iti.schoolmis.exception.DuplicateResourceException;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for student management
 */
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Create a new student
     */
    public StudentResponse createStudent(StudentRequest request) {
        // Check if student already exists
        if (studentRepository.findByStudentId(request.getStudentId()).isPresent()) {
            throw new DuplicateResourceException("Student ID already exists");
        }

        Student student = new Student();
        student.setUserId(request.getUserId());
        student.setStudentId(request.getStudentId());
        student.setGender(request.getGender());
        student.setParentName(request.getParentName());
        student.setParentPhone(request.getParentPhone());
        student.setParentEmail(request.getParentEmail());
        student.setEnrollmentDate(LocalDate.now());
        student.setActive(true);
        student.setGpa(0.0);
        student.setCreatedAt(LocalDateTime.now());
        student.setUpdatedAt(LocalDateTime.now());

        // Parse date of birth
        if (request.getDateOfBirth() != null && !request.getDateOfBirth().isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;
            student.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(), formatter));
        }

        Student savedStudent = studentRepository.save(student);
        return mapStudentToResponse(savedStudent);
    }

    /**
     * Get student by ID
     */
    public StudentResponse getStudentById(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return mapStudentToResponse(student);
    }

    /**
     * Get student by user ID
     */
    public StudentResponse getStudentByUserId(String userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found for user: " + userId));
        return mapStudentToResponse(student);
    }

    /**
     * Get student by student ID
     */
    public StudentResponse getStudentByStudentId(String studentId) {
        Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with student ID: " + studentId));
        return mapStudentToResponse(student);
    }

    /**
     * Get all active students
     */
    public List<StudentResponse> getAllActiveStudents() {
        return studentRepository.findByActive(true).stream()
                .map(this::mapStudentToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get students by level
     */
    public List<StudentResponse> getStudentsByLevel(String level) {
        return studentRepository.findByCurrentLevel(level).stream()
                .map(this::mapStudentToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Update student
     */
    public StudentResponse updateStudent(String id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        student.setGender(request.getGender());
        student.setParentName(request.getParentName());
        student.setParentPhone(request.getParentPhone());
        student.setParentEmail(request.getParentEmail());
        student.setUpdatedAt(LocalDateTime.now());

        if (request.getDateOfBirth() != null && !request.getDateOfBirth().isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;
            student.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(), formatter));
        }

        Student updatedStudent = studentRepository.save(student);
        return mapStudentToResponse(updatedStudent);
    }

    /**
     * Update student GPA
     */
    public void updateStudentGpa(String studentId, double gpa) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        student.setGpa(gpa);
        student.setUpdatedAt(LocalDateTime.now());
        studentRepository.save(student);
    }

    /**
     * Deactivate student
     */
    public void deactivateStudent(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        student.setActive(false);
        student.setUpdatedAt(LocalDateTime.now());
        studentRepository.save(student);
    }

    /**
     * Delete student
     */
    public void deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    /**
     * Map Student entity to StudentResponse DTO
     */
    private StudentResponse mapStudentToResponse(Student student) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setUserId(student.getUserId());
        response.setStudentId(student.getStudentId());
        response.setGender(student.getGender());
        response.setParentName(student.getParentName());
        response.setParentPhone(student.getParentPhone());
        response.setCurrentLevel(student.getCurrentLevel());
        response.setGpa(student.getGpa());
        response.setActive(student.isActive());

        if (student.getDateOfBirth() != null) {
            response.setDateOfBirth(student.getDateOfBirth().toString());
        }

        return response;
    }
}

