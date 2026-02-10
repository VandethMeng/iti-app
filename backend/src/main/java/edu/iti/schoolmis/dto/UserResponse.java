package edu.iti.schoolmis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO for user response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;

    private String email;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String address;

    private Set<String> roles;

    private boolean enabled;

    private LocalDateTime createdAt;
}

