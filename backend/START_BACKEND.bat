@echo off
echo Starting School MIS Backend...
echo.
echo Make sure MongoDB Compass is running!
echo.
cd /d "%~dp0"
call mvn spring-boot:run
pause

