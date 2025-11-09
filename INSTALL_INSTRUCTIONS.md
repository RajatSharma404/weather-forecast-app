# 🚀 Installation and Run Instructions

## Quick Start (Windows PowerShell)

1. **Open PowerShell in the project directory**
2. **Run the setup script:**
   ```powershell
   .\setup-and-run.ps1
   ```

This script will:
- Create the `.env` file automatically
- Install all dependencies
- Start the application

## Manual Installation

### Step 1: Install Dependencies

Run this command in the project root:
```bash
npm run install-all
```

Or install separately:
```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install
cd ..

# Client dependencies
cd client
npm install
cd ..
```

### Step 2: Create Environment File (Optional)

**No API key required!** This app uses [Open-Meteo](https://open-meteo.com/), a free, open-source weather API.

Optionally create `server/.env`:
```
PORT=5000
```

### Step 3: Run the Application

```bash
npm run dev
```

This starts both:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

### Alternative: Run Separately

**Terminal 1 (Backend):**
```bash
npm run server
```

**Terminal 2 (Frontend):**
```bash
npm run client
```

## Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the weather app interface
3. Search for a city (e.g., "London")
4. If you see weather data, everything is working!

## Troubleshooting

### "Cannot find module" errors
- Make sure you ran `npm run install-all`
- Try deleting `node_modules` folders and reinstalling

### API errors
- No API key needed! Open-Meteo is completely free
- Check your internet connection if API calls fail

### Port already in use
- Change PORT in `server/.env` to a different port (e.g., 5001)
- Update `client/package.json` proxy if you change the port

### Database errors
- Delete `server/weather.db` if it exists
- The database will be recreated automatically

## Need Help?

Check the main README.md for more detailed information.

