@echo off
echo ====================================
echo Weather App - GitHub Push
echo ====================================
echo.

echo Step 1: Initializing Git...
git init
echo.

echo Step 2: Adding all files...
git add .
echo.

echo Step 3: Committing changes...
git commit -m "Initial commit: Weather Forecast App with Open-Meteo API"
echo.

echo Step 4: Setting up remote...
git remote add origin https://github.com/RajatSharma404/weather-forecast-app.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating...
    git remote set-url origin https://github.com/RajatSharma404/weather-forecast-app.git
)
echo.

echo Step 5: Setting branch to main...
git branch -M main
echo.

echo ====================================
echo IMPORTANT: Create repository on GitHub first!
echo ====================================
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: weather-forecast-app
echo 3. DO NOT initialize with README, .gitignore, or license
echo 4. Click "Create repository"
echo.
echo Press any key after creating the repository on GitHub...
pause
echo.

echo Step 6: Pushing to GitHub...
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ====================================
    echo Push failed. Possible reasons:
    echo ====================================
    echo 1. Repository not created on GitHub yet
    echo 2. Authentication required
    echo 3. Network issues
    echo.
    echo For authentication, you'll need a Personal Access Token.
    echo Get one from: https://github.com/settings/tokens
    echo.
) else (
    echo.
    echo ====================================
    echo Success! Project pushed to GitHub
    echo ====================================
    echo.
    echo Repository: https://github.com/RajatSharma404/weather-forecast-app
    echo.
)

pause

