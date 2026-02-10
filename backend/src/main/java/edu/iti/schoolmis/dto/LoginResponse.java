package edu.iti.schoolmis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for login response with JWT token
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String accessToken;

    private String refreshToken;

    private String tokenType;

    private long expiresIn;

    private UserResponse user;
}

