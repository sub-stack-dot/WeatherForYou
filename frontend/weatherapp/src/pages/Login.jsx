import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(res.data.message);

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log(res);
      alert(res.data.message || "Login successful ✅");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed ❌. Please try again.";
      setMessage(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back!</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />
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
