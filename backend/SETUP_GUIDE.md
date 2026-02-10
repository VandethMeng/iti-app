# School Management System - Backend Setup & Build Guide

## Project Structure

```
SchoolMIS/
├── src/
│   ├── main/
│   │   ├── java/edu/iti/schoolmis/
│   │   │   ├── config/           # Configuration classes
│   │   │   │   ├── CorsConfig.java
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── StudentController.java
│   │   │   │   ├── TeacherController.java
│   │   │   │   ├── CourseController.java
│   │   │   │   ├── EnrollmentController.java
│   │   │   │   ├── AttendanceController.java
│   │   │   │   ├── PaymentController.java
│   │   │   │   ├── DocumentController.java
│   │   │   │   └── NotificationController.java
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── LoginResponse.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── UserResponse.java
│   │   │   │   ├── StudentRequest.java
│   │   │   │   └── StudentResponse.java
│   │   │   ├── entity/           # MongoDB Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Student.java
│   │   │   │   ├── Teacher.java
│   │   │   │   ├── Course.java
│   │   │   │   ├── Enrollment.java
│   │   │   │   ├── Attendance.java
│   │   │   │   ├── Payment.java
│   │   │   │   ├── Document.java
│   │   │   │   └── Notification.java
│   │   │   ├── exception/        # Exception Classes
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   ├── InvalidCredentialsException.java
│   │   │   │   ├── DuplicateResourceException.java
│   │   │   │   ├── ErrorResponse.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── repository/       # Data Access Layer
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── StudentRepository.java
│   │   │   │   ├── TeacherRepository.java
│   │   │   │   ├── CourseRepository.java
│   │   │   │   ├── EnrollmentRepository.java
│   │   │   │   ├── AttendanceRepository.java
│   │   │   │   ├── PaymentRepository.java
│   │   │   │   ├── DocumentRepository.java
│   │   │   │   └── NotificationRepository.java
│   │   │   ├── security/         # Security Components
│   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   ├── service/          # Business Logic Layer
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── StudentService.java
│   │   │   │   ├── TeacherService.java
│   │   │   │   ├── CourseService.java
│   │   │   │   ├── EnrollmentService.java
│   │   │   │   ├── AttendanceService.java
│   │   │   │   ├── PaymentService.java
│   │   │   │   ├── DocumentService.java
│   │   │   │   └── NotificationService.java
│   │   │   └── SchoolMisApplication.java  # Main Application
│   │   └── resources/
│   │       └── application.properties     # Configuration
│   └── test/
│       └── java/...
├── pom.xml                  # Maven configuration
├── backend.md              # Backend specifications
├── API_DOCUMENTATION.md    # Detailed API docs
└── SETUP_GUIDE.md         # This file
```

## Prerequisites

