@echo off
echo ====================================
echo Git Status Check
echo ====================================
echo.

echo Checking Git installation...
git --version
echo.

echo Checking if Git repository is initialized...
if exist ".git" (
    echo ✓ Git repository is initialized
) else (
    echo ✗ Git repository is NOT initialized
    echo Run: git init
)
echo.

echo Checking Git status...
git status
echo.

echo Checking remote configuration...
git remote -v
echo.

echo Checking recent commits...
git log --oneline -5
echo.

echo Checking branch...
git branch
echo.

echo ====================================
echo Diagnostic Complete
echo ====================================
pause

