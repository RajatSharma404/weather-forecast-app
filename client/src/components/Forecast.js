import React from 'react';
import './Forecast.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayHaze } from 'react-icons/wi';

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

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

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Group forecast by date and show one per day (or next 5-6 items)
  const dailyForecasts = forecast.list.slice(0, 5);

  return (
    <div className="forecast-card">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {dailyForecasts.map((item, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-date">
              <span className="forecast-day">{formatDate(item.dt)}</span>
              <span className="forecast-time">{formatTime(item.dt)}</span>
            </div>
            <div className="forecast-icon">
              {getWeatherIcon(item.weather[0].main)}
            </div>
            <div className="forecast-temp">
              <span className="temp-high">{Math.round(item.main.temp_max)}°</span>
              <span className="temp-low">/{Math.round(item.main.temp_min)}°</span>
            </div>
            <div className="forecast-description">
              {item.weather[0].description}
            </div>
            <div className="forecast-details">
              <span>💧 {item.main.humidity}%</span>
              <span>💨 {item.wind.speed} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;

