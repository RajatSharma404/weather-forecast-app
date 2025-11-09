# 🌤️ Weather Forecast Website

A full-featured, modern weather forecasting website with a beautiful frontend, robust backend, and database management.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/RajatSharma404/weather-forecast-app)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-blue)](https://open-meteo.com/)

## ✨ Features

- 🌍 **Real-time Weather Data**: Get current weather conditions for any city worldwide
- 📊 **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- ⭐ **Favorite Cities**: Save your frequently searched cities for quick access
- 📜 **Search History**: Keep track of your recent searches
- 🔍 **City Autocomplete**: Smart city search with suggestions
- 💾 **Database Management**: SQLite database for storing favorites and history
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- ⚡ **Fast Performance**: Caching system to reduce API calls

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- **No API key required!** Uses [Open-Meteo](https://open-meteo.com/) - a free, open-source weather API

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wearher
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   Or install separately:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **Set up environment variables (Optional)**
   
   Create a `server/.env` file (optional - API works without it):
   ```env
   PORT=5000
   ```
   
   **Note:** No API key needed! This app uses [Open-Meteo](https://open-meteo.com/) which is completely free and open-source.

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and frontend (port 3000).

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
wearher/
├── server/                 # Backend server
│   ├── index.js           # Express server and API routes
│   ├── package.json       # Server dependencies
│   ├── .env.example       # Environment variables template
│   └── weather.db         # SQLite database (created automatically)
├── client/                # React frontend
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── WeatherCard.js
│   │   │   ├── SearchBar.js
│   │   │   ├── Forecast.js
│   │   │   ├── FavoriteCities.js
│   │   │   └── SearchHistory.js
│   │   ├── services/      # API service functions
│   │   │   └── weatherService.js
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json       # Client dependencies
├── package.json           # Root package.json
└── README.md              # This file
```

## 🔌 API Endpoints

### Backend API Routes

- `GET /api/weather/:city` - Get current weather for a city
- `GET /api/forecast/:city` - Get 5-day forecast for a city
- `GET /api/favorites` - Get all favorite cities
- `POST /api/favorites` - Add a city to favorites
- `DELETE /api/favorites/:id` - Remove a city from favorites
- `GET /api/history` - Get search history
- `GET /api/search?q=query` - Search for cities (autocomplete)
- `GET /api/health` - Health check endpoint

## 🗄️ Database Schema

### Tables

1. **search_history**: Stores recent city searches
   - id, city, country, searched_at

2. **favorite_cities**: Stores user's favorite cities
   - id, city, country, added_at

3. **weather_cache**: Caches weather data (10-minute TTL)
   - id, city, country, data, cached_at

## 🎨 Technologies Used

### Frontend
- React 18
- CSS3 (Modern styling with gradients and animations)
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- SQLite3
- Axios (for API calls)
- CORS

### External API
- [Open-Meteo API](https://open-meteo.com/) - Free, open-source weather API (No API key required!)

## 📱 Responsive Design

The website is fully responsive and works on:
- 🖥️ Desktop
- 📱 Mobile
- 💻 Tablet

## 🔒 Environment Variables (Optional)

Create a `server/.env` file (optional):

```env
PORT=5000
```

**Note:** No API key needed! Open-Meteo API is completely free.

## 🛠️ Available Scripts

- `npm run dev` - Start both server and client
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend
- `npm run install-all` - Install all dependencies

## 🌟 Features in Detail

### Weather Card
- Current temperature and conditions
- Weather icon based on conditions
- Detailed metrics (humidity, wind, pressure, visibility)
- Min/Max temperatures
- Add to favorites functionality

### Forecast
- 5-day weather forecast
- Temperature ranges
- Weather conditions
- Humidity and wind speed

### Favorites
- Save frequently searched cities
- Quick access to favorite locations
- Remove favorites

### Search History
- Track recent searches
- Quick access to previous searches
- Time-stamped entries

## 🐛 Troubleshooting

1. **Port Already in Use**: Change the PORT in `server/.env` or kill the process using the port
2. **Database Errors**: Delete `server/weather.db` and restart the server to recreate it
3. **CORS Issues**: Ensure the backend is running on port 5000 and frontend proxy is configured
4. **API Errors**: The Open-Meteo API is free and doesn't require an API key. If you encounter issues, check your internet connection.

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for the free, open-source weather API
- React team for the amazing framework
- All the open-source contributors

---

Made with ❤️ for weather enthusiasts

