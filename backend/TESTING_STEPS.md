# ▶️ STEP-BY-STEP: HOW TO RUN & TEST

## 📋 THE COMPLETE WORKFLOW

```
┌─────────────────────────────────────────────────────────────┐
│                    TESTING WORKFLOW                         │
└─────────────────────────────────────────────────────────────┘

STEP 1: Open 3 Terminals (or Command Prompts)
├─ Terminal 1: MongoDB
├─ Terminal 2: Backend Server
└─ Terminal 3: Testing (cURL/Postman)

STEP 2: Terminal 1 - Start MongoDB
├─ mongod
└─ Output: "Waiting for connections on port 27017"

STEP 3: Terminal 2 - Start Backend
├─ cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
├─ mvn clean install  (first time only - 2-3 minutes)
├─ mvn spring-boot:run
└─ Output: "Tomcat started on port(s): 8080"

STEP 4: Terminal 3 - Test API
├─ Register User → Get userId
├─ Login → Get token
├─ Create Student
├─ Create Course
├─ Enroll Student
└─ Test Other Endpoints

STEP 5: Success!
└─ Backend working ✅
```

---

## 🖥️ TERMINAL 1: MongoDB

### Open Command Prompt / PowerShell

```
C:\Users\YourName> mongod
```

### Expected Output:
```
2024-01-15T10:30:00.000+0000 I CONTROL  [initandlisten] 
2024-01-15T10:30:00.000+0000 I STORAGE  [initandlisten] 
2024-01-15T10:30:00.000+0000 I REPL     [initandlisten]
...waiting for connections on port 27017
```

✅ **MongoDB is now running** - Keep this terminal open!

---

## 🖥️ TERMINAL 2: Backend Server

### Open Another Command Prompt / PowerShell

```
C:\Users\Dell\OneDrive\Desktop\SchoolMIS> mvn clean install
```

**First time only** - This downloads all dependencies (2-3 minutes)

### Then run:
```
C:\Users\Dell\OneDrive\Desktop\SchoolMIS> mvn spring-boot:run
```

### Expected Output:
```
...
2024-01-15 10:30:00.000  INFO 1234 --- [  main] o.s.b.w.embedded.tomcat.TomcatWebServer
Tomcat started on port(s): 8080 (http) with context path ''
2024-01-15 10:30:00.000  INFO 1234 --- [  main] e.i.s.SchoolMisApplication
Started SchoolMisApplication in X.XXX seconds (JVM running for X.XXX)
```

✅ **Backend is now running on http://localhost:8080/api**

---

## 🖥️ TERMINAL 3: Testing

### Open Another Command Prompt / PowerShell

Now you'll run test commands here!

---

## 🧪 TEST 1: Register a User

Copy and paste this command:

```bash
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d "{\"email\": \"john@example.com\", \"password\": \"Password123\", \"firstName\": \"John\", \"lastName\": \"Doe\", \"phoneNumber\": \"+1234567890\", \"address\": \"123 Main\", \"role\": \"STUDENT\"}"
```

### Expected Response:
```json
{
  "id": "65a4b1c2d3e4f5g6h7i8j9k0",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "enabled": true,
  "roles": ["STUDENT"]
}
```

✅ **Registration Works!**

**SAVE the `id` value** - You'll need it later!

---

## 🧪 TEST 2: Login & Get Token

```bash
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"email\": \"john@example.com\", \"password\": \"Password123\"}"
```

### Expected Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0Ijox...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": "65a4b1c2d3e4f5g6h7i8j9k0"
  }
}
```

⚠️ **COPY THE accessToken VALUE** - You need this for ALL other tests!

---

## 🧪 TEST 3: Create Student Profile

Replace `YOUR_USER_ID_HERE` and `YOUR_TOKEN_HERE` with actual values:

```bash
curl -X POST http://localhost:8080/api/students -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d "{\"userId\": \"YOUR_USER_ID_HERE\", \"studentId\": \"STU001\", \"dateOfBirth\": \"2000-01-15\", \"gender\": \"Male\", \"parentName\": \"Jane Doe\", \"parentPhone\": \"+0987654321\", \"parentEmail\": \"parent@example.com\"}"
```

### Expected Response:
```json
{
  "id": "65a4b2c3d4e5f6g7h8i9j0k1",
  "userId": "65a4b1c2d3e4f5g6h7i8j9k0",
  "studentId": "STU001",
  "gender": "Male",
  "gpa": 0.0,
  "active": true
}
```

✅ **Student Created!**

---

## 🧪 TEST 4: Create a Course

```bash
curl -X POST http://localhost:8080/api/courses -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d "{\"courseCode\": \"MATH101\", \"courseName\": \"Calculus I\", \"description\": \"Introduction to Calculus\", \"level\": \"Level 1\", \"creditHours\": 3, \"department\": \"Mathematics\", \"maxCapacity\": 50, \"semester\": \"Fall 2024\"}"
```

### Expected Response:
```json
{
  "id": "65a4b3c4d5e6f7g8h9i0j1k2",
  "courseCode": "MATH101",
  "courseName": "Calculus I",
  "level": "Level 1",
  "creditHours": 3,
  "active": true
}
```

✅ **Course Created!**

---

## 🧪 TEST 5: Enroll Student in Course

Replace with your actual student ID and course ID:

```bash
curl -X POST "http://localhost:8080/api/enrollments?studentId=65a4b2c3d4e5f6g7h8i9j0k1&courseId=65a4b3c4d5e6f7g8h9i0j1k2" -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Expected Response:
```json
{
  "id": "65a4b4c5d6e7f8g9h0i1j2k3",
  "studentId": "65a4b2c3d4e5f6g7h8i9j0k1",
  "courseId": "65a4b3c4d5e6f7g8h9i0j1k2",
  "status": "ACTIVE"
}
```

