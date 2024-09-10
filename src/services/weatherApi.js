const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchUserWeatherInfo = async (coordinates) => {
  const { lat, lon } = coordinates;
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user weather data:", error);
    throw error;
  }
};

export const fetchSearchWeatherInfo = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search weather data:", error);
    throw error;
  }
};

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          resolve(userCoordinates);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};