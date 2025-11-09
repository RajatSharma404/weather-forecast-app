# 🚀 Quick Start Guide

## Step 1: Install Dependencies

Open a terminal in the project root and run:

```bash
npm run install-all
```

Or use the batch script (Windows):
```bash
start.bat
```

## Step 2: Set Up Environment (Optional)

**No API key needed!** This app uses [Open-Meteo](https://open-meteo.com/), a free weather API.

Optionally create `server/.env`:
```
PORT=5000
```

## Step 3: Run the Application

```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) servers.

## Step 4: Open in Browser

Navigate to: **http://localhost:3000**

## Alternative: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## Troubleshooting

- **API Key Error**: Make sure `server/.env` exists and has a valid API key
- **Port Already in Use**: Change PORT in `server/.env` or kill the process using the port
- **Dependencies Error**: Delete `node_modules` folders and reinstall

---

Happy coding! 🌤️

