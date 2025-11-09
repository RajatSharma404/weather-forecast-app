@echo off
echo ====================================
echo Weather Forecast App - Startup Script
echo ====================================
echo.

REM Check if .env file exists
if not exist "server\.env" (
    echo WARNING: server\.env file not found!
    echo.
    echo Please create server\.env with:
    echo PORT=5000
    echo WEATHER_API_KEY=your_api_key_here
    echo.
    echo Get your free API key from: https://openweathermap.org/api
    echo.
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ====================================
echo Starting the application...
echo ====================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

call npm run dev

pause

