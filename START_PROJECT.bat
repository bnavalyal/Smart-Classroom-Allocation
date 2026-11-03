@echo off
title Smart Classroom Allocation System - Launcher
echo ========================================================
echo  Starting Smart Classroom Allocation System
echo ========================================================

echo 1. Checking MongoDB...
net start MongoDB >nul 2>&1

echo 2. Starting Backend API on port 5000...
start "Backend API (Port 5000)" /min cmd /c "node index.js"

echo 3. Starting Frontend on port 5173...
cd "Smart Classroom & Blackboard Classroom Allocation System\frontend"
start "Frontend UI (Port 5173)" /min cmd /c "npm run dev"

echo 4. Waiting for servers to initialize...
timeout /t 3 >nul

echo 5. Opening the application in your browser...
start http://localhost:5173

echo ========================================================
echo  APPLICATION IS RUNNING!
echo  URL: http://localhost:5173
echo  Admin Login: admin@reva.edu.in / adminreva123@
echo  Coordinator: coordinator@reva.edu.in / coordinatorreva123@
echo ========================================================
pause
