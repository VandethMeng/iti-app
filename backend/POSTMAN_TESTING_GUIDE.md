# How to Test /api/auth/me in Postman

## 📋 Step-by-Step Guide

### Step 1: Get a Token First

Before testing `/api/auth/me`, you need a JWT token. Here's how:

#### 1.1 Create Login Request in Postman

1. **Open Postman**
2. **Create New Request**
   - Click: "+" or "New"
   - Select: "HTTP Request"

3. **Set Request Details**
   - **Method:** POST
   - **URL:** `http://localhost:8080/api/auth/login`

4. **Set Headers**
   - Click: "Headers" tab
   - Add header:
     - **Key:** `Content-Type`
     - **Value:** `application/json`

5. **Add Body**
   - Click: "Body" tab
   - Select: "raw"
   - Select: "JSON" from dropdown
   - Paste this JSON:
   ```json
   {
     "email": "test@example.com",
     "password": "Password123"
   }
   ```

**Note:** If this user doesn't exist, first register one:
- **POST** `http://localhost:8080/api/auth/register`
- Same headers
- Body:
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

#### 1.2 Send Login Request

1. Click: **Send**
2. You'll get response with `accessToken`
3. **Copy the token** from the response

Example Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzcwNTgyNjg0LCJleHAiOjE3NzA2NjkwODR9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {...}
}
```

---

### Step 2: Test /api/auth/me Endpoint

#### 2.1 Create New Request in Postman

1. Click: "+" to create new request
2. **Method:** GET (not POST!)
3. **URL:** `http://localhost:8080/api/auth/me`

#### 2.2 Add Authorization Header

**Method 1: Manual Header (Best)**
1. Click: "Headers" tab
2. Add new header:
   - **Key:** `Authorization`
   - **Value:** `Bearer {YOUR_TOKEN_HERE}`
   
   Replace `{YOUR_TOKEN_HERE}` with the actual token from Step 1

Example:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzcwNTgyNjg0LCJleHAiOjE3NzA2NjkwODR9...
```

**Method 2: Using Postman's Authorization Tab (Easier)**
1. Click: "Authorization" tab
2. Select: "Bearer Token" from dropdown
3. In "Token" field, paste your token
4. Postman will automatically add the header!

#### 2.3 Send Request

1. Click: **Send**

#### 2.4 Expected Response

**Status Code:** 200 OK

**Response Body:**
```json
{
  "id": "65a1b2c3d4e5f6...",
  "email": "test@example.com",
  "firstName": "Test",
  "lastName": "User",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "enabled": true,
  "createdAt": "2026-02-08T14:00:00",
  "updatedAt": "2026-02-08T14:00:00",
  "roles": ["STUDENT"]
}
```

---

## 🎯 Complete Workflow in Postman

### Quick Summary:

1. **POST /api/auth/login**
   ```
   Headers:
   Content-Type: application/json
   
   Body:
   { "email": "test@example.com", "password": "Password123" }
   ```
   → Get `accessToken`

2. **GET /api/auth/me**
   ```
   Headers:
   Content-Type: application/json
   Authorization: Bearer {accessToken}
   ```
   → Get user profile

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Invalid token" or 401 Unauthorized

**Cause:** 
- Token is missing
- Token is invalid
- Token has expired (24 hours)

**Solution:**
1. Make sure header is: `Authorization: Bearer {token}`
2. Get a fresh token from login endpoint
3. Copy the ENTIRE token (it's long!)

### Issue 2: "User not found" or 404

**Cause:**
- Token is valid but malformed
- Backend parsing issue

**Solution:**
1. Re-login and get fresh token
2. Make sure Authorization header is correctly formatted
3. Check backend is running

### Issue 3: "No 'Access-Control-Allow-Origin' header"

**Cause:** CORS issue

**Solution:**
1. Backend CORS is already configured
2. This means your Postman isn't sending requests correctly
3. Make sure URL is exactly: `http://localhost:8080/api/auth/me`

### Issue 4: "Cannot GET /api/auth/me"

**Cause:** Using wrong HTTP method (POST instead of GET)

**Solution:**
- Change method to **GET** (not POST)

---

## 🛠️ Postman Collections

### Option: Import as Collection

You can create a Postman Collection for all endpoints:

**Collection JSON:**
```json
{
  "info": {
    "name": "School MIS API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:8080/api/auth/register",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"test@example.com\",\"password\":\"Password123\",\"firstName\":\"Test\",\"lastName\":\"User\",\"phoneNumber\":\"+1234567890\",\"address\":\"123 Main St\",\"role\":\"STUDENT\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:8080/api/auth/login",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"test@example.com\",\"password\":\"Password123\"}"
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/auth/me",
        "header": [
          {"key": "Content-Type", "value": "application/json"},
          {"key": "Authorization", "value": "Bearer {{token}}"}
        ]
      }
    }
  ]
}
```

---

## 📱 Using Postman Variables

### Set up Token Variable (Advanced)

1. **In Login Request:**
   - Go to "Tests" tab
   - Add script:
   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("token", jsonData.accessToken);
   ```

2. **In Get User Request:**
   - Authorization header: `Bearer {{token}}`
   - Postman will auto-replace with saved token!

---

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:8080`
- [ ] First registered user: `test@example.com` / `Password123`
- [ ] Got JWT token from login endpoint
- [ ] Authorization header format: `Bearer {token}`
- [ ] Request method is GET (not POST)
- [ ] URL is exactly: `http://localhost:8080/api/auth/me`
- [ ] Got 200 OK response with user data

---

## 🎯 Complete Example

### Request:
```
GET http://localhost:8080/api/auth/me

Headers:
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzcwNTgyNjg0LCJleXAiOjE3NzA2NjkwODR9.na3ZnOpD63wpv_Llq8KygUeaNABNec3jUiCt_seF9f-ZMXWY2pbn_bKKilSPzvJHxx52nhmBvFAdh6bRZxfz2w
```

### Response:
```
Status: 200 OK

{
  "id": "65a1b2c3d4e5f6789abc",
  "email": "test@example.com",
  "firstName": "Test",
  "lastName": "User",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "enabled": true,
  "createdAt": "2026-02-08T14:21:23",
  "roles": ["STUDENT"]
}
```

---

## 📞 Need More Help?

- See **FRONTEND_API_SUMMARY.md** for all endpoints
- See **API_DOCUMENTATION.md** for detailed specs
- Use **API_TESTER.html** for interactive testing
- Run **TEST_BACKEND.ps1** to verify backend

---

**Status:** ✅ Ready to Test!

Backend URL: `http://localhost:8080/api`

