import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Ensure this file exists and contains your styles

const API_KEY = "4deb21facfcf5347b6737500e037726b";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Function to fetch 5-day forecast weather data
  const fetchWeather = async () => {
    if (!city.trim()) return alert("Please enter a city!");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );

      // Filter to get one forecast per day (12:00 PM)
      const dailyForecasts = response.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );

      setWeather({ city: response.data.city.name, forecasts: dailyForecasts });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(error.response?.data?.message || "City not found! Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <p>Student Name: Nazneen Akter Nitu</p>
        <p>Student ID: 101444170</p>
      </header>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <div className="forecast">
            {weather.forecasts.map((forecast, index) => (
              <div key={index} className="day">
                <h3>{new Date(forecast.dt_txt).toLocaleDateString()}</h3>
                <p>{forecast.weather[0].description}</p>
                <p>Temperature: {Math.round(forecast.main.temp)}°C</p>
                <p>Max Temp: {Math.round(forecast.main.temp_max)}°C</p>
                <p>Min Temp: {Math.round(forecast.main.temp_min)}°C</p>
                <p>Humidity: {forecast.main.humidity}%</p>
                <p>Wind Speed: {forecast.wind.speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
