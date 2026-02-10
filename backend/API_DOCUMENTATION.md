# School Management System - Backend API Documentation

## Overview
This is the backend API for the School Management System (SMS) built with Spring Boot, MongoDB, and Spring Security with JWT authentication.

## Getting Started

### Prerequisites
- Java 21+
- Maven 3.6+
- MongoDB (running on localhost:27017)

### Installation

1. **Clone the repository**
```bash
cd SchoolMIS
```

2. **Install dependencies**
```bash
mvn clean install
```

3. **Configure application.properties**
Update `src/main/resources/application.properties` with your MongoDB connection details and JWT secret:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/schoolmis
jwt.secret=your_secret_key_change_this_in_production
```

4. **Run the application**
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

---

## API Endpoints

### Authentication Module

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "address": "123 Main Street",
  "role": "STUDENT"
}

Response: 201 Created
{
  "id": "userId",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "roles": ["STUDENT"]
}
```

#### 2. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "enabled": true
  }
}
```

#### 3. Get Current User
```
GET /api/auth/me
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "id": "userId",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### 4. Update User
```
PUT /api/auth/users/{userId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+9876543210",
  "address": "456 Oak Avenue"
}

Response: 200 OK
```

#### 5. Change Password
```
POST /api/auth/change-password
Authorization: Bearer {accessToken}
?oldPassword=OldPassword123&newPassword=NewPassword456

Response: 200 OK
```

---

### Student Module

#### 1. Create Student
```
POST /api/students
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "userId": "userId",
  "studentId": "STU001",
  "dateOfBirth": "2000-01-15",
  "gender": "Male",
  "parentName": "John Smith Sr.",
  "parentPhone": "+1234567890",
  "parentEmail": "parent@example.com"
}

Response: 201 Created
{
  "id": "studentId",
  "studentId": "STU001",
  "userId": "userId",
  "gender": "Male",
  "gpa": 0.0,
  "active": true
}
```

#### 2. Get Student by ID
```
GET /api/students/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "id": "studentId",
  "studentId": "STU001",
  "userId": "userId",
  "currentLevel": "Level 1",
  "gpa": 3.75,
  "active": true
}
```

#### 3. Get All Active Students
```
GET /api/students/active
Authorization: Bearer {accessToken}

Response: 200 OK
[
  {
    "id": "studentId1",
    "studentId": "STU001",
    "gpa": 3.75
  },
  {
    "id": "studentId2",
    "studentId": "STU002",
    "gpa": 3.45
  }
]
```

#### 4. Get Students by Level
```
GET /api/students/level/{level}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 5. Update Student
```
PUT /api/students/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "gender": "Female",
  "parentName": "Jane Smith",
  "parentPhone": "+0987654321"
}

Response: 200 OK
```

#### 6. Update Student GPA
```
PATCH /api/students/{id}/gpa?gpa=3.85
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Deactivate Student
```
PATCH /api/students/{id}/deactivate
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 8. Delete Student
```
DELETE /api/students/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Teacher Module

#### 1. Create Teacher
```
POST /api/teachers
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "userId": "userId",
  "teacherId": "TCH001",
  "department": "Mathematics",
  "qualification": "M.Sc",
  "yearsOfExperience": 5,
  "specialization": "Calculus",
  "officeLocation": "Building A, Room 101",
  "officePhone": "+1234567890"
}

Response: 201 Created
```

#### 2. Get Teacher by ID
```
GET /api/teachers/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get All Active Teachers
```
GET /api/teachers/active
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 4. Get Teachers by Department
```
GET /api/teachers/department/{department}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 5. Update Teacher
```
PUT /api/teachers/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "department": "Physics",
  "yearsOfExperience": 6
}

Response: 200 OK
```

#### 6. Deactivate Teacher
```
PATCH /api/teachers/{id}/deactivate
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Delete Teacher
```
DELETE /api/teachers/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Course Module

#### 1. Create Course
```
POST /api/courses
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "courseCode": "MATH101",
  "courseName": "Calculus I",
  "description": "Introduction to Calculus",
  "level": "Level 1",
  "creditHours": 3,
  "teacherId": "teacherId",
  "department": "Mathematics",
  "maxCapacity": 50,
  "semester": "Fall 2024"
}

Response: 201 Created
```

#### 2. Get Course by ID
```
GET /api/courses/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get Courses by Teacher
```
GET /api/courses/teacher/{teacherId}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 4. Get Courses by Department
```
GET /api/courses/department/{department}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 5. Get Courses by Level
```
GET /api/courses/level/{level}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 6. Get Courses by Semester
```
GET /api/courses/semester/{semester}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Update Course
```
PUT /api/courses/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "courseName": "Advanced Calculus",
  "creditHours": 4
}

Response: 200 OK
```

#### 8. Deactivate Course
```
PATCH /api/courses/{id}/deactivate
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 9. Delete Course
```
DELETE /api/courses/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Enrollment Module

#### 1. Enroll Student in Course
```
POST /api/enrollments?studentId={studentId}&courseId={courseId}
Authorization: Bearer {accessToken}

Response: 201 Created
{
  "id": "enrollmentId",
  "studentId": "studentId",
  "courseId": "courseId",
  "status": "ACTIVE",
  "enrollmentDate": "2024-01-15T10:30:00"
}
```

