import axios from 'axios';

const API_KEY = 'ebb94d63f1d34d7aeddd00b18246efa7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch weather data');
    }
  } catch (error) {
    if (error.response) {
      throw new Error('City not found');
    } else if (error.request) {
      throw new Error('Network error');
    } else {
      throw new Error('Error fetching weather data');
    }
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch forecast data');
    }
  } catch (error) {
    if (error.response) {
      throw new Error('City not found');
    } else if (error.request) {
      throw new Error('Network error');
    } else {
      throw new Error('Error fetching forecast data');
    }
  }
};
