import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import { fetchUserWeatherInfo, fetchSearchWeatherInfo, getLocation } from './services/weatherApi';
import { addFavoriteLocation, getFavoriteLocations, removeFavoriteLocation } from './services/favoriteLocations';
import loadingIcon from './assets/loading.png';
import locationIcon from './assets/location.png';
import searchIcon from './assets/search.png';
// import checkIcon from './assets/checkmark.png';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [activeTab, setActiveTab] = useState('user');
  const [favoriteLocations, setFavoriteLocations] = useState([]);
<<<<<<< HEAD
=======
  const [addedFavorite, setAddedFavorite] = useState(null); // New state to track the added favorite
>>>>>>> fa4f1aa (Added Favorites City Addition)

  useEffect(() => {
    const initApp = async () => {
      try {
        await handleUserWeather();
        await loadFavoriteLocations();
      } catch (error) {
        console.error("Error initializing app:", error);
        setError("Failed to initialize app. Please check your internet connection and try again.");
      }
    };

    initApp();
  }, []);

  const loadFavoriteLocations = async () => {
    try {
      const locations = await getFavoriteLocations();
      console.log("Loaded favorite locations:", locations);
      setFavoriteLocations(locations);
    } catch (error) {
      console.error("Error loading favorite locations:", error);
      setError("Failed to load favorite locations. Please try again.");
    }
  };

  const handleUserWeather = async () => {
    setIsLoading(true);
    setActiveTab('user');
    try {
      const coordinates = await getLocation();
      console.log("Coordinates:", coordinates);
      const data = await fetchUserWeatherInfo(coordinates);
      console.log("Weather data:", data);
      setWeatherData(data);
    } catch (err) {
      console.error('Error in handleUserWeather:', err);
      setError('Failed to fetch user weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    if (weatherData) {
      try {
        const result = await addFavoriteLocation({ name: weatherData.name, country: weatherData.sys.country });
        if (result.success) {
          alert(result.message);
<<<<<<< HEAD
=======
          setAddedFavorite({ name: weatherData.name, country: weatherData.sys.country }); // Set the added favorite
>>>>>>> fa4f1aa (Added Favorites City Addition)
          await loadFavoriteLocations();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error adding favorite location:", error);
        alert("Error adding favorite location");
      }
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      const result = await removeFavoriteLocation(id);
      if (result.success) {
        alert(result.message);
        await loadFavoriteLocations();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error removing favorite location:", error);
      alert("Error removing favorite location");
    }
  };

  const handleFavoriteClick = async (location) => {
    setSearchCity(location.name);
    await handleSearch(null, location.name);
  };

  const handleSearch = async (e, city = null) => {
    if (e) e.preventDefault();
    const searchTerm = city || searchCity;
    if (!searchTerm) return;

    setIsLoading(true);
    setActiveTab('search');
    try {
      const data = await fetchSearchWeatherInfo(searchTerm);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h1>Weather App</h1>

      <div className="tab-container">
        <button className={`tab ${activeTab === 'user' ? 'active' : ''}`} onClick={handleUserWeather}>Your Weather</button>
        <button className={`tab ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')}>Search Weather</button>
      </div>

      <div className="weather-container">
        {activeTab === 'user' && !weatherData && !isLoading && (
          <div className="sub-container grant-location-container">
            <img src={locationIcon} width="80" height="80" alt="location" />
            <p>Grant Location Access</p>
            <p>Allow Access to get weather Information</p>
            <button className="btn" onClick={handleUserWeather}>Grant Access</button>
          </div>
        )}

        {activeTab === 'search' && (
          <form className="form-container" onSubmit={handleSearch}>
            <input 
              placeholder="Search for City..." 
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button className="btn" type="submit">
              <img src={searchIcon} width="20" height="20" alt="search" />
            </button>
          </form>
        )}

        {isLoading && (
          <div className="sub-container loading-container">
            <img src={loadingIcon} width="150" height="150" alt="loading" />
            <p>Loading</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {weatherData && !isLoading && (
          <>
            <Weather data={weatherData} />
            <button onClick={handleAddFavorite}>Add to Favorites</button>
          </>
        )}
      </div>

      <div className="favorite-locations">
        <h2>Favorite Locations</h2>
        <ul>
          {favoriteLocations.map(location => (
            <li key={location.id}>
              <button onClick={() => handleFavoriteClick(location)}>{location.name}, {location.country}</button>
              <button onClick={() => handleRemoveFavorite(location.id)}>Remove</button>
            </li>
          ))}
<<<<<<< HEAD
=======
          {addedFavorite && ( // Display the added favorite
            <li>
              <span>{addedFavorite.name}, {addedFavorite.country}</span>
            </li>
          )}
>>>>>>> fa4f1aa (Added Favorites City Addition)
        </ul>
      </div>
    </div>
  );
}

export default App;