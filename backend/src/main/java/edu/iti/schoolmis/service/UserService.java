package edu.iti.schoolmis.service;

import edu.iti.schoolmis.dto.UserResponse;
import edu.iti.schoolmis.entity.User;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for user management
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all users
     */
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapUserToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get users by role
     */
    public List<UserResponse> getUsersByRole(String role) {
        List<User> users = userRepository.findAll();
        return users.stream()
                .filter(user -> user.getRoles() != null &&
                       user.getRoles().stream()
                           .anyMatch(r -> r.name().equalsIgnoreCase(role)))
                .map(this::mapUserToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get user by ID
     */
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapUserToResponse(user);
    }

    /**
     * Map User entity to UserResponse DTO
     */
    private UserResponse mapUserToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setAddress(user.getAddress());
        response.setEnabled(user.isEnabled());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setRoles(user.getRoles());
        return response;
    }
}

