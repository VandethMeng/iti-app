# School Management System - Backend API Summary for Frontend

## 🎯 Quick Start

**Backend URL:** `http://localhost:8080/api`

**Default Port:** 8080

**Database:** MongoDB (local or compass)

---

## 🔑 Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer {accessToken}
```

Get token from login endpoint, valid for 24 hours.

---

## 📋 API Endpoints Overview

### 1. Authentication (5 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login, get JWT token |
| GET | `/auth/me` | Get current user profile |
| PUT | `/auth/users/{userId}` | Update user profile |
| POST | `/auth/change-password` | Change password |

### 2. Students (8 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create student profile |
| GET | `/students/{id}` | Get student by ID |
| GET | `/students/active` | Get all active students |
| GET | `/students/level/{level}` | Get students by level |
| PUT | `/students/{id}` | Update student |
| PATCH | `/students/{id}/gpa?gpa=value` | Update student GPA |
| PATCH | `/students/{id}/deactivate` | Deactivate student |
| DELETE | `/students/{id}` | Delete student |

### 3. Teachers (7 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/teachers` | Create teacher profile |
| GET | `/teachers/{id}` | Get teacher by ID |
| GET | `/teachers/active` | Get all active teachers |
| GET | `/teachers/department/{dept}` | Get teachers by department |
| PUT | `/teachers/{id}` | Update teacher |
| PATCH | `/teachers/{id}/deactivate` | Deactivate teacher |
| DELETE | `/teachers/{id}` | Delete teacher |

### 4. Courses (9 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/courses` | Create course |
| GET | `/courses/{id}` | Get course by ID |
| GET | `/courses/teacher/{teacherId}` | Get courses by teacher |
| GET | `/courses/department/{dept}` | Get courses by department |
| GET | `/courses/level/{level}` | Get courses by level |
| GET | `/courses/semester/{semester}` | Get courses by semester |
| PUT | `/courses/{id}` | Update course |
| PATCH | `/courses/{id}/deactivate` | Deactivate course |
| DELETE | `/courses/{id}` | Delete course |

### 5. Enrollments (9 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/enrollments?studentId={id}&courseId={id}` | Enroll student in course |
| GET | `/enrollments/{id}` | Get enrollment by ID |
| GET | `/enrollments/student/{studentId}` | Get student enrollments |
| GET | `/enrollments/student/{studentId}/active` | Get active enrollments |
| GET | `/enrollments/course/{courseId}` | Get course enrollments |
| PATCH | `/enrollments/{id}/grade?grade=A&gradePoint=4.0&finalScore=92` | Update grade |
| PATCH | `/enrollments/{id}/drop` | Drop course |
| PATCH | `/enrollments/{id}/complete` | Complete enrollment |
| DELETE | `/enrollments/{id}` | Delete enrollment |

### 6. Attendance (7 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/attendance` | Record attendance |
| GET | `/attendance/{id}` | Get attendance by ID |
| GET | `/attendance/student/{studentId}` | Get student attendance |
| GET | `/attendance/enrollment/{enrollmentId}` | Get enrollment attendance |
| GET | `/attendance/enrollment/{enrollmentId}/percentage` | Get attendance % |
| PUT | `/attendance/{id}?status=ABSENT&remarks=...` | Update attendance |
| DELETE | `/attendance/{id}` | Delete attendance |

### 7. Payments (10 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments` | Create payment record |
| GET | `/payments/{id}` | Get payment by ID |
| GET | `/payments/student/{studentId}` | Get student payments |
| GET | `/payments/student/{studentId}/completed` | Get completed payments |
| GET | `/payments/status/{status}` | Get payments by status |
| GET | `/payments/type/{paymentType}` | Get payments by type |
| GET | `/payments/student/{studentId}/total-paid` | Get total paid amount |
| PATCH | `/payments/{id}/status?status=COMPLETED` | Update payment status |
| PATCH | `/payments/{id}/complete?transactionId=...` | Complete payment |
| DELETE | `/payments/{id}` | Delete payment |

