# ⚡ BACKEND SERVER STARTUP GUIDE

## 🚀 QUICK START

### Option 1: Batch File (Easiest)
**Double-click:** `RUN_BACKEND.bat`

The script will:
- ✅ Navigate to project directory
- ✅ Run Maven
- ✅ Start Spring Boot
- ✅ Show backend URL

---

## 🎯 Manual Startup (If Batch File Doesn't Work)

### Step 1: Open Command Prompt/PowerShell
```
Windows Key → Type "cmd" or "powershell" → Press Enter
```

### Step 2: Navigate to Project
```bash
cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS
```

### Step 3: Start Backend
```bash
mvn spring-boot:run
```

---

## ⏳ What to Expect

### During Startup (30-60 seconds):
```
[INFO] Scanning for projects...
[INFO] Building SchoolMIS 0.0.1-SNAPSHOT
[INFO] 
[INFO] --- maven-resources-plugin:3.3.1:resources ---
[INFO] --- maven-compiler-plugin:3.11.0:compile ---
[INFO] Compiling 58 source files...
[INFO] --- maven-jar-plugin:3.3.0:jar ---
[INFO] Building jar: SchoolMIS-0.0.1-SNAPSHOT.jar
[INFO] --- spring-boot-maven-plugin:3.2.2:repackage ---
[INFO] Replacing main artifact with repackaged archive
```

### When Ready:
```
Tomcat started on port(s): 8080 (http)
Started SchoolMisApplication in XX.XXX seconds
```

✅ **When you see this, backend is RUNNING!**

---

## ✅ Verify Backend is Running

### Test 1: Open in Browser
```
http://localhost:8080/api
```
Should show: Welcome message

### Test 2: Use API_TESTER.html
Double-click: `API_TESTER.html`
- Click "Register" button
- Should work without errors

### Test 3: Use Postman
```
POST http://localhost:8080/api/auth/register
```
Should get response (201 or error from validation, but not connection error)

### Test 4: PowerShell Test Script
```powershell
.\TEST_BACKEND.ps1
```
Shows detailed status

---

## ⚠️ Troubleshooting

### Problem: "Command not found" or "mvn is not recognized"

**Cause:** Maven not in PATH

**Solution:**
1. **Check Maven Installation:**
   ```bash
   mvn -version
   ```
   Should show Maven version

2. **If not found, install Maven:**
   - Download from: https://maven.apache.org/download.cgi
   - Extract to: `C:\Program Files\apache-maven`
   - Add to PATH (ask for help if unsure)

3. **Or use Maven Wrapper:**
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

---

### Problem: "Port 8080 already in use"

**Cause:** Another application using port 8080

**Solution 1: Kill Process Using Port**
```bash
# Find what's using port 8080
netstat -ano | findstr ":8080"

# Kill the process (get PID from above)
taskkill /PID {PID} /F
```

**Solution 2: Use Different Port**
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```
Then access at: `http://localhost:8081/api`

---

### Problem: "MongoDB connection refused"

**Cause:** MongoDB Compass not running

**Solution:**
1. **Open MongoDB Compass**
2. **Ensure Connected:** Green status indicator
3. **Connection String:** `mongodb://localhost:27017`

---

### Problem: Backend Starts but API Returns 404

**Cause:** API not fully initialized or wrong URL

**Solution:**
1. **Wait a bit longer** (30+ seconds)
2. **Check exact URL:** `http://localhost:8080/api`
3. **Restart backend:** Press `Ctrl+C` then run again

---

### Problem: "java: command not found"

**Cause:** Java not installed or not in PATH

**Solution:**
1. **Check Java:**
   ```bash
   java -version
   ```
   Should show: Java 21

2. **If not found:**
   - Download Java 21 from: https://www.oracle.com/java/technologies/downloads/
   - Install it
   - Add to PATH

---

## 📊 Background Process (Advanced)

If you want to run backend in background:

