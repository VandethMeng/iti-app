 # Quick Start Guide - School Management System Backend

## 🚀 Get Running in 5 Minutes

### Step 1: Prerequisites Check (1 min)
```bash
# Verify Java 21
java -version

# Verify Maven
mvn -version

# Start MongoDB (if local)
mongod
```

### Step 2: Navigate to Project (30 sec)
```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
```

### Step 3: Build Project (2 min)
```bash
mvn clean install
```

### Step 4: Run Application (1 min 30 sec)
```bash
mvn spring-boot:run
```

✅ **Server running on http://localhost:8080/api**

---

## 🧪 Test the API (Using cURL)

### 1. Register a User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main Street",
    "role": "STUDENT"
  }'
```

**Response:**
```json
{
  "id": "user123",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "roles": ["STUDENT"],
  "enabled": true,
  "createdAt": "2024-01-15T10:30:00"
}
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": "user123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

⚠️ **Save the accessToken for next requests**

### 3. Create Student Profile
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "studentId": "STU001",
    "dateOfBirth": "2000-01-15",
    "gender": "Male",
    "parentName": "Jane Doe",
    "parentPhone": "+0987654321",
    "parentEmail": "parent@example.com"
  }'
```

### 4. Get Student Profile
```bash
curl -X GET http://localhost:8080/api/students/STU001 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 5. Create a Course
```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "courseCode": "MATH101",
    "courseName": "Calculus I",
    "description": "Introduction to Calculus",
    "level": "Level 1",
    "creditHours": 3,
    "department": "Mathematics",
    "maxCapacity": 50,
    "semester": "Fall 2024"
  }'
```

### 6. Enroll Student in Course
```bash
curl -X POST "http://localhost:8080/api/enrollments?studentId=student123&courseId=course123" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 7. Record Attendance
```bash
curl -X POST http://localhost:8080/api/attendance \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "enrollmentId": "enrollment123",
    "studentId": "student123",
    "courseId": "course123",
    "attendanceDate": "2024-01-15",
    "status": "PRESENT",
    "remarks": "On time"
  }'
```

---

## 📡 API Base URL
```
http://localhost:8080/api
```

## 🔑 Authentication Header
```
Authorization: Bearer {accessToken}
```

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `API_DOCUMENTATION.md` | Complete API reference with all endpoints |
| `SETUP_GUIDE.md` | Detailed installation and configuration |
| `BACKEND_COMPLETE.md` | What was built and how to use it |
| `pom.xml` | Maven dependencies and build configuration |
| `application.properties` | Database and JWT configuration |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8080 already in use | Change port: Edit `application.properties` → `server.port=8081` |
| MongoDB connection error | Ensure MongoDB is running: `mongod` |
| 401 Unauthorized | Token expired or missing. Login again to get new token |
| 404 Resource not found | Check entity ID and endpoint path |

---

## 💡 Common Tasks

### Add New Role
Edit `User.java` in the Role enum and register controller/service as needed.

### Add New Endpoint
1. Create method in Service
2. Add method in Controller with @PostMapping/@GetMapping/@PutMapping/@DeleteMapping
3. Test with cURL or Postman
4. Document in API_DOCUMENTATION.md

### Query by Custom Field
Add method to Repository interface, e.g.:
```java
List<Student> findByParentEmail(String parentEmail);
```

### Handle Custom Exception
Create exception in `exception/` package and add handler in `GlobalExceptionHandler.java`

---

## 🔐 Security Tips

1. **Never expose JWT secret** - Keep it in environment variables
2. **Use HTTPS in production** - Not just HTTP
3. **Rotate tokens regularly** - Implement refresh token rotation
4. **Validate all inputs** - Use DTOs with validation annotations
5. **Log security events** - Track login attempts, errors
6. **Use strong passwords** - Enforce in registration
7. **Keep dependencies updated** - Regular security patches

---

## 📊 Database Schema Overview

```
Users Collection
├── Stores all users (Students, Teachers, Admins, Officers)
├── Fields: email, password (encrypted), firstName, lastName, roles
└── Used by: Authentication, User management

Students Collection
├── Student profiles linked to Users
├── Fields: userId, studentId, gpa, enrollmentDate, active
└── Used by: Student management, enrollment tracking

Teachers Collection
├── Teacher profiles linked to Users
├── Fields: userId, teacherId, department, qualification
└── Used by: Course assignment, teacher lookup

Courses Collection
├── Course definitions
├── Fields: courseCode, courseName, teacherId, maxCapacity, level
└── Used by: Course management, enrollment

Enrollments Collection
├── Student course enrollments with grades
├── Fields: studentId, courseId, grade, finalScore, status
└── Used by: Grade tracking, GPA calculation

Attendance Collection
├── Daily attendance records
├── Fields: enrollmentId, studentId, attendanceDate, status
└── Used by: Attendance tracking, percentage calculation

Payments Collection
├── Payment transactions
├── Fields: studentId, amount, paymentType, status, transactionId
└── Used by: Payment processing, financial tracking

Documents Collection
├── Student documents and files
├── Fields: studentId, documentType, fileUrl, verified
└── Used by: Document storage, verification

Notifications Collection
├── User notifications
├── Fields: userId, title, message, read, relatedEntityId
└── Used by: Notification delivery, user alerts
```

---

## 🚢 Deployment Checklist

- [ ] Change JWT secret in application.properties
- [ ] Setup MongoDB Atlas or remote MongoDB
- [ ] Configure HTTPS/SSL certificates
- [ ] Setup environment variables
- [ ] Configure CORS for production domain
- [ ] Setup logging and monitoring
- [ ] Create database backups
- [ ] Load test the application
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process

---

## 📞 Quick Reference

### Roles Available
- `STUDENT` - Student role
- `TEACHER` - Teacher role
- `ENROLLMENT_OFFICER` - Enrollment office staff
- `ADMIN` - System administrator

### Payment Types
- `TUITION` - Tuition fees
- `EXAM_FEE` - Exam fees
- `REGISTRATION` - Registration fees
- `OTHER` - Other payments

### Document Types
- `TRANSCRIPT` - Academic transcript
- `CERTIFICATE` - Degree/completion certificate
- `ADMISSION_LETTER` - Admission letter
- `IDENTITY` - Identity document
- `OTHER` - Other documents

### Attendance Status
- `PRESENT` - Student present
- `ABSENT` - Student absent
- `LATE` - Student arrived late
- `EXCUSED` - Absence excused

### Enrollment Status
- `ACTIVE` - Currently enrolled
- `COMPLETED` - Course completed
- `DROPPED` - Course dropped
- `PENDING` - Awaiting confirmation

---

## 📚 Learn More

1. **Full API Reference:** See `API_DOCUMENTATION.md`
2. **Installation Help:** See `SETUP_GUIDE.md`
3. **Project Overview:** See `BACKEND_COMPLETE.md`
4. **Code Examples:** Check repository method implementations

---

## 🎯 What's Next?

1. ✅ Backend is complete and running
2. 👉 **Next:** Frontend team uses API_DOCUMENTATION.md for Next.js integration
3. 🧪 Run integration tests
4. 🚀 Deploy to staging/production
5. 📈 Monitor and maintain

---

## ❓ Questions?

- API endpoints → Check `API_DOCUMENTATION.md`
- Installation issues → Check `SETUP_GUIDE.md`
- Backend architecture → Check `BACKEND_COMPLETE.md`
- Code details → Check class comments
- Configuration → Check `application.properties`

---

**Status:** ✅ Ready to Use  
**Version:** 1.0.0  
**Last Updated:** 2024

Happy coding! 🚀