### Required Software
- **Java 21+** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK
- **Maven 3.6+** - Download from [Maven](https://maven.apache.org/download.cgi)
- **MongoDB 4.0+** - Download from [MongoDB](https://www.mongodb.com/try/download/community)
- **Git** (optional) - For version control

### Verify Installation
```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check MongoDB
mongod --version
```

## Installation Steps

### 1. Start MongoDB
```bash
# Windows
mongod

# Or use MongoDB Atlas (Cloud)
```

### 2. Navigate to Project Directory
```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
```

### 3. Update Configuration
Edit `src/main/resources/application.properties`:
```properties
# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/schoolmis
spring.data.mongodb.database=schoolmis

# JWT (Change in production!)
jwt.secret=your_very_long_secret_key_at_least_32_characters_recommended_64
jwt.expiration=86400000

# Server
server.port=8080
```

### 4. Install Dependencies
```bash
mvn clean install
```

### 5. Run the Application
```bash
mvn spring-boot:run
```

Or build and run:
```bash
mvn clean package
java -jar target/SchoolMIS-0.0.1-SNAPSHOT.jar
```

## API Base URL

Once running, the API is available at:
```
http://localhost:8080/api
```

## Testing the Backend

### 1. Register a New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "Password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main St",
    "role": "STUDENT"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "Password123"
  }'
```

Response will include `accessToken` - save this for authenticated requests.

### 3. Create a Student Profile
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{userId}",
    "studentId": "STU001",
    "dateOfBirth": "2000-01-15",
    "gender": "Male",
    "parentName": "Jane Doe",
    "parentPhone": "+1234567890",
    "parentEmail": "parent@example.com"
  }'
```

## Modules Overview

### 1. Authentication Module (Auth)
- User registration with role assignment
- JWT-based login
- Password change functionality
- User profile management

**Key Endpoints:**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/users/{userId}
- POST /api/auth/change-password

### 2. Student Module
- Create and manage student profiles
- Track GPA and academic level
- View student enrollment history
- Manage parent/guardian information

**Key Endpoints:**
- POST /api/students
- GET /api/students/{id}
- GET /api/students/active
- GET /api/students/level/{level}
- PUT /api/students/{id}
- PATCH /api/students/{id}/gpa

### 3. Teacher Module
- Create and manage teacher profiles
- Track department and qualifications
- Manage course assignments

**Key Endpoints:**
- POST /api/teachers
- GET /api/teachers/{id}
- GET /api/teachers/department/{department}
- PUT /api/teachers/{id}

### 4. Course Module
- Create and manage courses
- Track course capacity and enrollment
- Link courses to teachers and departments

**Key Endpoints:**
- POST /api/courses
- GET /api/courses/{id}
- GET /api/courses/teacher/{teacherId}
- GET /api/courses/semester/{semester}
- PUT /api/courses/{id}

### 5. Enrollment Module
- Enroll students in courses
- Track enrollment status
- Record and update grades

**Key Endpoints:**
- POST /api/enrollments
- GET /api/enrollments/student/{studentId}
- PATCH /api/enrollments/{id}/grade
- PATCH /api/enrollments/{id}/drop

### 6. Attendance Module
- Record attendance for courses
- Calculate attendance percentage
- Track attendance history

**Key Endpoints:**
- POST /api/attendance
- GET /api/attendance/student/{studentId}
- GET /api/attendance/enrollment/{enrollmentId}/percentage
- PUT /api/attendance/{id}

### 7. Payment Module
- Process student payments
- Track payment status and history
- Support multiple payment types

**Key Endpoints:**
- POST /api/payments
- GET /api/payments/student/{studentId}
- GET /api/payments/status/{status}
- PATCH /api/payments/{id}/complete

### 8. Document Module
- Upload and manage student documents
- Track document verification status
- Support multiple document types

**Key Endpoints:**
- POST /api/documents
- GET /api/documents/student/{studentId}
- GET /api/documents/type/{documentType}
- PATCH /api/documents/{id}/verify

### 9. Notification Module
- Send notifications to users
- Track notification read status
- Manage notification preferences

**Key Endpoints:**
- POST /api/notifications
- GET /api/notifications/user/{userId}
- GET /api/notifications/user/{userId}/unread
- PATCH /api/notifications/{id}/read

## Database Design

### MongoDB Collections

1. **users** - All system users
2. **students** - Student profiles with academic info
3. **teachers** - Teacher profiles with department info
4. **courses** - Course definitions and details
5. **enrollments** - Student course enrollments with grades
6. **attendance** - Attendance records
7. **payments** - Payment transactions
8. **documents** - Student documents and files
9. **notifications** - User notifications

## Security Features

### Implemented
- ✅ JWT token-based authentication
- ✅ BCrypt password encryption
- ✅ Role-based access control (RBAC)
- ✅ CORS configuration
- ✅ Input validation with DTOs
- ✅ Global exception handling
- ✅ MongoDB query injection prevention

### Recommended for Production
- 🔄 HTTPS/TLS encryption
- 🔄 API rate limiting
- 🔄 Audit logging
- 🔄 Environment-based configuration
- 🔄 JWT refresh token rotation
- 🔄 Database backup strategy

## Troubleshooting

### MongoDB Connection Error
```
Error: Unable to connect to MongoDB
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check connection string in application.properties
- Verify MongoDB is on `localhost:27017`

### Port Already in Use
```
Port 8080 is already in use
```
**Solution:**
- Change port in application.properties: `server.port=8081`
- Or kill existing process on port 8080

### JWT Token Invalid
```
401 Unauthorized: Invalid or expired token
```
**Solution:**
- Ensure JWT secret is correctly set
- Check token hasn't expired (24 hours)
- Use correct Bearer token format

### Maven Build Failure
```
[ERROR] BUILD FAILURE
```
**Solution:**
```bash
mvn clean install -U
```

## Next Steps

1. **Share API Documentation** - Send `API_DOCUMENTATION.md` to frontend team
2. **Setup Testing** - Create test data via API
3. **Enable HTTPS** - Configure SSL/TLS for production
4. **Setup CI/CD** - Configure GitHub Actions or Jenkins
5. **Database Backup** - Setup MongoDB backup strategy
6. **Monitoring** - Setup application monitoring and logging

## Frontend Integration

The frontend (Next.js) should:
1. Use `http://localhost:8080/api` for API base URL (development)
2. Include JWT token in all authenticated requests via `Authorization: Bearer {token}` header
3. Handle 401 responses for token refresh/re-login
4. Parse error responses from GlobalExceptionHandler

## Production Deployment

### Environment Setup
```bash
# Set environment variables
export MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/schoolmis
export JWT_SECRET=your_production_secret_key_64_characters_minimum
export SERVER_PORT=8080
```

### Build Production JAR
```bash
mvn clean package -DskipTests
```

### Deploy
```bash
java -Dspring.profiles.active=production \
     -Dspring.data.mongodb.uri=$MONGODB_URI \
     -jar target/SchoolMIS-0.0.1-SNAPSHOT.jar
```

## Performance Optimization

### Database Indexing
Add indexes for frequently queried fields:
```javascript
// Create indexes in MongoDB
db.students.createIndex({ "userId": 1 })
db.enrollments.createIndex({ "studentId": 1, "courseId": 1 })
db.payments.createIndex({ "studentId": 1, "status": 1 })
```

### Caching
Consider adding Redis for:
- User session caching
- Course list caching
- User notifications caching

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [RESTful API Design](https://restfulapi.net/)

## Support & Contact

For issues or questions during development:
1. Check logs: `logs/schoolmis.log`
2. Review error messages in API responses
3. Check backend.md for specifications
4. Refer to API_DOCUMENTATION.md for endpoint details

---

**Backend Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Ready for Development

