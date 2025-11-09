# Git Setup and Push to GitHub Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Pushing Weather App to GitHub" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host ""
Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Checking git configuration..." -ForegroundColor Yellow
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠ Git user configuration not set" -ForegroundColor Yellow
    Write-Host "Setting default configuration..." -ForegroundColor Yellow
    git config user.name "RajatSharma404"
    $email = Read-Host "Enter your email for Git commits"
    if ($email) {
        git config user.email $email
    } else {
        git config user.email "rajat@example.com"
    }
    Write-Host "✓ Git configuration set" -ForegroundColor Green
} else {
    Write-Host "✓ Git user: $userName <$userEmail>" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Adding all files to staging..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added to staging" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: Weather Forecast App with Open-Meteo API

- Full-stack weather forecasting application
- React frontend with modern UI
- Node.js/Express backend
- SQLite database for favorites and history
- Open-Meteo API integration (no API key required)
- 5-day weather forecast
- Favorite cities management
- Search history tracking
- Responsive design"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to commit. Check if there are changes to commit." -ForegroundColor Red
    Write-Host "If this is a new repository, the commit should work." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Create a new repository on GitHub first!" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: weather-forecast-app" -ForegroundColor White
Write-Host "3. Description: Full-featured weather forecasting website" -ForegroundColor White
Write-Host "4. Choose Public or Private" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "6. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$repoName = Read-Host "Enter repository name (default: weather-forecast-app)"
if (-not $repoName) {
    $repoName = "weather-forecast-app"
}

Write-Host ""
Write-Host "Step 5: Setting up remote repository..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/RajatSharma404/$repoName.git"

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "Update to new URL? (y/n)"
    if ($update -eq "y" -or $update -eq "Y") {
        git remote set-url origin $remoteUrl
        Write-Host "✓ Remote updated" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✓ Remote added: $remoteUrl" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 6: Renaming branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch renamed to main" -ForegroundColor Green

Write-Host ""
Write-Host "Step 7: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Repository URL: $remoteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: You may be prompted for GitHub credentials." -ForegroundColor Yellow
Write-Host "If using HTTPS, use a Personal Access Token instead of password." -ForegroundColor Yellow
Write-Host ""

$push = Read-Host "Push to GitHub now? (y/n)"
if ($push -eq "y" -or $push -eq "Y") {
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "====================================" -ForegroundColor Green
        Write-Host "✓ Success! Project pushed to GitHub" -ForegroundColor Green
        Write-Host "====================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Repository URL: https://github.com/RajatSharma404/$repoName" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Visit your repository on GitHub" -ForegroundColor White
        Write-Host "2. Add repository description and topics" -ForegroundColor White
        Write-Host "3. Consider adding a license file" -ForegroundColor White
        Write-Host "4. Update README with badges if desired" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "✗ Failed to push to GitHub" -ForegroundColor Red
        Write-Host ""
        Write-Host "Possible reasons:" -ForegroundColor Yellow
        Write-Host "1. Repository doesn't exist on GitHub yet" -ForegroundColor White
        Write-Host "2. Authentication required (GitHub Personal Access Token)" -ForegroundColor White
        Write-Host "3. Network issues" -ForegroundColor White
        Write-Host ""
        Write-Host "To authenticate:" -ForegroundColor Yellow
        Write-Host "1. Go to GitHub Settings → Developer settings → Personal access tokens" -ForegroundColor White
        Write-Host "2. Generate new token with 'repo' scope" -ForegroundColor White
        Write-Host "3. Use the token as password when pushing" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "Skipped push. Run the following command when ready:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
pause

