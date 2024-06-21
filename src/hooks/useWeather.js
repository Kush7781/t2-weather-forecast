import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from '../utils/api';

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchWeatherData = async () => {
      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          fetchWeather(city, { signal }),
          fetchForecast(city, { signal })
        ]);

        setWeather(weatherResponse);
        setForecast(forecastResponse.list);
        setLoadingWeather(false);
        setLoadingForecast(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching weather and forecast:', error);
          setError(error.message);
          setLoadingWeather(false);
          setLoadingForecast(false);
        }
      }
    };

    fetchWeatherData();

    return () => {
      controller.abort();
    };
  }, [city]);

  return { weather, forecast, loadingWeather, loadingForecast, error };
};
