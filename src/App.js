import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { useWeather } from './hooks/useWeather';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel } from '@mui/material';
import './App.css';

const App = () => {
  const [city, setCity] = useState('Ahmedabad'); 
  const [prevCity, setPrevCity] = useState('Ahmedabad'); 
  const { weather, forecast, loading, error } = useWeather(city);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [darkMode, setDarkMode] = useState(true); 
  const [isFahrenheit, setIsFahrenheit] = useState(false); 

  const handleSearch = (newCity) => {
    setPrevCity(city);
    setCity(newCity);
  };

  const handleCardClick = (dayIndex) => {
    setSelectedDay(dayIndex);
  };

  const getWeatherForDay = (dayIndex) => {
    if (!forecast.length) return null;
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + dayIndex);

    const dayForecast = forecast.find(item => {
      const itemDate = new Date(item.dt_txt);
      return itemDate.getDate() === selectedDate.getDate();
    });
    return dayForecast || null;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  useEffect(() => {
    if (error) {
      setShowErrorDialog(true);
      setCity(prevCity);
    }
  }, [error, prevCity]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="toggle-container">
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode"
        />
        <FormControlLabel
          control={<Switch checked={isFahrenheit} onChange={toggleTemperatureUnit} />}
          label="Fahrenheit"
        />
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {[0, 1, 2].map(dayIndex => (
              <Grid key={dayIndex} item xs={12} sm={4} md={3}>
                <WeatherCard
                  title={dayIndex === 0 ? 'Today' : (dayIndex === 1 ? 'Tomorrow' : 'Day After')}
                  weather={getWeatherForDay(dayIndex)}
                  onClick={() => handleCardClick(dayIndex)}
                  selected={selectedDay === dayIndex}
                  city={city}
                  isFahrenheit={isFahrenheit}
                />
              </Grid>
            ))}
          </Grid>
          <Forecast
            forecast={forecast.filter(item => {
              const itemDate = new Date(item.dt_txt);
              return itemDate.getDate() === new Date().getDate() + selectedDay;
            })}
            isFahrenheit={isFahrenheit}
          />
        </>
      )}
      <Dialog open={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>City not found. Please enter a valid city name.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowErrorDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
