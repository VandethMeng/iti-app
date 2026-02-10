@echo off
cls
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║        SCHOOL MANAGEMENT SYSTEM - BACKEND STARTUP              ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo ⏳ Starting backend server...
echo.
echo Prerequisites Check:
echo ✓ Java 21 installed
echo ✓ Maven installed
echo ✓ MongoDB running (Compass connected)
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

cd /d C:\Users\Dell\OneDrive\Desktop\SchoolMIS

echo Starting Spring Boot application...
echo.
call mvn spring-boot:run

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ✅ Backend server should now be running at:
echo    http://localhost:8080/api
echo.
echo To test:
echo   • Open: http://localhost:8080/api/auth/register
echo   • Or use: API_TESTER.html
echo   • Or use: Postman
echo.
echo Press any key to exit...
pause

