import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, loginForm);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/features"), 700);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${API_URL}/api/auth/register`, registerForm);
      const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
        email: registerForm.email,
        password: registerForm.password,
      });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/features"), 700);
      setRegisterForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">🌤️ Weather For You</h1>
          <p className="hero-subtitle">Your Personal Weather Companion</p>
          <p className="hero-description">Get real-time weather updates, forecasts, and track your search history</p>
        </div>
      </div>

      <div className="auth-section">
        <div className="auth-tabs">
          <button 
            className={`tab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
          <button 
            className={`tab-button ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            <i className="fas fa-user-plus"></i> Register
          </button>
        </div>

        <div className="auth-card">
          {activeTab === "login" ? (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-icon">
                <i className="fas fa-cloud-sun"></i>
              </div>
              <h2>Welcome Back!</h2>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <h2>Create Account</h2>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          )}

          {message && (
            <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;
