const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
const dbPath = path.join(__dirname, 'weather.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Search history table
    db.run(`CREATE TABLE IF NOT EXISTS search_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      country TEXT,
      searched_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Favorite cities table
    db.run(`CREATE TABLE IF NOT EXISTS favorite_cities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      country TEXT,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(city, country)
    )`);

    // Weather cache table (to reduce API calls)
    db.run(`CREATE TABLE IF NOT EXISTS weather_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      country TEXT,
      data TEXT NOT NULL,
      cached_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(city, country)
    )`);
  });
}

// Open-Meteo API configuration (No API key required!)
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

// Helper function to get coordinates from city name
async function getCityCoordinates(city) {
  try {
    const response = await axios.get(GEOCODING_API, {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });
    
    if (!response.data.results || response.data.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }
    
    const location = response.data.results[0];
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country,
      countryCode: location.country_code
    };
  } catch (error) {
    throw new Error(error.response?.data?.reason || `Failed to find city: ${city}`);
  }
}

// Helper function to convert weather code to OpenWeatherMap format
function convertWeatherCode(code) {
  // Open-Meteo WMO Weather interpretation codes
  // Converting to OpenWeatherMap format for frontend compatibility
  if (code === 0) return { main: 'Clear', description: 'clear sky' };
  if (code <= 3) return { main: 'Clouds', description: 'partly cloudy' };
  if (code <= 49) return { main: 'Fog', description: 'foggy' };
  if (code <= 59) return { main: 'Drizzle', description: 'drizzle' };
  if (code <= 69) return { main: 'Rain', description: 'rain' };
  if (code <= 79) return { main: 'Snow', description: 'snow' };
  if (code <= 84) return { main: 'Rain', description: 'rain showers' };
  if (code <= 86) return { main: 'Snow', description: 'snow showers' };
  if (code <= 99) return { main: 'Thunderstorm', description: 'thunderstorm' };
  return { main: 'Clouds', description: 'cloudy' };
}

// Helper function to get weather data (transformed to match OpenWeatherMap format)
async function getWeatherData(city, units = 'metric') {
  try {
    // Step 1: Get coordinates
    const coords = await getCityCoordinates(city);
    
    // Step 2: Get current weather
    const response = await axios.get(WEATHER_API, {
      params: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl,visibility,is_day',
        timezone: 'auto'
      }
    });
    
    const data = response.data.current;
    const weather = convertWeatherCode(data.weather_code);
    
    // Transform to OpenWeatherMap format for frontend compatibility
    return {
      name: coords.name,
      sys: {
        country: coords.countryCode
      },
      weather: [{
        main: weather.main,
        description: weather.description,
        icon: `wi-${weather.main.toLowerCase()}`
      }],
      main: {
        temp: data.temperature_2m,
        feels_like: data.temperature_2m, // Open-Meteo doesn't provide feels_like, using temp
        temp_min: data.temperature_2m - 2, // Approximate
        temp_max: data.temperature_2m + 2, // Approximate
        pressure: Math.round(data.pressure_msl),
        humidity: data.relative_humidity_2m
      },
      wind: {
        speed: data.wind_speed_10m,
        deg: 0 // Open-Meteo doesn't provide wind direction in current
      },
      visibility: data.visibility ? Math.round(data.visibility * 1000) : 10000, // Convert km to meters
      dt: Math.floor(Date.now() / 1000),
      coord: {
        lat: coords.latitude,
        lon: coords.longitude
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
}

// Helper function to get forecast data (transformed to match OpenWeatherMap format)
async function getForecastData(city, units = 'metric') {
  try {
    // Step 1: Get coordinates
    const coords = await getCityCoordinates(city);
    
    // Step 2: Get forecast
    const response = await axios.get(WEATHER_API, {
      params: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        timezone: 'auto',
        forecast_days: 5
      }
    });
    
    const hourly = response.data.hourly;
    const daily = response.data.daily;
    
    // Transform to OpenWeatherMap format - using daily data for better accuracy
    // Taking one forecast per day at noon (12:00) for the next 5 days
    const list = [];
    const now = new Date();
    now.setHours(12, 0, 0, 0); // Set to noon
    
    for (let day = 0; day < Math.min(daily.time.length, 5); day++) {
      const forecastDate = new Date(daily.time[day]);
      forecastDate.setHours(12, 0, 0, 0);
      
      // Find closest hourly data point to noon
      let closestHourIndex = 0;
      let minDiff = Infinity;
      for (let i = 0; i < hourly.time.length; i++) {
        const hourDate = new Date(hourly.time[i]);
        const diff = Math.abs(hourDate.getTime() - forecastDate.getTime());
        if (diff < minDiff) {
          minDiff = diff;
          closestHourIndex = i;
        }
      }
      
      const weather = convertWeatherCode(daily.weather_code[day]);
      list.push({
        dt: Math.floor(forecastDate.getTime() / 1000),
        main: {
          temp: hourly.temperature_2m[closestHourIndex] || (daily.temperature_2m_max[day] + daily.temperature_2m_min[day]) / 2,
          temp_min: daily.temperature_2m_min[day],
          temp_max: daily.temperature_2m_max[day],
          humidity: hourly.relative_humidity_2m[closestHourIndex] || 60,
          pressure: 1013 // Default pressure
        },
        weather: [{
          main: weather.main,
          description: weather.description
        }],
        wind: {
          speed: hourly.wind_speed_10m[closestHourIndex] || 5
        },
        dt_txt: forecastDate.toISOString().split('T')[0] + ' 12:00:00'
      });
    }
    
    return {
      city: {
        name: coords.name,
        country: coords.countryCode,
        coord: {
          lat: coords.latitude,
          lon: coords.longitude
        }
      },
      list: list
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
}

// Check cache
function getCachedWeather(city, callback) {
  db.get(
    'SELECT * FROM weather_cache WHERE city = ? AND datetime(cached_at) > datetime("now", "-10 minutes")',
    [city],
    callback
  );
}

// Save to cache
function saveToCache(city, country, data) {
  const dataStr = JSON.stringify(data);
  db.run(
    'INSERT OR REPLACE INTO weather_cache (city, country, data, cached_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
    [city, country, dataStr]
  );
}

// API Routes

// Get current weather
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const { units } = req.query;

    // Check cache first
    getCachedWeather(city, async (err, row) => {
      if (!err && row) {
        return res.json(JSON.parse(row.data));
      }

      // Fetch from API
      const weatherData = await getWeatherData(city, units || 'metric');
      
      // Save to cache
      saveToCache(weatherData.name, weatherData.sys.country, weatherData);
      
      // Save to search history
      db.run(
        'INSERT INTO search_history (city, country) VALUES (?, ?)',
        [weatherData.name, weatherData.sys.country]
      );

      res.json(weatherData);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weather forecast
app.get('/api/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const { units } = req.query;

    const forecastData = await getForecastData(city, units || 'metric');
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get search history
app.get('/api/history', (req, res) => {
  db.all(
    'SELECT * FROM search_history ORDER BY searched_at DESC LIMIT 10',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Add favorite city
app.post('/api/favorites', (req, res) => {
  const { city, country } = req.body;
  
  db.run(
    'INSERT OR IGNORE INTO favorite_cities (city, country) VALUES (?, ?)',
    [city, country],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Favorite added successfully', id: this.lastID });
    }
  );
});

// Get favorite cities
app.get('/api/favorites', (req, res) => {
  db.all(
    'SELECT * FROM favorite_cities ORDER BY added_at DESC',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Remove favorite city
app.delete('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(
    'DELETE FROM favorite_cities WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Favorite removed successfully' });
    }
  );
});

// Search cities (for autocomplete) - Using Open-Meteo Geocoding API
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const response = await axios.get(GEOCODING_API, {
      params: {
        name: q,
        count: 5,
        language: 'en',
        format: 'json'
      }
    });
    
    // Transform to match OpenWeatherMap format for frontend compatibility
    const results = (response.data.results || []).map(location => ({
      name: location.name,
      country: location.country,
      state: location.admin1 || '',
      lat: location.latitude,
      lon: location.longitude
    }));
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using Open-Meteo API (No API key required!)`);
  console.log(`Weather API: https://api.open-meteo.com/v1/forecast`);
  console.log(`Geocoding API: https://geocoding-api.open-meteo.com/v1/search`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});

