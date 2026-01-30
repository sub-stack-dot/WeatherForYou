import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">WeatherApp</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
         <Link to="/dashboard">Dashboard</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
