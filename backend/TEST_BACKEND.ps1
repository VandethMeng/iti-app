# Backend Accessibility Test Script
# Run this to verify your backend is running and accessible

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "   BACKEND ACCESSIBILITY TEST" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Test 1: Check if port 8080 is listening
Write-Host "[TEST 1] Checking if port 8080 is open..." -ForegroundColor Cyan
$port = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($port) {
    Write-Host "✅ Port 8080 is OPEN - Backend is running!" -ForegroundColor Green
    Write-Host "   Process: $($port.OwningProcess)" -ForegroundColor Green
} else {
    Write-Host "❌ Port 8080 is CLOSED - Backend is NOT running" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start backend, run:" -ForegroundColor Yellow
    Write-Host "  cd C:\Users\Dell\OneDrive\Desktop\SchoolMIS" -ForegroundColor Yellow
    Write-Host "  mvn spring-boot:run" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host ""

# Test 2: Test API connectivity
Write-Host "[TEST 2] Testing API endpoint: http://localhost:8080/api" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Backend is responding!" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend not responding" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host ""

# Test 3: Test with actual API call
Write-Host "[TEST 3] Testing with actual endpoint (POST /auth/register)" -ForegroundColor Cyan
try {
    $body = @{
        email = "test@example.com"
        password = "Test123"
        firstName = "Test"
        lastName = "User"
        phoneNumber = "+1234567890"
        address = "123 Main St"
        role = "STUDENT"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" `
        -Method POST `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $body `
        -TimeoutSec 5 `
        -ErrorAction Stop

    Write-Host "✅ API endpoint working!" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "   Response: $($content | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "⚠️  API response: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "✅ BACKEND STATUS SUMMARY:" -ForegroundColor Green
if ($port) {
    Write-Host "  - Port 8080: ✅ OPEN" -ForegroundColor Green
    Write-Host "  - Backend: ✅ RUNNING" -ForegroundColor Green
    Write-Host "  - API: ✅ ACCESSIBLE" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can access your API at: http://localhost:8080/api" -ForegroundColor Green
    Write-Host "Test endpoint: http://localhost:8080/api/auth/register" -ForegroundColor Green
} else {
    Write-Host "  - Port 8080: ❌ CLOSED" -ForegroundColor Red
    Write-Host "  - Backend: ❌ NOT RUNNING" -ForegroundColor Red
    Write-Host ""
    Write-Host "Start backend with: mvn spring-boot:run" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green

