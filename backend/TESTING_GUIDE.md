# 🧪 HOW TO RUN & TEST THE BACKEND

## Quick 5-Minute Setup

### Step 1: Prerequisites Check
```bash
# Check Java
java -version
# Should show Java 21+

# Check Maven
mvn -version
# Should show Maven 3.6+

# Download MongoDB Community Edition
# https://www.mongodb.com/try/download/community
```

### Step 2: Start MongoDB
```bash
# Windows
mongod

# If MongoDB is installed, this starts the server
# Keep this terminal open while testing
```

### Step 3: Open New Terminal & Navigate to Project
```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
```

### Step 4: Build the Project
```bash
mvn clean install
# This downloads dependencies and compiles - takes 2-3 minutes
```

### Step 5: Run the Application
```bash
mvn spring-boot:run
# Server starts on http://localhost:8080/api
# Keep this terminal open
```

✅ **Backend is now running!**

---

## 🧪 Testing the API (In Another Terminal)

### Test 1: Register a User

**Command:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "Password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main Street",
    "role": "STUDENT"
  }'
```

**Expected Response:**
```json
{
  "id": "user123",
  "email": "student@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "enabled": true,
  "roles": ["STUDENT"],
  "createdAt": "2024-01-15T10:30:00"
}
```

✅ **Success = Registration works!**

---

### Test 2: Login & Get Token

**Command:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "Password123"
  }'
```

**Expected Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHVkZW50QGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDU0MTIyMDB9.abc123...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": "user123",
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

⚠️ **IMPORTANT:** Save the `accessToken` value - you'll use it for all other tests!

✅ **Success = Authentication works!**

---

### Test 3: Create Student Profile (Using Your Token)

**Replace `YOUR_TOKEN_HERE` with the accessToken from Test 2**

**Command:**
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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

**Expected Response:**
```json
{
  "id": "student123",
  "userId": "user123",
  "studentId": "STU001",
  "dateOfBirth": "2000-01-15",
  "gender": "Male",
  "parentName": "Jane Doe",
  "currentLevel": null,
  "gpa": 0.0,
  "active": true
}
```

✅ **Success = Student creation works!**

---

### Test 4: Create a Course

**Command:**
```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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

**Expected Response:**
```json
{
  "id": "course123",
  "courseCode": "MATH101",
  "courseName": "Calculus I",
  "level": "Level 1",
  "creditHours": 3,
  "maxCapacity": 50,
  "currentEnrollment": 0,
  "active": true
}
```

✅ **Success = Course creation works!**

---

### Test 5: Enroll Student in Course

**Command:**
```bash
curl -X POST "http://localhost:8080/api/enrollments?studentId=student123&courseId=course123" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "id": "enrollment123",
  "studentId": "student123",
  "courseId": "course123",
  "status": "ACTIVE",
  "enrollmentDate": "2024-01-15T10:30:00"
}
```

✅ **Success = Enrollment works!**

---

### Test 6: Record Attendance

**Command:**
```bash
curl -X POST http://localhost:8080/api/attendance \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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

✅ **Success = Attendance works!**

---

### Test 7: Record a Payment

**Command:**
```bash
curl -X POST http://localhost:8080/api/payments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "student123",
    "amount": 5000.00,
    "paymentType": "TUITION",
    "paymentDate": "2024-01-15",
    "paymentMethod": "BANK_TRANSFER",
    "description": "Semester 1 tuition"
  }'
```

✅ **Success = Payment works!**

---

### Test 8: Create a Document

**Command:**
```bash
curl -X POST http://localhost:8080/api/documents \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "student123",
    "documentType": "TRANSCRIPT",
    "fileName": "transcript.pdf",
    "fileUrl": "https://example.com/documents/transcript.pdf",
    "mimeType": "application/pdf",
    "fileSize": 204800,
    "issueDate": "2024-01-15"
  }'
```

✅ **Success = Document management works!**

---

## 🛠️ Testing with Postman/Insomnia (Recommended)

### Step 1: Download Postman
Download from: https://www.postman.com/downloads/

### Step 2: Create a Collection
1. Open Postman
2. Click "Create New" → "Collection"
3. Name it "School Management System"

### Step 3: Add Requests

**Request 1: Register**
- Method: POST
- URL: `http://localhost:8080/api/auth/register`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "Password123",
  "firstName": "Test",
  "lastName": "User",
  "phoneNumber": "+1234567890",
  "address": "123 St",
  "role": "STUDENT"
}
```

**Request 2: Login**
- Method: POST
- URL: `http://localhost:8080/api/auth/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```
- Response: Save the `accessToken` to use in other requests

**Request 3: Get Current User**
- Method: GET
- URL: `http://localhost:8080/api/auth/me`
- Headers: `Authorization: Bearer {your_token_here}`

