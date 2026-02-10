package edu.iti.schoolmis.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Welcome controller for root path
 */
@RestController
public class WelcomeController {

    @GetMapping("/")
    public ResponseEntity<String> welcome() {
        return ResponseEntity.ok("Welcome to School Management System API. Use /api/auth/login to get started.");
    }

    @GetMapping("/api")
    public ResponseEntity<String> api() {
        return ResponseEntity.ok("School Management System API v1.0 - All endpoints are under /api/");
    }
}

