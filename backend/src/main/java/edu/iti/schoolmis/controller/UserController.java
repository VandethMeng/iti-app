package edu.iti.schoolmis.controller;

import edu.iti.schoolmis.dto.UserResponse;
import edu.iti.schoolmis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for user management endpoints
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get all users with different roles
     * GET /api/users
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Get users by role
     * GET /api/users/role/{role}
     */
    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserResponse>> getUsersByRole(@PathVariable String role) {
        List<UserResponse> users = userService.getUsersByRole(role);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Get user by ID
     * GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {
        UserResponse user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

