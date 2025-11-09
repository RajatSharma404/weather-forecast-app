# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

**Good News!** No API key required. This app uses [Open-Meteo](https://open-meteo.com/), a free, open-source weather API.

## Step 2: Install Dependencies (if not already installed)

Run the following command in the root directory:

```bash
npm run install-all
```

This will install dependencies for:

- Root package (concurrently)
- Server (Express, SQLite, etc.)
- Client (React, etc.)

## Step 3: Configure Environment Variables (Optional)

1. Create a file named `.env` in the `server` folder (optional)
2. Add the port (default is 5000)

Example `server/.env`:

```
PORT=5000
```

**Note:** No API key needed! Open-Meteo API is completely free and doesn't require authentication.

## Step 4: Start the Application

Run both server and client simultaneously:

```bash
npm run dev
```

Or start them separately:

**Terminal 1 (Backend):**

```bash
npm run server
```

**Terminal 2 (Frontend):**

```bash
npm run client
```

## Step 5: Access the Application

Open your browser and navigate to:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Troubleshooting

### API Issues

- Open-Meteo API is free and doesn't require an API key
- Check your internet connection if API calls fail
- The API has no rate limits for reasonable use

### Port Already in Use

- Change the PORT in `server/.env` to a different port (e.g., 5001)
- Update the proxy in `client/package.json` if you change the port

### Database Issues

- Delete `server/weather.db` and restart the server
- The database will be recreated automatically

### Dependencies Not Installing

- Make sure you have Node.js v14 or higher installed
- Try deleting `node_modules` folders and `package-lock.json` files, then reinstall
- Use `npm install` instead of `yarn` if you encounter issues

## Features to Try

1. **Search for a City**: Type a city name and see the weather
2. **Add to Favorites**: Click "Add to Favorites" on any weather card
3. **View Forecast**: See the 5-day forecast below the current weather
4. **Search History**: Check your recent searches in the sidebar
5. **City Autocomplete**: Start typing a city name to see suggestions

Enjoy your weather app! 🌤️
