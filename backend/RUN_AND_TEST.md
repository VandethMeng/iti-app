# 🚀 HOW TO RUN & TEST - COMPLETE GUIDE

## ⚡ SUPER QUICK START (3 Commands)

### In 3 Terminal Windows:

**Terminal 1:**
```bash
mongod
```

**Terminal 2:**
```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
mvn spring-boot:run
```

**Terminal 3:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass123","firstName":"Test","lastName":"User","phoneNumber":"+123","address":"123St","role":"STUDENT"}'
```

✅ **Backend is running and responding!**

---

## 📖 DETAILED GUIDE

### Phase 1: Preparation (5 minutes)

#### Prerequisites Check:
```bash
# Check Java is installed (need 21+)
java -version

# Check Maven is installed (need 3.6+)
mvn -version

# Check/Install MongoDB
# Download: https://www.mongodb.com/try/download/community
```

---

### Phase 2: Starting the Backend (10 minutes)

#### Step 1: Open First Terminal - MongoDB
```bash
mongod
# Wait for: "waiting for connections on port 27017"
# Keep this running!
```

#### Step 2: Open Second Terminal - Backend
```bash
# Navigate to project
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS

# First time: Install dependencies (2-3 minutes)
mvn clean install

# Run the backend
mvn spring-boot:run

# Wait for: "Tomcat started on port(s): 8080"
# Keep this running!
```

#### Step 3: Verify Server is Running
Open browser and visit: `http://localhost:8080/api`
- You might get an error (that's OK)
- As long as page loads, server is running ✅

---

### Phase 3: Testing the API (Terminal 3)

#### Open Third Terminal - Testing

**Test 1: Register User**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main Street",
    "role": "STUDENT"
  }'
```

Expected: JSON response with user ID
- ✅ If you see JSON: Registration works!
- ❌ If error: Check server is running

**Save the `id` value** - you'll need it!

---

**Test 2: Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

Expected: JSON with `accessToken` field
- ✅ If you see token: Login works!
- Save the entire `accessToken` value!

---

**Test 3: Create Student (Using token from Test 2)**

Replace `YOUR_USER_ID` with ID from Test 1
Replace `YOUR_TOKEN` with token from Test 2

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "YOUR_USER_ID",
    "studentId": "STU001",
    "dateOfBirth": "2000-01-15",
    "gender": "Male",
    "parentName": "Jane Doe",
    "parentPhone": "+0987654321",
    "parentEmail": "parent@example.com"
  }'
```

Expected: JSON with student info
- ✅ If you see JSON: Student creation works!

---

## 🎯 WINDOWS BATCH FILE (Easy Way!)

You can also use the batch script included:

```bash
# Just double-click this file in Windows Explorer:
TEST_BACKEND.bat

# Or run from terminal:
TEST_BACKEND.bat
```

This provides an interactive menu to help you test!

---

## 🖥️ USING POSTMAN (Alternative to cURL)

### Download & Setup:
1. Download Postman: https://www.postman.com/downloads/
2. Open Postman
3. Create a new collection "School Management System"

### Create Request 1: Register
- **Method:** POST
- **URL:** http://localhost:8080/api/auth/register
- **Body (JSON):**
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
- Click **Send**

### Create Request 2: Login
- **Method:** POST
- **URL:** http://localhost:8080/api/auth/login
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```
- Click **Send**
- Copy the `accessToken` from response

### Create Request 3: Get Current User
- **Method:** GET
- **URL:** http://localhost:8080/api/auth/me
- **Headers:** Add new header
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN_HERE`
- Click **Send**

---

## ✅ TESTING CHECKLIST

### Startup Checklist:
- [ ] MongoDB running (`mongod`)
- [ ] Backend started (`mvn spring-boot:run`)
- [ ] No error messages in backend terminal
- [ ] Server shows "Tomcat started on port 8080"

### Functionality Checklist:
- [ ] Test 1: Register user (status 201)
- [ ] Test 2: Login (status 200, got token)
- [ ] Test 3: Create student (status 201)
- [ ] Test 4: Create course (status 201)
- [ ] Test 5: Get user (status 200)

---

## 🔍 TROUBLESHOOTING

