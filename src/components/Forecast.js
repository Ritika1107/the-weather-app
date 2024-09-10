import React from 'react';

const Forecast = ({ data }) => {
  if (!data || !data.timelines || !data.timelines.daily || data.timelines.daily.length < 2) {
    return <div>No forecast data available</div>;
  }

  const forecastData = data.timelines.daily.slice(1, 6); // Next 5 days

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      {forecastData.map((day, index) => (
        <div key={index} className="forecast-day">
          <h3>{new Date(day.time).toLocaleDateString()}</h3>
          <p>Temperature: {day.values.temperatureAvg.toFixed(1)}°C</p>
          <p>Humidity: {day.values.humidityAvg.toFixed(1)}%</p>
          <p>Wind Speed: {day.values.windSpeedAvg.toFixed(1)} m/s</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;