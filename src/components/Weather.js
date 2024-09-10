import React from 'react';
import './Weather.css';  
import windIcon from '../assets/wind.png';
import humidityIcon from '../assets/humidity.png';
import cloudIcon from '../assets/cloud.png';


const Weather = ({ data }) => {
  if (!data || !data.main) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="sub-container user-info-container">
      <div className="name">
        <p>{data.name}</p>
        <img src={`https://flagcdn.com/144x108/${data.sys.country.toLowerCase()}.png`} alt="country flag" />
      </div>
      <p>{data.weather[0].description}</p>
      <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" />
      <p>{data.main.temp}°C</p>
      <div className="parameter-container">
        <div className="parameter">
          <img src={windIcon} alt="wind" className="small-icon" />
          <p>windspeed: {data.wind.speed} m/s</p>
        </div>
        <div className="parameter">
          <img src={humidityIcon} alt="humidity" className="small-icon" />
          <p>humidity: {data.main.humidity}%</p>
        </div>
        <div className="parameter">
          <img src={cloudIcon} alt="clouds" className="small-icon" />
          <p>Clouds: {data.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;