### PowerShell (Run in Background)
```powershell
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c", "cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS && mvn spring-boot:run"
```

### Keep Running (Don't Close Terminal)
- Don't close the terminal/command window
- Backend keeps running as long as terminal is open
- When you close it, backend stops

---

## 🔄 Stopping Backend

### To Stop:
Press: **`Ctrl + C`** in the terminal

**Expected:**
```
^C[INFO] BUILD FAILURE
Interrupted by user
```

The backend will stop after a few seconds.

---

## ✅ Complete Checklist

Before starting backend:
- [ ] Java 21 installed: `java -version`
- [ ] Maven installed: `mvn -version`
- [ ] MongoDB Compass connected
- [ ] Port 8080 not in use: `netstat -ano | findstr ":8080"`

Starting backend:
- [ ] Navigate to: `C:\Users\Dell\OneDrive\Desktop\SchoolMIS`
- [ ] Run: `mvn spring-boot:run` or double-click `RUN_BACKEND.bat`
- [ ] Wait for: `Tomcat started on port(s): 8080`

After startup:
- [ ] Test: http://localhost:8080/api
- [ ] Register: POST http://localhost:8080/api/auth/register
- [ ] Use API_TESTER.html to verify

---

## 📁 Key Files

- **RUN_BACKEND.bat** - One-click startup
- **TEST_BACKEND.ps1** - Verify it's running
- **API_TESTER.html** - Test endpoints
- **pom.xml** - Maven configuration

---

## 🎯 Expected Output Example

```
C:\Users\Dell\OneDrive\Desktop\SchoolMIS> mvn spring-boot:run
[INFO] Scanning for projects...
[INFO] Building SchoolMIS 0.0.1-SNAPSHOT
[INFO] 
[INFO] --- maven-resources-plugin:3.3.1:resources (default-resources) @ SchoolMIS ---
[INFO] Copying 1 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.11.0:compile (default-compile) @ SchoolMIS ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 58 source files to C:\Users\Dell\OneDrive\Desktop\SchoolMIS\target\classes
[INFO] 
[INFO] --- maven-jar-plugin:3.3.0:jar (default-jar) @ SchoolMIS ---
[INFO] Building jar: C:\Users\Dell\OneDrive\Desktop\SchoolMIS\target\SchoolMIS-0.0.1-SNAPSHOT.jar
[INFO] 
[INFO] --- spring-boot-maven-plugin:3.2.2:repackage (repackage) @ SchoolMIS ---
[INFO] Replacing main artifact with repackaged archive
[INFO] 

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.2)

2026-02-08T14:00:00.000-06:00  INFO 12345 --- [           main] edu.iti.schoolmis.SchoolMisApplication  : Starting SchoolMisApplication v0.0.1-SNAPSHOT using Java 21.0.1
2026-02-08T14:00:00.100-06:00  INFO 12345 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2026-02-08T14:00:01.000-06:00  INFO 12345 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2026-02-08T14:00:02.000-06:00  INFO 12345 --- [           main] edu.iti.schoolmis.SchoolMisApplication  : Started SchoolMisApplication in 2.345 seconds (process running for 2.890)
```

✅ **Backend is now running!**

---

## 🚀 Next Steps

1. ✅ Backend running at: http://localhost:8080/api
2. ✅ Open: API_TESTER.html
3. ✅ Test endpoints (Register, Login, Get User)
4. ✅ Share with frontend developers

---

## 📞 If Still Having Issues

1. **Run diagnostic script:**
   ```powershell
   .\TEST_BACKEND.ps1
   ```

2. **Check logs:**
   Look for error messages in terminal output

3. **Verify prerequisites:**
   - Java 21: `java -version`
   - Maven: `mvn -version`
   - MongoDB: Open Compass, check connected

4. **Try different approach:**
   ```bash
   mvn clean install -DskipTests
   mvn spring-boot:run
   ```

---

**Status: ✅ Backend Ready to Start**

Use `RUN_BACKEND.bat` or follow manual steps above!

