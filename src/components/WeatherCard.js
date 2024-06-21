import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { convertToFahrenheit } from '../utils/conversion';

const WeatherCard = ({ title, weather, onClick, selected, city, isFahrenheit }) => {
  if (!weather) return null;

  const { main, weather: weatherDetails } = weather;
  const { temp, feels_like, temp_min, temp_max } = main;
  const { description, icon } = weatherDetails[0];

  const getTemperature = (temperature) => {
    return isFahrenheit ? convertToFahrenheit(temperature) : temperature;
  };

  const displayTemperatureUnit = isFahrenheit ? 'F' : 'C';

  return (
    <Card 
      onClick={onClick}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: 2,
        backgroundColor: selected ? '#007bb2' : '#87CEEB',
        color: '#FFFFFF',
        cursor: 'pointer'
      }}
    >
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{city}</Typography>
        <Typography variant="h6">{description}</Typography>
        <Box display="flex" justifyContent="center">
          <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
        </Box>
        <Typography variant="h4">
          {getTemperature(temp).toFixed(1)}°{displayTemperatureUnit}
        </Typography>
        <Typography variant="body2">
          Feels like: {getTemperature(feels_like).toFixed(1)}°{displayTemperatureUnit}
        </Typography>
        <Typography variant="body2">
          Min: {getTemperature(temp_min).toFixed(1)}°{displayTemperatureUnit} / Max: {getTemperature(temp_max).toFixed(1)}°{displayTemperatureUnit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
