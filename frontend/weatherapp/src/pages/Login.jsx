import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Login successful! Redirecting...");

      // Save token and user info.
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => navigate("/features"), 700);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed ❌. Please try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back!</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      <p className="auth-footer">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>

      {/* Social Icons */}
      <div className="social-icons">
        <i className="fab fa-google"></i>
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
      </div>
    </div>
  );
}

export default Login;