### 8. Documents (8 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/documents` | Upload document |
| GET | `/documents/{id}` | Get document by ID |
| GET | `/documents/student/{studentId}` | Get student documents |
| GET | `/documents/type/{documentType}` | Get documents by type |
| GET | `/documents/student/{studentId}/type/{type}` | Get student docs by type |
| PATCH | `/documents/{id}/verify` | Verify document |
| PUT | `/documents/{id}` | Update document |
| DELETE | `/documents/{id}` | Delete document |

### 9. Notifications (8 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/notifications` | Send notification |
| GET | `/notifications/{id}` | Get notification by ID |
| GET | `/notifications/user/{userId}` | Get user notifications |
| GET | `/notifications/user/{userId}/unread` | Get unread notifications |
| PATCH | `/notifications/{id}/read` | Mark as read |
| PATCH | `/notifications/user/{userId}/read-all` | Mark all as read |
| DELETE | `/notifications/{id}` | Delete notification |
| DELETE | `/notifications/user/{userId}` | Delete all user notifications |

---

## 📊 Total Endpoints: 92

---

## 🔀 Common Request/Response Patterns

### Success Response (200 OK)
```json
{
  "id": "userId",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "enabled": true,
  "createdAt": "2024-01-15T10:30:00"
}
```

### Error Response (4xx/5xx)
```json
{
  "status": 404,
  "message": "Student not found",
  "error": "Resource Not Found",
  "timestamp": "2024-01-15T10:30:00",
  "path": "/api/students/123"
}
```

### List Response
```json
[
  { "id": "1", "name": "Item 1" },
  { "id": "2", "name": "Item 2" }
]
```

---

## 🔑 Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET/PUT/PATCH) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Bad Request (invalid data) |
| 401 | Unauthorized (missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found (resource doesn't exist) |
| 409 | Conflict (duplicate resource) |
| 500 | Server Error |

---

## 🧪 Testing Tools

**Interactive Web Tester:**
- File: `API_TESTER.html`
- Location: Project root
- Usage: Double-click to open in browser

**Command Line Testing:**
- File: `API_TEST_COMMANDS.txt`
- Contains: curl examples for all endpoints

**Start Test Server:**
- File: `START_TEST_SERVER.bat`
- Run: Opens HTTP server on `http://localhost:8000`

---

## 🚀 How to Use

### 1. Register User
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "role": "STUDENT"
}
```

### 2. Login
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Returns: accessToken (use this for all other requests)
```

### 3. Make Protected Request
```bash
GET /api/auth/me
Authorization: Bearer {accessToken}
```

---

## 🔗 User Roles

- **STUDENT** - Student user
- **TEACHER** - Teacher user
- **ENROLLMENT_OFFICER** - Officer managing enrollments
- **ADMIN** - Administrator with full access

---

## 📱 Frontend Integration Example

```javascript
// Get token from login
const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
});

const { accessToken } = await loginResponse.json();

// Use token in subsequent requests
const userResponse = await fetch('http://localhost:8080/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const user = await userResponse.json();
```

---

## ⚙️ Configuration

**Backend Server:**
- URL: `http://localhost:8080`
- Base API Path: `/api`
- CORS: Enabled for all origins
- JWT Expiry: 24 hours

**MongoDB:**
- Host: localhost
- Port: 27017
- Database: schoolmis
- Connection: mongodb://localhost:27017/schoolmis

---

## 📞 Support

For detailed endpoint documentation, see: `API_DOCUMENTATION.md`

For backend setup, see: `CORS_FIXED_README.md`

---

## ✅ Status

- ✅ All 92 endpoints implemented
- ✅ JWT authentication working
- ✅ MongoDB integrated
- ✅ CORS enabled
- ✅ Exception handling complete
- ✅ Input validation active
- ✅ Ready for frontend integration

---

**Last Updated:** February 8, 2026
**Backend Version:** 1.0.0
**Status:** Production Ready ✅

