# 📌 QUICK REFERENCE - RUN & TEST BACKEND

## 🎯 THE 3-STEP PROCESS

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1              STEP 2              STEP 3                 │
│  MongoDB  →    Backend Server    →    Test Endpoints           │
│  mongod            mvn spring...         curl/Postman           │
│                   boot:run                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ QUICK COMMANDS

### Terminal 1: Start MongoDB
```
mongod
```
✅ Wait for: "waiting for connections on port 27017"

### Terminal 2: Start Backend
```
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
mvn clean install  (first time only)
mvn spring-boot:run
```
✅ Wait for: "Tomcat started on port(s): 8080"

### Terminal 3: Test API
```
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass123",...}'
```
✅ Look for: JSON response with status 201

---

## 📋 QUICK TEST SEQUENCE

| # | Test | Command | Expected |
|---|------|---------|----------|
| 1 | Register | POST /api/auth/register | 201 Created |
| 2 | Login | POST /api/auth/login | 200 OK + token |
| 3 | Get User | GET /api/auth/me | 200 OK |
| 4 | Create Student | POST /api/students | 201 Created |
| 5 | Create Course | POST /api/courses | 201 Created |

---

## 🔑 IMPORTANT VALUES TO SAVE

When you register and login, save these:

```
User ID:        65a4b1c2d3e4f5g6h7i8j9k0
Access Token:   eyJhbGciOiJIUzUxMiJ9.eyJzdWI...
Student ID:     STU001
Course ID:      MATH101
Enrollment ID:  (created when enrolled)
```

Use these for all subsequent tests!

---

## 🧪 COPY-PASTE TEST COMMANDS

### 1️⃣ Register (Copy & Run)
```bash
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"john@example.com\",\"password\":\"Password123\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"phoneNumber\":\"+1234567890\",\"address\":\"123 Main\",\"role\":\"STUDENT\"}"
```

### 2️⃣ Login (Copy & Run)
```bash
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"john@example.com\",\"password\":\"Password123\"}"
```
**SAVE the accessToken!**

### 3️⃣ Get Current User (Replace TOKEN)
```bash
curl -X GET http://localhost:8080/api/auth/me -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4️⃣ Create Student (Replace TOKEN and USER_ID)
```bash
curl -X POST http://localhost:8080/api/students -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d "{\"userId\":\"YOUR_USER_ID\",\"studentId\":\"STU001\",\"dateOfBirth\":\"2000-01-15\",\"gender\":\"Male\",\"parentName\":\"Jane Doe\",\"parentPhone\":\"+0987654321\",\"parentEmail\":\"parent@example.com\"}"
```

### 5️⃣ Create Course (Replace TOKEN)
```bash
curl -X POST http://localhost:8080/api/courses -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d "{\"courseCode\":\"MATH101\",\"courseName\":\"Calculus I\",\"description\":\"Introduction\",\"level\":\"Level 1\",\"creditHours\":3,\"department\":\"Mathematics\",\"maxCapacity\":50,\"semester\":\"Fall 2024\"}"
```

---

## ✅ SUCCESS INDICATORS

| Indicator | Status |
|-----------|--------|
| MongoDB terminal shows "waiting for connections" | ✅ MongoDB OK |
| Backend terminal shows "Tomcat started on port 8080" | ✅ Server OK |
| curl returns JSON response | ✅ API OK |
| Response code is 200 or 201 | ✅ Success |
| Has accessToken in login response | ✅ Auth OK |

---

## ❌ COMMON ISSUES & FIXES

| Issue | Fix |
|-------|-----|
| Port 8080 in use | Edit application.properties: server.port=8081 |
| MongoDB connection error | Run mongod in Terminal 1 |
| 401 Unauthorized | Include: -H "Authorization: Bearer TOKEN" |
| curl not found | Install cURL or use Postman instead |
| Connection refused | Make sure mvn spring-boot:run is running |

---

## 📂 ALTERNATIVE: Windows Batch Script

Instead of manual commands, just run:
```
TEST_BACKEND.bat
```

This provides an interactive menu!

---

## 📖 FULL GUIDES AVAILABLE

| Guide | Use For |
|-------|---------|
| TESTING_GUIDE.md | Complete testing documentation |
| TESTING_STEPS.md | Visual step-by-step guide |
| RUN_AND_TEST.md | Comprehensive run & test guide |
| API_DOCUMENTATION.md | All endpoints (92+) |

---

## 🎯 CHECKLIST BEFORE YOU START

- [ ] Java installed (java -version)
- [ ] Maven installed (mvn -version)
- [ ] MongoDB installed (mongod --version)
- [ ] Project folder: C:\Users\Dell\OneDrive\Desktop\SchoolMIS
- [ ] 3 terminals open
- [ ] MongoDB running in Terminal 1

---

## 🚀 GET STARTED NOW!

1. Open Terminal 1: `mongod`
2. Open Terminal 2: `cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS && mvn spring-boot:run`
3. Open Terminal 3: Copy & paste test commands above
4. Check responses for ✅ status 200/201
5. Done! Backend is tested ✅

---

## 📞 NEED HELP?

Check these files in order:
1. This file (RUN_AND_TEST.md)
2. TESTING_STEPS.md (visual guide)
3. TESTING_GUIDE.md (comprehensive)
4. API_DOCUMENTATION.md (endpoint reference)

---

**Ready? Start with Terminal 1: `mongod`** 🚀

