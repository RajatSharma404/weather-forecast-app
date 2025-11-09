# Weather Forecast App - Complete Setup and Run Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Weather Forecast App Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create .env file if it doesn't exist (optional)
if (-not (Test-Path "server\.env")) {
    Write-Host "Creating server\.env file..." -ForegroundColor Yellow
    $envContent = @"
PORT=5000
# Open-Meteo API - No API key required! It's completely free.
"@
    Set-Content -Path "server\.env" -Value $envContent
    Write-Host "✓ Created server\.env" -ForegroundColor Green
    Write-Host ""
    Write-Host "✓ Using Open-Meteo API (No API key required!)" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✓ server\.env already exists" -ForegroundColor Green
    Write-Host ""
}

# Step 2: Install root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install root dependencies" -ForegroundColor Red
    Write-Host "Please run: npm install" -ForegroundColor Yellow
    pause
    exit 1
}
Write-Host "✓ Root dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 3: Install server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Green
Push-Location server
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install server dependencies" -ForegroundColor Red
    Pop-Location
    pause
    exit 1
}
Pop-Location
Write-Host "✓ Server dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 4: Install client dependencies
Write-Host "Installing client dependencies..." -ForegroundColor Green
Push-Location client
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install client dependencies" -ForegroundColor Red
    Pop-Location
    pause
    exit 1
}
Pop-Location
Write-Host "✓ Client dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 5: Display API info
Write-Host "✓ Using Open-Meteo API (No API key required!)" -ForegroundColor Green
Write-Host ""

# Step 6: Start the application
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting the application..." -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start the dev server
npm run dev

