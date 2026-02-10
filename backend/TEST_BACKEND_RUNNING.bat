@echo off
echo.
echo ═══════════════════════════════════════════════════════════════
echo          BACKEND ACCESSIBILITY TEST
echo ═══════════════════════════════════════════════════════════════
echo.
echo Checking if backend is running on http://localhost:8080...
echo.

REM Test 1: Check if server is running
echo [TEST 1] Checking if port 8080 is open...
netstat -ano | findstr ":8080" >nul
if %errorlevel% equ 0 (
    echo ✅ Port 8080 is OPEN - Backend is running!
) else (
    echo ❌ Port 8080 is CLOSED - Backend is NOT running
    echo.
    echo To start backend, run:
    echo   mvn spring-boot:run
    exit /b 1
)

echo.
echo [TEST 2] Testing API endpoint...
echo Testing: http://localhost:8080/api
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api' -TimeoutSec 5 -ErrorAction Stop; Write-Host '✅ Backend responding!' } catch { Write-Host '❌ Backend not responding: ' $_  }"

echo.
echo [TEST 3] Testing with curl...
echo Testing: http://localhost:8080/api/auth/register (POST)
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123\",\"firstName\":\"Test\",\"lastName\":\"User\",\"phoneNumber\":\"+123\",\"address\":\"123 St\",\"role\":\"STUDENT\"}" 2>nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo.
pause

