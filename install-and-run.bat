@echo off
echo ====================================
echo Weather Forecast App - Setup
echo ====================================
echo.

echo Step 1: Creating .env file (optional)...
if not exist "server\.env" (
    (
        echo PORT=5000
        echo # Open-Meteo API - No API key required! It's completely free.
    ) > "server\.env"
    echo Created server\.env file
    echo.
    echo NOTE: No API key needed! Using Open-Meteo API (free, open-source)
    echo.
) else (
    echo server\.env already exists
)
echo.

echo Step 2: Installing root dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)
echo.

echo Step 3: Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install server dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo Step 4: Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install client dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ====================================
echo Installation Complete!
echo ====================================
echo.
echo Using Open-Meteo API (No API key required!)
echo.
echo Starting the application...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev

pause

