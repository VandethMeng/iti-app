package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.dto.LoginRequest;
import edu.iti.schoolmis.dto.LoginResponse;
import edu.iti.schoolmis.dto.RegisterRequest;
import edu.iti.schoolmis.dto.UserResponse;
import edu.iti.schoolmis.security.JwtTokenProvider;
import edu.iti.schoolmis.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

/**
 * REST Controller for authentication endpoints
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * Register a new user
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Login user
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get current user profile
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@RequestHeader("Authorization") String token) {
        // Extract email from token - in real implementation, this would be extracted from SecurityContext
        String email = extractEmailFromToken(token);
        UserResponse response = authService.getUserByEmail(email);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get user by ID
     * GET /api/auth/users/{userId}
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String userId) {
        UserResponse response = authService.getUserById(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update user
     * PUT /api/auth/users/{userId}
     */
    @PutMapping("/users/{userId}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String userId,
            @Valid @RequestBody RegisterRequest request) {
        UserResponse response = authService.updateUser(userId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Change password
     * POST /api/auth/change-password
     */
    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            @RequestHeader("Authorization") String token,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        String email = extractEmailFromToken(token);
        UserResponse user = authService.getUserByEmail(email);
        authService.changePassword(user.getId(), oldPassword, newPassword);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Extract email from JWT token
     */
    private String extractEmailFromToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
            return jwtTokenProvider.getEmailFromToken(token); // Parse token and extract email
        }
        throw new IllegalArgumentException("Invalid Authorization header format");
    }
}

