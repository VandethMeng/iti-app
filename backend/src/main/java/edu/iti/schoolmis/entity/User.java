package edu.iti.schoolmis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * User entity representing users in the system.
 * Supports multiple roles: STUDENT, TEACHER, ENROLLMENT_OFFICER, ADMIN
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String address;

    private Set<Role> roles;

    private boolean enabled;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    /**
     * Role enum for user role management
     */
    public enum Role {
        STUDENT("ROLE_STUDENT"),
        TEACHER("ROLE_TEACHER"),
        ENROLLMENT_OFFICER("ROLE_ENROLLMENT_OFFICER"),
        ADMIN("ROLE_ADMIN");

        private final String authority;

        Role(String authority) {
            this.authority = authority;
        }

        public String getAuthority() {
            return authority;
        }
    }
}

