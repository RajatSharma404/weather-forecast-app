import React from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayHaze } from 'react-icons/wi';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const WeatherCard = ({ weather, onAddFavorite, isFavorite }) => {
  if (!weather) return null;

  const getWeatherIcon = (main) => {
    const iconMap = {
      Clear: <WiDaySunny />,
      Clouds: <WiCloudy />,
      Rain: <WiRain />,
      Drizzle: <WiRain />,
      Thunderstorm: <WiThunderstorm />,
      Snow: <WiSnow />,
      Mist: <WiFog />,
      Fog: <WiFog />,
      Haze: <WiDayHaze />,
    };
    return iconMap[main] || <WiDaySunny />;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      onAddFavorite(weather.name, weather.sys.country);
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="weather-location">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{formatDate(weather.dt)}</p>
        </div>
        {!isFavorite && (
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            <FiHeart /> Add to Favorites
          </button>
        )}
        {isFavorite && (
          <div className="favorite-badge">
            <FaHeart /> Favorite
          </div>
        )}
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <div className="weather-temp">
          <span className="temp-value">{Math.round(weather.main.temp)}°</span>
          <span className="temp-unit">C</span>
        </div>
        <div className="weather-description">
          <p>{weather.weather[0].description}</p>
          <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Min Temp</span>
          <span className="detail-value">{Math.round(weather.main.temp_min)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Max Temp</span>
          <span className="detail-value">{Math.round(weather.main.temp_max)}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