#### 2. Get Enrollment by ID
```
GET /api/enrollments/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get Student Enrollments
```
GET /api/enrollments/student/{studentId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 4. Get Active Enrollments
```
GET /api/enrollments/student/{studentId}/active
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 5. Get Course Enrollments
```
GET /api/enrollments/course/{courseId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 6. Update Enrollment Grade
```
PATCH /api/enrollments/{id}/grade?grade=A&gradePoint=4.0&finalScore=92
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Drop Enrollment
```
PATCH /api/enrollments/{id}/drop
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 8. Complete Enrollment
```
PATCH /api/enrollments/{id}/complete
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 9. Delete Enrollment
```
DELETE /api/enrollments/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Attendance Module

#### 1. Record Attendance
```
POST /api/attendance
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "enrollmentId": "enrollmentId",
  "studentId": "studentId",
  "courseId": "courseId",
  "attendanceDate": "2024-01-15",
  "status": "PRESENT",
  "remarks": "On time"
}

Response: 201 Created
```

#### 2. Get Attendance by ID
```
GET /api/attendance/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get Student Attendance
```
GET /api/attendance/student/{studentId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 4. Get Enrollment Attendance
```
GET /api/attendance/enrollment/{enrollmentId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 5. Get Attendance Percentage
```
GET /api/attendance/enrollment/{enrollmentId}/percentage
Authorization: Bearer {accessToken}

Response: 200 OK
95.5
```

#### 6. Update Attendance
```
PUT /api/attendance/{id}?status=ABSENT&remarks=Sick leave
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Delete Attendance
```
DELETE /api/attendance/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Payment Module

#### 1. Create Payment
```
POST /api/payments
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "studentId": "studentId",
  "amount": 5000.00,
  "paymentType": "TUITION",
  "paymentDate": "2024-01-15",
  "paymentMethod": "BANK_TRANSFER",
  "description": "Semester 1 tuition"
}

Response: 201 Created
```

#### 2. Get Payment by ID
```
GET /api/payments/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get Student Payments
```
GET /api/payments/student/{studentId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 4. Get Student Completed Payments
```
GET /api/payments/student/{studentId}/completed
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 5. Get Payments by Status
```
GET /api/payments/status/{status}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 6. Get Payments by Type
```
GET /api/payments/type/{paymentType}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 7. Calculate Total Paid
```
GET /api/payments/student/{studentId}/total-paid
Authorization: Bearer {accessToken}

Response: 200 OK
15000.00
```

#### 8. Update Payment Status
```
PATCH /api/payments/{id}/status?status=COMPLETED
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 9. Complete Payment
```
PATCH /api/payments/{id}/complete?transactionId=TXN123456
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 10. Delete Payment
```
DELETE /api/payments/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Document Module

#### 1. Upload Document
```
POST /api/documents
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "studentId": "studentId",
  "documentType": "TRANSCRIPT",
  "fileName": "transcript.pdf",
  "fileUrl": "https://example.com/documents/transcript.pdf",
  "mimeType": "application/pdf",
  "fileSize": 2048000,
  "issueDate": "2024-01-15"
}

Response: 201 Created
```

#### 2. Get Document by ID
```
GET /api/documents/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get Student Documents
```
GET /api/documents/student/{studentId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 4. Get Documents by Type
```
GET /api/documents/type/{documentType}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 5. Get Student Documents by Type
```
GET /api/documents/student/{studentId}/type/{documentType}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 6. Verify Document
```
PATCH /api/documents/{id}/verify
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Update Document
```
PUT /api/documents/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fileName": "transcript_updated.pdf",
  "fileUrl": "https://example.com/documents/transcript_updated.pdf"
}

Response: 200 OK
```

#### 8. Delete Document
```
DELETE /api/documents/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

### Notification Module

#### 1. Send Notification
```
POST /api/notifications
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "userId": "userId",
  "title": "Enrollment Confirmed",
  "message": "Your enrollment in MATH101 has been confirmed",
  "notificationType": "INFO",
  "relatedEntityId": "enrollmentId",
  "relatedEntityType": "ENROLLMENT"
}

Response: 201 Created
```

#### 2. Get Notification by ID
```
GET /api/notifications/{id}
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 3. Get User Notifications
```
GET /api/notifications/user/{userId}
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 4. Get Unread Notifications
```
GET /api/notifications/user/{userId}/unread
Authorization: Bearer {accessToken}

Response: 200 OK
[...]
```

#### 5. Mark Notification as Read
```
PATCH /api/notifications/{id}/read
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 6. Mark All as Read
```
PATCH /api/notifications/user/{userId}/read-all
Authorization: Bearer {accessToken}

Response: 200 OK
```

#### 7. Delete Notification
```
DELETE /api/notifications/{id}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

#### 8. Delete All User Notifications
```
DELETE /api/notifications/user/{userId}
Authorization: Bearer {accessToken}

Response: 204 No Content
```

---

## Error Handling

All errors follow this format:

```json
{
  "status": 404,
  "message": "Student not found with id: 123",
  "error": "Resource Not Found",
  "timestamp": "2024-01-15T10:30:00",
  "path": "/api/students/123"
}
```

### Common Status Codes
- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {accessToken}
```

Tokens expire after 24 hours. Use the refresh token to get a new access token.

---

## Development & Deployment

### Build for Production
```bash
mvn clean package
```

### Run Production Build
```bash
java -jar target/SchoolMIS-0.0.1-SNAPSHOT.jar
```

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key (min 32 characters)
- `SERVER_PORT` - Server port (default 8080)

---

## Notes

1. **JWT Secret**: Change the default JWT secret in `application.properties` before deploying to production
2. **MongoDB**: Ensure MongoDB is running and accessible
3. **CORS**: CORS is configured for `http://localhost:3000` and `http://localhost:3001` - update for production
4. **Password**: All passwords are BCrypt encrypted
5. **Timestamps**: All timestamps are in ISO-8601 format

---

## Support

For issues or questions, contact the development team.

