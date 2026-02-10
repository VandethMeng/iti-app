@echo off
REM ============================================================================
REM School Management System - Backend Testing Script
REM This script helps you test the backend easily on Windows
REM ============================================================================

echo.
echo ============================================================================
echo   SCHOOL MANAGEMENT SYSTEM - BACKEND TESTING HELPER
echo ============================================================================
echo.

REM Check if running from correct directory
if not exist "pom.xml" (
    echo ERROR: pom.xml not found!
    echo Please run this script from: C:\Users\Dell\OneDrive\Desktop\SchoolMIS
    pause
    exit /b 1
)

:menu
cls
echo ============================================================================
echo                         TESTING MENU
echo ============================================================================
echo.
echo Choose an option:
echo.
echo 1. Check prerequisites (Java, Maven, MongoDB)
echo 2. Start backend (build + run)
echo 3. Test API endpoints (interactive)
echo 4. Quick test sequence (automated)
echo 5. View real-time logs
echo 6. Stop backend
echo 7. View documentation
echo 8. Exit
echo.

set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" goto check_prerequisites
if "%choice%"=="2" goto start_backend
if "%choice%"=="3" goto test_api
if "%choice%"=="4" goto quick_test
if "%choice%"=="5" goto view_logs
if "%choice%"=="6" goto stop_backend
if "%choice%"=="7" goto view_docs
if "%choice%"=="8" goto exit_script
goto menu

:check_prerequisites
cls
echo ============================================================================
echo                    CHECKING PREREQUISITES
echo ============================================================================
echo.

echo Checking Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java not found!
    echo Install from: https://www.oracle.com/java/technologies/downloads/
    pause
    goto menu
)
echo ✅ Java found!
echo.

echo Checking Maven...
mvn -version
if %errorlevel% neq 0 (
    echo ❌ Maven not found!
    echo Install from: https://maven.apache.org/download.cgi
    pause
    goto menu
)
echo ✅ Maven found!
echo.

echo Checking MongoDB...
mongod --version
if %errorlevel% neq 0 (
    echo ⚠️ MongoDB not found!
    echo Install from: https://www.mongodb.com/try/download/community
    echo.
    pause
) else (
    echo ✅ MongoDB found!
)
echo.

echo ✅ All prerequisites OK!
echo.
echo Next steps:
echo 1. Start MongoDB in a terminal: mongod
echo 2. Come back here and choose option 2 to start backend
echo.
pause
goto menu

:start_backend
cls
echo ============================================================================
echo                     STARTING BACKEND
echo ============================================================================
echo.
echo This will:
echo 1. Build the project (first time: 2-3 minutes)
echo 2. Start the server on http://localhost:8080/api
echo.
echo Make sure MongoDB is running!
echo (Open another terminal and run: mongod)
echo.
pause

echo Building project...
call mvn clean install
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    echo Check that Maven is installed correctly
    pause
    goto menu
)

echo.
echo ✅ Build successful!
echo.
echo Starting server...
call mvn spring-boot:run

echo.
echo Server stopped.
pause
goto menu

:test_api
cls
echo ============================================================================
echo                     API ENDPOINT TESTING
echo ============================================================================
echo.
echo This will guide you through testing the API
echo.
echo Prerequisites:
echo - Backend must be running (choose option 2)
echo - MongoDB must be running (in another terminal)
echo.
pause

:test_menu
cls
echo ============================================================================
echo                    API TESTING MENU
echo ============================================================================
echo.
echo 1. Register a new user
echo 2. Login and get token
echo 3. Get current user info
echo 4. Create student profile
echo 5. Create a course
echo 6. List all courses
echo 7. Back to main menu
echo.

set /p test_choice="Enter your choice (1-7): "

if "%test_choice%"=="1" goto test_register
if "%test_choice%"=="2" goto test_login
if "%test_choice%"=="3" goto test_get_user
if "%test_choice%"=="4" goto test_create_student
if "%test_choice%"=="5" goto test_create_course
if "%test_choice%"=="6" goto test_list_courses
if "%test_choice%"=="7" goto menu

goto test_menu

:test_register
cls
echo ============================================================================
echo                    TEST: REGISTER USER
echo ============================================================================
echo.
echo Testing: POST /api/auth/register
echo.

set /p email="Enter email (default: john@example.com): "
if "%email%"=="" set email=john@example.com

set /p firstname="Enter first name (default: John): "
if "%firstname%"=="" set firstname=John

set /p lastname="Enter last name (default: Doe): "
if "%lastname%"=="" set lastname=Doe

echo.
echo Sending request...
echo.

curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"%email%\", \"password\": \"Password123\", \"firstName\": \"%firstname%\", \"lastName\": \"%lastname%\", \"phoneNumber\": \"+1234567890\", \"address\": \"123 Main\", \"role\": \"STUDENT\"}"

echo.
echo.
echo ✅ Request completed!
echo.
pause
goto test_menu

:test_login
cls
echo ============================================================================
echo                    TEST: LOGIN USER
echo ============================================================================
echo.
echo Testing: POST /api/auth/login
echo.

set /p email="Enter email (default: john@example.com): "
if "%email%"=="" set email=john@example.com

echo.
echo Sending request...
echo.

curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"%email%\", \"password\": \"Password123\"}"

echo.
echo.
echo ⚠️ IMPORTANT: Save the accessToken value above!
echo You'll need it for other tests.
echo.
pause
goto test_menu

