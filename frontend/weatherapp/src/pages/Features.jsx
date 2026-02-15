import React from "react";
import { Link } from "react-router-dom";
import "./Features.css";

function Features() {
  return (
    <div className="features-page">
      <div className="features-hero">
        <h1>Welcome Back Today!</h1>
        <p>Select a feature to continue.</p>
      </div>

      <div className="features-grid">
        <Link to="/dashboard" className="feature-tile">
          <div className="tile-icon">
            <i className="fas fa-thermometer-half"></i>
          </div>
          <h3>Real-Time Data</h3>
          <p>Check current weather instantly</p>
        </Link>

        <Link to="/forecast" className="feature-tile">
          <div className="tile-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Forecasts</h3>
          <p>View the weekly forecast</p>
        </Link>

        <Link to="/history" className="feature-tile">
          <div className="tile-icon">
            <i className="fas fa-history"></i>
          </div>
          <h3>Search History</h3>
          <p>Review your saved searches</p>
        </Link>
      </div>
    </div>
  );
}

export default Features;
