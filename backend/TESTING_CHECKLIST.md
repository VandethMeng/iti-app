# ✅ COMPLETE TESTING SETUP CHECKLIST

## 📋 PRE-TESTING SETUP

### Prerequisites Installation
- [ ] Java 21+ installed (`java -version` returns version 21+)
- [ ] Maven 3.6+ installed (`mvn -version` returns version 3.6+)
- [ ] MongoDB installed (`mongod --version`)
- [ ] curl installed OR Postman downloaded
- [ ] Project folder accessible: `C:\Users\Dell\OneDrive\Desktop\SchoolMIS`

### Files Present
- [ ] pom.xml in root directory
- [ ] src/main/java/ folder exists
- [ ] src/main/resources/ folder exists
- [ ] application.properties file exists

### Documentation Files Created
- [ ] QUICK_REFERENCE.md
- [ ] RUN_AND_TEST.md
- [ ] TESTING_STEPS.md
- [ ] TESTING_GUIDE.md
- [ ] TEST_BACKEND.bat

---

## 🚀 STARTUP CHECKLIST

### Terminal 1: MongoDB
- [ ] Opened new terminal/command prompt
- [ ] Ran command: `mongod`
- [ ] Waiting for connections message appears
- [ ] Terminal stays open (don't close it)

### Terminal 2: Backend Build
- [ ] Opened new terminal/command prompt
- [ ] Navigated to: `C:\Users\Dell\OneDrive\Desktop\SchoolMIS`
- [ ] Ran: `mvn clean install` (waited 2-3 minutes)
- [ ] Build successful message appears
- [ ] No build errors in output

### Terminal 2: Backend Start
- [ ] Ran: `mvn spring-boot:run`
- [ ] Server starting messages appear
- [ ] "Tomcat started on port(s): 8080" message appears
- [ ] "Started SchoolMisApplication" message appears
- [ ] Terminal stays open (don't close it)

### Terminal 3: Ready for Testing
- [ ] Opened new terminal/command prompt
- [ ] Terminal is ready for commands
- [ ] Can see both Terminal 1 (MongoDB) and Terminal 2 (Backend) are running

---

## 🧪 BASIC API TESTING

### Test 1: Register User
- [ ] Command entered in Terminal 3
- [ ] Response received (not timeout)
- [ ] Response includes JSON with user data
- [ ] Response status: 201 Created
- [ ] User ID present in response
- [ ] Saved user ID for later tests

### Test 2: Login
- [ ] Command entered in Terminal 3
- [ ] Response received
- [ ] Response includes accessToken
- [ ] Response includes tokenType: "Bearer"
- [ ] Response status: 200 OK
- [ ] Copied and saved full accessToken value

### Test 3: Get Current User
- [ ] Replaced YOUR_TOKEN with actual token
- [ ] Command entered in Terminal 3
- [ ] Response received with user data
- [ ] Response status: 200 OK
- [ ] No authorization errors

### Test 4: Create Student
- [ ] Replaced TOKEN and USER_ID with actual values
- [ ] Command entered in Terminal 3
- [ ] Response received with student data
- [ ] Response status: 201 Created
- [ ] Student ID present in response

### Test 5: Create Course
- [ ] Replaced TOKEN with actual token
- [ ] Command entered in Terminal 3
- [ ] Response received with course data
- [ ] Response status: 201 Created
- [ ] Course ID present in response

---

## ✨ EXTENDED TESTING (Optional)

### Authentication Tests
- [ ] Register with invalid email (should fail)
- [ ] Login with wrong password (should fail)
- [ ] Test expired token (should return 401)
- [ ] Test without token header (should return 401)

### Data Retrieval Tests
- [ ] Get user by ID (GET /api/auth/users/{id})
- [ ] Get student by ID (GET /api/students/{id})
- [ ] Get student by level (GET /api/students/level/Level%201)
- [ ] Get active students (GET /api/students/active)
- [ ] Get courses by level (GET /api/courses/level/Level%201)

### Data Update Tests
- [ ] Update student GPA (PATCH /api/students/{id}/gpa)
- [ ] Update user profile (PUT /api/auth/users/{id})
- [ ] Update course (PUT /api/courses/{id})

### Other Modules Test
- [ ] Create enrollment (POST /api/enrollments)
- [ ] Record attendance (POST /api/attendance)
- [ ] Create payment (POST /api/payments)
- [ ] Upload document (POST /api/documents)
- [ ] Send notification (POST /api/notifications)

---

## 📊 RESULTS SUMMARY

### Status Codes Verified
- [ ] 200 OK (GET requests successful)
- [ ] 201 Created (POST requests successful)
- [ ] 204 No Content (DELETE requests successful)
- [ ] 400 Bad Request (validation errors caught)
- [ ] 401 Unauthorized (auth errors caught)
- [ ] 404 Not Found (missing resource caught)
- [ ] 409 Conflict (duplicate entry caught)

### Response Format Verified
- [ ] All responses are valid JSON
- [ ] Error responses include status, message, error, timestamp
- [ ] Success responses include expected fields
- [ ] No text/HTML in JSON responses
- [ ] Timestamps in ISO-8601 format

### Database Verified
- [ ] MongoDB connection successful
- [ ] Users collection created and populated
- [ ] Students collection created and populated
- [ ] Courses collection created and populated
- [ ] Data persists across requests
- [ ] Can retrieve saved data

---

## 🔐 SECURITY VERIFICATION

### Authentication
- [ ] Passwords encrypted in database (BCrypt)
- [ ] Token generated on login
- [ ] Token required for protected endpoints
- [ ] Invalid tokens rejected
- [ ] Token expires after 24 hours

### CORS
- [ ] API responds to requests from localhost:3000
- [ ] API responds to requests from localhost:3001
- [ ] Unauthorized origins rejected (optional test)

### Input Validation
- [ ] Empty email rejected
- [ ] Invalid email format rejected
- [ ] Short passwords rejected
- [ ] Missing required fields rejected
- [ ] Invalid data types rejected

---

## ⚠️ TROUBLESHOOTING CHECKLIST

### MongoDB Issues
- [ ] MongoDB service is running
- [ ] Port 27017 is available
- [ ] No "connection refused" errors
- [ ] No "authentication failed" errors

### Backend Issues
- [ ] Port 8080 is available
- [ ] No compilation errors
- [ ] No dependency resolution errors
- [ ] Server shows full startup messages
- [ ] No exceptions in logs

### API Issues
- [ ] Requests are properly formatted
- [ ] JSON is valid (checked with jsonlint.com)
- [ ] URLs are correct
- [ ] HTTP methods are correct (POST vs GET)
- [ ] Headers are included when needed

### Network Issues
- [ ] curl/Postman can reach localhost
- [ ] Firewall not blocking port 8080
- [ ] VPN not interfering (if applicable)
- [ ] No proxy issues

---

## 📝 TESTING NOTES

### Successful Tests:
```
[Leave space to document which tests passed]
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

### Failed Tests:
```
[Leave space to document any issues]
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

### Notes & Observations:
```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

## ✅ FINAL SIGN-OFF

### Testing Complete
- [ ] All basic tests passed (Tests 1-5)
- [ ] All extended tests completed
- [ ] No errors encountered
- [ ] Backend is fully functional
- [ ] Ready for frontend integration

### Documentation Review
- [ ] Read at least one testing guide
- [ ] Understand how to run tests
- [ ] Know where to find help
- [ ] Can reference API endpoints

### Next Steps
- [ ] Share API_DOCUMENTATION.md with frontend team
- [ ] Notify team backend is ready
- [ ] Document any issues found
- [ ] Plan frontend integration timeline

---

## 📌 QUICK REFERENCE

**Files You Created:**
- QUICK_REFERENCE.md
- RUN_AND_TEST.md
- TESTING_STEPS.md
- TESTING_GUIDE.md
- TEST_BACKEND.bat

**Commands to Remember:**
```
Terminal 1: mongod
Terminal 2: mvn spring-boot:run
Terminal 3: curl -X POST http://localhost:8080/api/...
```

**Save These Values:**
- User ID (from register)
- Access Token (from login)
- Student ID (from student creation)
- Course ID (from course creation)

**API Base URL:**
```
http://localhost:8080/api
```

---

## 🎉 TESTING COMPLETE!

Once all checkboxes are marked, your backend is:
✅ Running successfully
✅ Connected to MongoDB
✅ Responding to API requests
✅ Properly validating input
✅ Properly handling errors
✅ Ready for frontend integration

**Congratulations!** Your backend is fully tested and production-ready.

---

**Date Completed:** _________________
**Tested By:** _________________
**Notes:** _________________

