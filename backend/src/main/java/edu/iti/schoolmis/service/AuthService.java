package edu.iti.schoolmis.service;

import edu.iti.schoolmis.dto.LoginRequest;
import edu.iti.schoolmis.dto.LoginResponse;
import edu.iti.schoolmis.dto.RegisterRequest;
import edu.iti.schoolmis.dto.UserResponse;
import edu.iti.schoolmis.entity.User;
import edu.iti.schoolmis.exception.DuplicateResourceException;
import edu.iti.schoolmis.exception.InvalidCredentialsException;
import edu.iti.schoolmis.exception.ResourceNotFoundException;
import edu.iti.schoolmis.repository.UserRepository;
import edu.iti.schoolmis.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

/**
 * Authentication service for user registration and login
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Register a new user
     */
    public UserResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Set role with error handling
        try {
            String roleStr = request.getRole().toUpperCase().trim();
            User.Role role = User.Role.valueOf(roleStr);
            user.setRoles(Collections.singleton(role));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + request.getRole() +
                ". Valid roles are: STUDENT, TEACHER, ENROLLMENT_OFFICER, ADMIN");
        }

        User savedUser = userRepository.save(user);

        return mapUserToResponse(savedUser);
    }

    /**
     * Login user and generate JWT token
     */
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new InvalidCredentialsException("User account is disabled");
        }

        // Generate tokens
        String accessToken = jwtTokenProvider.generateToken(request.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(request.getEmail());

        return new LoginResponse(
            accessToken,
            refreshToken,
            "Bearer",
            86400000, // 24 hours
            mapUserToResponse(user)
        );
    }

    /**
     * Get user by ID
     */
    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return mapUserToResponse(user);
    }

    /**
     * Get user by email
     */
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return mapUserToResponse(user);
    }

    /**
     * Update user
     */
    public UserResponse updateUser(String userId, RegisterRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);

        return mapUserToResponse(updatedUser);
    }

    /**
     * Change password
     */
    public void changePassword(String userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new InvalidCredentialsException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
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

        // Convert roles to string set
        if (user.getRoles() != null) {
            response.setRoles(user.getRoles().stream()
                    .map(Enum::name)
                    .collect(java.util.stream.Collectors.toSet()));
        }

        return response;
    }
}

