import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import CSS

function Register() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      setMessage("Registered successfully! Redirecting...");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/features"), 700);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register for Weather For You !</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login here</Link>
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

export default Register;
