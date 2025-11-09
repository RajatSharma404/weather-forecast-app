import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWeather = async (city) => {
  try {
    const response = await api.get(`/weather/${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch weather');
  }
};

export const getForecast = async (city) => {
  try {
    const response = await api.get(`/forecast/${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch forecast');
  }
};

export const getFavorites = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch favorites');
  }
};

export const addFavorite = async (city, country) => {
  try {
    const response = await api.post('/favorites', { city, country });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add favorite');
  }
};

export const removeFavorite = async (id) => {
  try {
    const response = await api.delete(`/favorites/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove favorite');
  }
};

export const getHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch history');
  }
};

export const searchCities = async (query) => {
  try {
    const response = await api.get('/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search cities');
  }
};

