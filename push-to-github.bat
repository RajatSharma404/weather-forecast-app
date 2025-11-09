@echo off
echo ====================================
echo Pushing Weather App to GitHub
echo ====================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
if not exist ".git" (
    git init
    echo Git repository initialized
) else (
    echo Git repository already initialized
)
echo.

echo Step 2: Adding all files to staging...
git add .
echo Files added to staging
echo.

echo Step 3: Committing changes...
git commit -m "Initial commit: Weather Forecast App with Open-Meteo API"
if errorlevel 1 (
    echo Note: If this is your first commit, you may need to configure git:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    echo.
    echo Please configure git and run this script again.
    pause
    exit /b 1
)
echo Changes committed
echo.

echo Step 4: Setting up remote repository...
echo.
echo IMPORTANT: Create a new repository on GitHub first:
echo   1. Go to https://github.com/new
echo   2. Repository name: weather-forecast-app (or your preferred name)
echo   3. Make it Public or Private (your choice)
echo   4. DO NOT initialize with README, .gitignore, or license
echo   5. Click "Create repository"
echo.
echo After creating the repository, press any key to continue...
pause
echo.

set /p REPO_NAME="Enter your GitHub repository name (e.g., weather-forecast-app): "
if "%REPO_NAME%"=="" set REPO_NAME=weather-forecast-app

echo.
echo Adding remote origin: https://github.com/RajatSharma404/%REPO_NAME%.git
git remote add origin https://github.com/RajatSharma404/%REPO_NAME%.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating...
    git remote set-url origin https://github.com/RajatSharma404/%REPO_NAME%.git
)
echo.

echo Step 5: Pushing to GitHub...
echo.
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub
    echo.
    echo Possible reasons:
    echo   1. Repository doesn't exist on GitHub yet
    echo   2. Authentication required (GitHub Personal Access Token)
    echo   3. Network issues
    echo.
    echo If you need to authenticate, GitHub may prompt for credentials.
    echo For HTTPS, you'll need a Personal Access Token instead of password.
    echo.
) else (
    echo.
    echo ====================================
    echo Success! Project pushed to GitHub
    echo ====================================
    echo.
    echo Repository URL: https://github.com/RajatSharma404/%REPO_NAME%
    echo.
)

pause

