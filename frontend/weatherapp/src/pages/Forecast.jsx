import React, { useState } from "react";
import "./Forecast.css";

function Forecast() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchForecast = async () => {
    if (!city) return;
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/weather/forecast/${city}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "City not found");
      setForecast(data.list.slice(0, 5)); // first 5 days
      setError("");
    } catch (err) {
      setError(err.message);
      setForecast([]);
    }
  };

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchForecast}>Search</button>

      {error && <p className="forecast-error">{error}</p>}

      <div className="forecast-list">
        {forecast.map((day, i) => (
          <div className="forecast-card" key={i}>
            <p><strong>{day.dt_txt}</strong></p>
            <p>🌡 {day.main.temp}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
