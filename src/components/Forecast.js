import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { convertToFahrenheit } from '../utils/conversion';

const ForecastItem = ({ dt_txt, temp, description, icon, isFahrenheit }) => {
  const dateTime = new Date(dt_txt);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tempDisplay = isFahrenheit ? convertToFahrenheit(temp).toFixed(1) : temp;

  return (
    <Grid item xs={12} sm={4} md={2}>
      <Card sx={{ height: "180px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="body2">{date}</Typography>
          <Typography variant="body2">{time}</Typography>
          <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
          <Typography variant="body1">{tempDisplay}°{isFahrenheit ? 'F' : 'C'}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Forecast = ({ forecast, isFahrenheit }) => {
  const forecastItems = useMemo(() => {
    if (!forecast.length) return null;

    return forecast.slice(0, 24).map((item, index) => {
      const { dt_txt, main, weather } = item;
      if (!main || !weather || weather.length === 0) return null;
      const { temp } = main;
      const { description, icon } = weather[0];

      return (
        <ForecastItem
          key={index}
          dt_txt={dt_txt}
          temp={temp}
          description={description}
          icon={icon}
          isFahrenheit={isFahrenheit}
        />
      );
    });
  }, [forecast, isFahrenheit]);

  if (!forecastItems) return null;

  return (
    <div style={{ margin: '10% auto', maxWidth: "80%" }}>
      <Grid container spacing={2}>
        {forecastItems}
      </Grid>
    </div>
  );
};

export default Forecast;