### Step 4: Run Requests
1. Click "Send" on any request
2. View response below
3. Look for ✅ 200/201 status codes = Success

---

## 📊 Testing All Endpoints

### Test All Student Endpoints
```bash
# Create student
curl -X POST http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"userId":"...", "studentId":"STU001", ...}'

# Get student by ID
curl -X GET http://localhost:8080/api/students/{student-id} \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get all active students
curl -X GET http://localhost:8080/api/students/active \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update student GPA
curl -X PATCH http://localhost:8080/api/students/{student-id}/gpa?gpa=3.85 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test All Course Endpoints
```bash
# Get courses by level
curl -X GET http://localhost:8080/api/courses/level/Level%201 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get courses by department
curl -X GET http://localhost:8080/api/courses/department/Mathematics \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get courses by semester
curl -X GET http://localhost:8080/api/courses/semester/Fall%202024 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔍 Checking If Server Is Running

### Check 1: Browser
```
Open: http://localhost:8080/api
Should show an error page or be inaccessible (which is OK)
```

### Check 2: Test Endpoint
```bash
curl -X GET http://localhost:8080/api/auth/me
# If server is running, you'll get a response (even if error)
# If server is down, you'll get "Connection refused"
```

### Check 3: Check Logs
Look at the terminal where you ran `mvn spring-boot:run`
- Look for "Started SchoolMisApplication" message
- If you see "Tomcat started on port 8080", server is running!

---

## ❌ Troubleshooting

### Error: "Port 8080 already in use"
```bash
# Solution: Change the port in application.properties
# Add to: src/main/resources/application.properties
server.port=8081

# Then run with new port:
curl http://localhost:8081/api/auth/me
```

### Error: "MongoDB connection refused"
```bash
# Make sure MongoDB is running in another terminal
# Windows: mongod
# Or start MongoDB Service
```

### Error: "401 Unauthorized"
```bash
# You're missing the Authorization header
# Make sure to include:
# -H "Authorization: Bearer YOUR_ACTUAL_TOKEN"

# Get token by running login first
```

### Error: "404 Not Found"
```bash
# Check your URL spelling
# Make sure server is running
# Make sure you're using the right HTTP method (GET/POST/etc)
```

### Error: "Invalid JSON"
```bash
# Make sure your JSON is valid
# Use: https://jsonlint.com/ to validate
# Check quotes and commas are correct
```

---

## 🎯 Full Testing Workflow

1. **Start MongoDB** - `mongod`
2. **Start Backend** - `mvn spring-boot:run`
3. **Open New Terminal**
4. **Register User** - Get userId
5. **Login** - Get accessToken
6. **Create Student Profile** - Using userId
7. **Create Course** - Using courseCode
8. **Enroll Student** - Using studentId + courseId
9. **Record Attendance** - Using enrollmentId
10. **Record Payment** - Using studentId
11. **Upload Document** - Using studentId
12. **Create Notification** - Using userId

---

## ✅ Testing Checklist

- [ ] MongoDB is running
- [ ] Backend started successfully
- [ ] Registration endpoint works (201 response)
- [ ] Login endpoint works (200 response + token)
- [ ] Can get current user (200 response)
- [ ] Can create student (201 response)
- [ ] Can create course (201 response)
- [ ] Can enroll student (201 response)
- [ ] Can record attendance (201 response)
- [ ] Can process payment (201 response)
- [ ] Can upload document (201 response)
- [ ] Can send notification (201 response)

---

## 💡 Tips for Testing

1. **Save Your Token** - Copy the accessToken and keep it for testing
2. **Use Postman** - Easier than cURL for repeated testing
3. **Check Status Codes** - 200/201 = success, 400/404/500 = error
4. **Read Error Messages** - Tells you what's wrong
5. **Test One Module at a Time** - Don't test everything at once
6. **Use Valid IDs** - Replace `student123`, `course123`, etc. with real IDs from responses
7. **Keep Terminal Clean** - Look at raw response data for clues

---

## 📝 Example Test Sequence

```
Terminal 1: mongod                    [MongoDB running]
Terminal 2: mvn spring-boot:run       [Backend running]
Terminal 3: Run curl commands:

1. curl POST /api/auth/register
   Response: user123

2. curl POST /api/auth/login
   Response: token123

3. curl POST /api/students (with token)
   Response: student123

4. curl POST /api/courses (with token)
   Response: course123

5. curl POST /api/enrollments?studentId=student123&courseId=course123
   Response: enrollment123

✅ All working!
```

---

## 🎉 You're Ready to Test!

Follow the steps above and your backend will be fully tested and ready for frontend integration.

**Next:** Share these test results with your team!

---

**Questions?** Check API_DOCUMENTATION.md for detailed endpoint information.

