import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/weather/current/${city}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "City not found");
      setWeather(data);
      setError("");

      // Save to history if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
          await fetch(`${API_URL}/api/weather/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              city: data.name,
              temperature: data.main.temp,
              condition: data.weather[0].description
            })
          });
        } catch (saveError) {
          console.error("Failed to save history", saveError);
        }
      }

    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">Check Current Weather</h2>
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
