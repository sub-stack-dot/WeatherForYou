import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"; // Import CSS

function Register() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });


      const data = await res.json();

      if (!res.ok) {
        // Show backend error message
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage(data.message || "Registered successfully!");
        setForm({ name: "", email: "", password: "" }); // reset form
      }
    } catch (err) {
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register for Weather For You !</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