:test_get_user
cls
echo ============================================================================
echo                    TEST: GET CURRENT USER
echo ============================================================================
echo.
echo Testing: GET /api/auth/me
echo.

set /p token="Enter your access token: "
if "%token%"=="" (
    echo You need to login first to get a token!
    pause
    goto test_menu
)

echo.
echo Sending request...
echo.

curl -X GET http://localhost:8080/api/auth/me ^
  -H "Authorization: Bearer %token%"

echo.
echo.
pause
goto test_menu

:test_create_student
cls
echo ============================================================================
echo                    TEST: CREATE STUDENT
echo ============================================================================
echo.
echo Testing: POST /api/students
echo.

set /p token="Enter your access token: "
if "%token%"=="" (
    echo You need to login first to get a token!
    pause
    goto test_menu
)

set /p userid="Enter user ID: "
if "%userid%"=="" (
    echo User ID is required!
    pause
    goto test_menu
)

echo.
echo Sending request...
echo.

curl -X POST http://localhost:8080/api/students ^
  -H "Authorization: Bearer %token%" ^
  -H "Content-Type: application/json" ^
  -d "{\"userId\": \"%userid%\", \"studentId\": \"STU001\", \"dateOfBirth\": \"2000-01-15\", \"gender\": \"Male\", \"parentName\": \"Jane Doe\", \"parentPhone\": \"+0987654321\", \"parentEmail\": \"parent@example.com\"}"

echo.
echo.
pause
goto test_menu

:test_create_course
cls
echo ============================================================================
echo                    TEST: CREATE COURSE
echo ============================================================================
echo.
echo Testing: POST /api/courses
echo.

set /p token="Enter your access token: "
if "%token%"=="" (
    echo You need to login first to get a token!
    pause
    goto test_menu
)

echo.
echo Sending request...
echo.

curl -X POST http://localhost:8080/api/courses ^
  -H "Authorization: Bearer %token%" ^
  -H "Content-Type: application/json" ^
  -d "{\"courseCode\": \"MATH101\", \"courseName\": \"Calculus I\", \"description\": \"Introduction to Calculus\", \"level\": \"Level 1\", \"creditHours\": 3, \"department\": \"Mathematics\", \"maxCapacity\": 50, \"semester\": \"Fall 2024\"}"

echo.
echo.
pause
goto test_menu

:test_list_courses
cls
echo ============================================================================
echo                    TEST: LIST COURSES
echo ============================================================================
echo.
echo Testing: GET /api/courses/level/Level 1
echo.

set /p token="Enter your access token: "
if "%token%"=="" (
    echo You need to login first to get a token!
    pause
    goto test_menu
)

echo.
echo Sending request...
echo.

curl -X GET "http://localhost:8080/api/courses/level/Level%%201" ^
  -H "Authorization: Bearer %token%"

echo.
echo.
pause
goto test_menu

:quick_test
cls
echo ============================================================================
echo                    QUICK TEST SEQUENCE
echo ============================================================================
echo.
echo This will run a quick test of the main features:
echo 1. Register user
echo 2. Login
echo 3. Create student
echo 4. Create course
echo.
echo Make sure backend is running!
echo.
pause

echo.
echo STEP 1: Registering user...
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"test@example.com\", \"password\": \"Password123\", \"firstName\": \"Test\", \"lastName\": \"User\", \"phoneNumber\": \"+1234567890\", \"address\": \"123 Main\", \"role\": \"STUDENT\"}"

echo.
echo.
echo STEP 2: Logging in...
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"test@example.com\", \"password\": \"Password123\"}"

echo.
echo.
echo ✅ Quick test completed!
echo Check the responses above to verify everything is working.
echo.
pause
goto menu

:view_logs
cls
echo ============================================================================
echo                    VIEW LOGS
echo ============================================================================
echo.
echo To view logs in real-time:
echo.
echo If the server is already running:
echo - Check the terminal where you ran: mvn spring-boot:run
echo - You'll see all the logs there
echo.
echo To save logs to a file:
echo mvn spring-boot:run ^> backend.log
echo.
pause
goto menu

:stop_backend
cls
echo ============================================================================
echo                    STOP BACKEND
echo ============================================================================
echo.
echo To stop the backend:
echo.
echo If running in a terminal:
echo - Press Ctrl + C in the terminal where it's running
echo.
echo That's it!
echo.
pause
goto menu

:view_docs
cls
echo ============================================================================
echo                    DOCUMENTATION
echo ============================================================================
echo.
echo Available documentation files:
echo.
echo 1. TESTING_GUIDE.md ........... Complete testing guide
echo 2. TESTING_STEPS.md .......... Step-by-step instructions
echo 3. API_DOCUMENTATION.md ...... All endpoints documented
echo 4. QUICKSTART.md ............. 5-minute setup
echo 5. SETUP_GUIDE.md ............ Installation guide
echo.
echo These files are in: C:\Users\Dell\OneDrive\Desktop\SchoolMIS\
echo.
echo Open them with:
echo - Notepad
echo - VS Code
echo - Any text editor
echo.
pause
goto menu

:exit_script
echo.
echo Thank you for using School Management System!
echo.
echo Next steps:
echo 1. Start MongoDB: mongod
echo 2. Start Backend: mvn spring-boot:run
echo 3. Test endpoints with curl or Postman
echo.
echo Documentation available in project root.
echo.
pause
exit /b 0