✅ **Enrollment Created!**

---

## 📊 Summary of Test Values

Here's what you should have collected:

```
User ID (from Register):      65a4b1c2d3e4f5g6h7i8j9k0
Access Token (from Login):    eyJhbGciOiJIUzUxMiJ9.eyJzdWI...
Student ID (from Create):     65a4b2c3d4e5f6g7h8i9j0k1
Course ID (from Course):      65a4b3c4d5e6f7g8h9i0j1k2
Enrollment ID (from Enroll):  65a4b4c5d6e7f8g9h0i1j2k3
```

Now you can test other endpoints using these IDs!

---

## 🎯 Quick Test Commands Reference

### Copy & Paste Ready (Just replace placeholders)

**Get Current User:**
```bash
curl -X GET http://localhost:8080/api/auth/me -H "Authorization: Bearer YOUR_TOKEN"
```

**Get Student:**
```bash
curl -X GET http://localhost:8080/api/students/YOUR_STUDENT_ID -H "Authorization: Bearer YOUR_TOKEN"
```

**Get Courses by Level:**
```bash
curl -X GET http://localhost:8080/api/courses/level/Level%201 -H "Authorization: Bearer YOUR_TOKEN"
```

**Record Attendance:**
```bash
curl -X POST http://localhost:8080/api/attendance -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d "{\"enrollmentId\": \"YOUR_ENROLLMENT_ID\", \"studentId\": \"YOUR_STUDENT_ID\", \"courseId\": \"YOUR_COURSE_ID\", \"attendanceDate\": \"2024-01-15\", \"status\": \"PRESENT\"}"
```

**Create Payment:**
```bash
curl -X POST http://localhost:8080/api/payments -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d "{\"studentId\": \"YOUR_STUDENT_ID\", \"amount\": 5000.00, \"paymentType\": \"TUITION\", \"paymentDate\": \"2024-01-15\", \"paymentMethod\": \"BANK_TRANSFER\"}"
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Using Old Token
- Token expires after 24 hours
- **Solution:** Login again to get fresh token

### ❌ Mistake 2: Wrong URL Format
- Wrong: `http://localhost:8080/api/student` (singular)
- Right: `http://localhost:8080/api/students` (plural)

### ❌ Mistake 3: Missing Authorization Header
- Wrong: `curl -X GET http://localhost:8080/api/students/ID`
- Right: `curl -X GET http://localhost:8080/api/students/ID -H "Authorization: Bearer TOKEN"`

### ❌ Mistake 4: MongoDB Not Running
- Error: "MongoDB connection refused"
- Solution: Run `mongod` in Terminal 1

### ❌ Mistake 5: Backend Not Running
- Error: "Connection refused"
- Solution: Run `mvn spring-boot:run` in Terminal 2

---

## ✅ Success Indicators

### ✅ MongoDB Running
```
waiting for connections on port 27017
```

### ✅ Backend Running
```
Started SchoolMisApplication
Tomcat started on port(s): 8080
```

### ✅ API Working
```
Response Code: 201 Created (for POST requests)
Response Code: 200 OK (for GET requests)
JSON response in body
```

### ❌ Issues
```
Response Code: 401 Unauthorized → Missing token or bad token
Response Code: 404 Not Found → Wrong URL
Response Code: 500 Internal Server Error → Server issue
Connection refused → Server not running
```

---

## 🎓 Next Steps

1. ✅ All tests passed?
2. ✅ Verify all 5 test scenarios work
3. ✅ Check response codes are correct
4. ✅ Backend is ready for frontend integration!

---

## 📞 If Something Doesn't Work

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change port in application.properties |
| MongoDB connection error | Make sure MongoDB is running |
| Token invalid | Login again to get fresh token |
| Resource not found (404) | Check your URL and IDs |
| Bad JSON error | Validate JSON at jsonlint.com |

---

## 🚀 You're Ready!

Follow this guide and you'll have a fully tested backend running locally!

**Next:** Share your testing results with the team or integrate with Next.js frontend.

