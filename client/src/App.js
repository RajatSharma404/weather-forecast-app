import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import FavoriteCities from './components/FavoriteCities';
import SearchHistory from './components/SearchHistory';
import { getWeather, getForecast, getFavorites, addFavorite, removeFavorite, getHistory } from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    loadFavorites();
    loadHistory();
    // Load default city (London) on mount
    handleSearch('London');
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const handleSearch = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentCity(city);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      loadHistory(); // Refresh history
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (city, country) => {
    try {
      await addFavorite(city, country);
      loadFavorites();
    } catch (err) {
      setError('Failed to add favorite');
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      loadFavorites();
    } catch (err) {
      setError('Failed to remove favorite');
    }
  };

  const handleFavoriteClick = (city) => {
    handleSearch(city);
  };

  const handleHistoryClick = (city) => {
    handleSearch(city);
  };

  const isFavorite = () => {
    if (!weather) return false;
    return favorites.some(
      fav => fav.city === weather.name && fav.country === weather.sys.country
    );
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>🌤️ Weather Forecast</h1>
          <p>Get accurate weather forecasts for any city worldwide</p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="main-content">
          <div className="left-panel">
            {weather && (
              <WeatherCard
                weather={weather}
                onAddFavorite={handleAddFavorite}
                isFavorite={isFavorite()}
              />
            )}

            {forecast && <Forecast forecast={forecast} />}
          </div>

          <div className="right-panel">
            <FavoriteCities
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
              onFavoriteClick={handleFavoriteClick}
            />

            <SearchHistory
              history={history}
              onHistoryClick={handleHistoryClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

