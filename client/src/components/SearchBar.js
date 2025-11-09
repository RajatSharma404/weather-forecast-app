import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { FiSearch } from 'react-icons/fi';
import { searchCities } from '../services/weatherService';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => {
        searchCities(query).then(data => {
          setSuggestions(data);
          setShowSuggestions(true);
        }).catch(() => {
          setSuggestions([]);
        });
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    const cityName = `${city.name}, ${city.country}`;
    onSearch(cityName);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
            disabled={loading}
          />
        </div>
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              <span className="suggestion-city">{city.name}</span>
              <span className="suggestion-country">{city.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

