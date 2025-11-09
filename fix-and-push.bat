@echo off
echo ====================================
echo Fix and Push to GitHub
echo ====================================
echo.

echo Step 1: Checking Git status...
if not exist ".git" (
    echo Initializing Git repository...
    git init
)
echo.

echo Step 2: Configuring Git (if needed)...
git config user.name "RajatSharma404" 2>nul
git config user.email "rajat@example.com" 2>nul
echo Git user configured
echo.

echo Step 3: Adding all files...
git add .
echo Files added
echo.

echo Step 4: Checking if there are changes to commit...
git status --short
echo.

echo Step 5: Committing changes...
git commit -m "Initial commit: Weather Forecast App with Open-Meteo API" 2>nul
if errorlevel 1 (
    echo No new changes to commit, or commit already exists
) else (
    echo Changes committed successfully
)
echo.

echo Step 6: Verifying repository exists on GitHub...
echo.
echo IMPORTANT: Make sure you've created the repository on GitHub:
echo   1. Go to: https://github.com/new
echo   2. Repository name: weather-forecast-app
echo   3. DO NOT initialize with README, .gitignore, or license
echo   4. Click "Create repository"
echo.
set /p CONFIRM="Have you created the repository on GitHub? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo Please create the repository first, then run this script again.
    pause
    exit /b 1
)
echo.

echo Step 7: Setting up remote...
git remote remove origin 2>nul
git remote add origin https://github.com/RajatSharma404/weather-forecast-app.git
echo Remote set to: https://github.com/RajatSharma404/weather-forecast-app.git
echo.

echo Step 8: Setting branch to main...
git branch -M main
echo.

echo Step 9: Pushing to GitHub...
echo.
echo You may be prompted for credentials:
echo   Username: RajatSharma404
echo   Password: Use a Personal Access Token (not your GitHub password)
echo.
echo Get token from: https://github.com/settings/tokens
echo.
pause

git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ====================================
    echo Push Failed
    echo ====================================
    echo.
    echo Common issues:
    echo 1. Repository doesn't exist on GitHub - Create it first
    echo 2. Authentication failed - Use Personal Access Token
    echo 3. Network issues - Check internet connection
    echo.
    echo Try pushing manually:
    echo   git push -u origin main
    echo.
) else (
    echo.
    echo ====================================
    echo ✓ Success! Repository pushed to GitHub
    echo ====================================
    echo.
    echo Repository URL: https://github.com/RajatSharma404/weather-forecast-app
    echo.
    echo Verify by visiting the URL above.
    echo.
)

pause

