@echo off
REM Smart Attendance System - Local Server Launcher
REM This script starts the web server for the app

echo.
echo ============================================================
echo   Smart Attendance System - Web Server Launcher
echo ============================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo [OK] Python found!
echo.
echo Starting Smart Attendance System...
echo.

REM Run the Python server
python "%~dp0server.py"

REM If server stops, show message
if errorlevel 1 (
    echo.
    echo [ERROR] Server failed to start
    echo.
    pause
    exit /b 1
)