### "Connection Refused" Error
```
Problem: curl: (7) Failed to connect to localhost port 8080
Solution: Make sure you ran: mvn spring-boot:run
          And server shows: "Tomcat started on port 8080"
```

### "401 Unauthorized" Error
```
Problem: Response: {"status":401,"message":"Invalid Credentials"}
Solution: Make sure you're using correct email and password
          Or the token expired (login again)
```

### "MongoDB connection refused"
```
Problem: Server won't start, says MongoDB connection refused
Solution: Open another terminal and run: mongod
          Server needs MongoDB running
```

### "Port 8080 already in use"
```
Problem: Tomcat failed to start, port 8080 in use
Solution: Edit: src/main/resources/application.properties
          Change: server.port=8081
          Then run again
```

### Bad JSON Error
```
Problem: Invalid JSON in request body
Solution: Use https://jsonlint.com/ to validate JSON
          Check all quotes and commas are correct
```

---

## 📋 TESTING ENDPOINTS SUMMARY

```
POST /api/auth/register      → Register user
POST /api/auth/login         → Login, get token
GET  /api/auth/me            → Get current user

POST /api/students           → Create student
GET  /api/students/{id}      → Get student
GET  /api/students/active    → Get all active students

POST /api/courses            → Create course
GET  /api/courses/{id}       → Get course
GET  /api/courses/level/{L}  → Get courses by level

POST /api/enrollments        → Enroll student
GET  /api/enrollments/{id}   → Get enrollment

POST /api/attendance         → Record attendance
GET  /api/attendance/{id}    → Get attendance

POST /api/payments           → Record payment
GET  /api/payments/{id}      → Get payment

POST /api/documents          → Upload document
GET  /api/documents/{id}     → Get document

POST /api/notifications      → Send notification
GET  /api/notifications/{id} → Get notification
```

---

## 🎓 Common Test Scenarios

### Scenario 1: Complete Flow
```
1. Register user
2. Login (get token)
3. Create student
4. Create course
5. Enroll student in course
6. Record attendance
7. Record payment
```

### Scenario 2: Query Data
```
1. Login (get token)
2. Get current user
3. List active students
4. List courses by level
5. Get student enrollments
```

### Scenario 3: Update Data
```
1. Login (get token)
2. Create student
3. Update student GPA
4. Update payment status
```

---

## 📊 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 201 | Created | Register, Create student |
| 200 | OK | Login, Get user |
| 204 | No Content | Delete successful |
| 400 | Bad Request | Invalid JSON |
| 401 | Unauthorized | Bad token/credentials |
| 404 | Not Found | Wrong ID |
| 409 | Conflict | Duplicate email |
| 500 | Server Error | Server crashed |

---

## 📂 Files Provided

| File | Purpose |
|------|---------|
| TESTING_GUIDE.md | Comprehensive testing guide |
| TESTING_STEPS.md | Step-by-step visual guide |
| TEST_BACKEND.bat | Windows batch script |
| API_DOCUMENTATION.md | All endpoints documented |
| QUICKSTART.md | 5-minute setup |

---

## 🚀 SUCCESS! Now What?

Once all tests pass:
1. ✅ Backend is fully functional
2. ✅ All endpoints are working
3. ✅ Ready for frontend integration
4. ✅ Share API_DOCUMENTATION.md with Next.js team
5. ✅ Begin frontend development

---

## 💡 Pro Tips

1. **Use Postman for complex testing** - Easier than cURL
2. **Save your token** - Avoids logging in repeatedly
3. **Test one endpoint at a time** - Don't test everything at once
4. **Check response status codes** - 200/201 = success
5. **Read error messages** - They tell you what's wrong
6. **Use real IDs** - Replace placeholders with actual IDs from responses
7. **Keep terminals visible** - Watch both server and test output

---

## 🎉 You're Ready!

Backend is built ✅
Documentation is complete ✅
Testing tools are provided ✅

**Start with:** 
1. `mongod` in Terminal 1
2. `mvn spring-boot:run` in Terminal 2
3. Run test commands in Terminal 3

**Questions?** Check the documentation files provided!

---

**Happy Testing! 🚀**

