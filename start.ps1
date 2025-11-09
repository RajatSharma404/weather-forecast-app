# Weather Forecast App - Startup Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Weather Forecast App - Startup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (-not (Test-Path "server\.env")) {
    Write-Host "WARNING: server\.env file not found!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Creating server\.env from template..." -ForegroundColor Yellow
    Copy-Item "server\env.example.txt" "server\.env" -ErrorAction SilentlyContinue
    Write-Host ""
    Write-Host "Please edit server\.env and add your OpenWeatherMap API key" -ForegroundColor Yellow
    Write-Host "Get your free API key from: https://openweathermap.org/api" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to continue after adding your API key..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install root dependencies" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "Installing server dependencies..." -ForegroundColor Green
Set-Location server
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install server dependencies" -ForegroundColor Red
    pause
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "Installing client dependencies..." -ForegroundColor Green
Set-Location client
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install client dependencies" -ForegroundColor Red
    pause
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting the application..." -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

npm run dev

