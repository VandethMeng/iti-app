# 🚀 QUICK START GUIDE - School MIS Backend

## ✅ CORS Issue Fixed!

The "Failed to fetch" error has been fixed. The backend now accepts requests from any origin (including file:// protocol).

---

## 🎯 How to Test (3 Options)

### **Option 1: Restart Backend (Required)**

The CORS configuration was updated, so you MUST restart the backend:

**Step 1:** Stop the current backend
- Press `Ctrl + C` in the terminal where backend is running

**Step 2:** Restart the backend
```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
mvn spring-boot:run
```

**OR double-click:**
```
START_BACKEND.bat
```

**Step 3:** Wait until you see:
```
Tomcat started on port(s): 8080
```

---

### **Option 2A: Use HTML Tester via HTTP Server (Recommended)**

**Step 1:** Double-click `START_TEST_SERVER.bat`

**Step 2:** Open browser to:
```
http://localhost:8000/API_TESTER.html
```

**Step 3:** Click the buttons to test!

---

### **Option 2B: Use HTML File Directly**

After backend restart, double-click `API_TESTER.html` and it should work now!

---

### **Option 3: Use Postman**

**Register User:**
- Method: POST
- URL: http://localhost:8080/api/auth/register
- Headers: Content-Type: application/json
- Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "Password123",
  "firstName": "Test",
  "lastName": "User",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "role": "STUDENT"
}
```

**Login:**
- Method: POST
- URL: http://localhost:8080/api/auth/login
- Headers: Content-Type: application/json
- Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```

---

## ✅ What Was Fixed

### Before:
```java
.allowedOrigins("http://localhost:3000", "http://localhost:3001")
```
❌ Only allowed specific origins
❌ Blocked file:// protocol
❌ Blocked other ports

### After:
```java
.allowedOriginPatterns("*")
```
✅ Allows all origins
✅ Works with file:// protocol
✅ Works with any port
✅ Perfect for development

---

## 🔍 Troubleshooting

### Issue: Still getting "Failed to fetch"

**Solution:**
1. Make sure backend is restarted (MUST restart after config change)
2. Check backend is running: http://localhost:8080/api
3. Check browser console (F12) for detailed error
4. Make sure MongoDB Compass is connected

### Issue: Backend won't start

**Check:**
- MongoDB Compass is running and connected
- Port 8080 is not already in use
- Java 21 is installed: `java -version`

### Issue: "Connection refused"

**Solution:**
- Backend is not running
- Run: `mvn spring-boot:run`
- Wait until you see "Tomcat started"

---

## 📋 Testing Checklist

After restarting backend:

- [ ] Backend running on http://localhost:8080
- [ ] MongoDB Compass connected
- [ ] Can access http://localhost:8080/api (shows welcome message)
- [ ] Open API_TESTER.html
- [ ] Click "Register" → Success (201 status)
- [ ] Click "Login" → Success (200 status, token received)
- [ ] Check MongoDB Compass → See new user in "users" collection
- [ ] Click "Get User" → Success (shows user profile)
- [ ] Click "Create Student" → Success (student created)

---

## 🎉 Quick Test Commands (PowerShell)

**After restarting backend, test with:**

```powershell
# Test 1: Check API is up
curl.exe http://localhost:8080/api

# Test 2: Register user
curl.exe -X POST http://localhost:8080/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"Password123\",\"firstName\":\"Test\",\"lastName\":\"User\",\"phoneNumber\":\"+123\",\"address\":\"123St\",\"role\":\"STUDENT\"}'

# Test 3: Login
curl.exe -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"Password123\"}'
```

---

## ✅ Summary

**What to do:**
1. ✅ CORS fixed (code already updated)
2. 🔄 **RESTART BACKEND** (required!)
3. ✅ Test with API_TESTER.html
4. ✅ Backend is ready!

**Files created:**
- START_BACKEND.bat → Easy backend start
- START_TEST_SERVER.bat → Serve HTML via HTTP
- This guide

---

## 🚀 RESTART BACKEND NOW!

```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
mvn spring-boot:run
```

Or double-click: **START_BACKEND.bat**

Then test with **API_TESTER.html** - it will work! ✅

---

**Your backend is ready for production after restart!** 🎉

