import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <i className="fas fa-cloud-sun"></i>
        <span>Weather For You</span>
      </Link>
      <div className="nav-links">
        <Link to="/"><i className="fas fa-home"></i> Home</Link>
        {user && (
          <>
            <Link to="/features"><i className="fas fa-th-large"></i> Features</Link>
          </>
        )}
        <div className="profile-dropdown">
          <button 
            className="profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="fas fa-user-circle"></i>
            {user ? user.name : "Account"}
            <i className={`fas fa-chevron-down ${showDropdown ? "rotate" : ""}`}></i>
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <div className="dropdown-item user-info">
                    <i className="fas fa-user"></i>
                    <span>{user.name}</span>
                  </div>
                  <div className="dropdown-item user-info">
                    <i className="fas fa-envelope"></i>
                    <span>{user.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                  <Link to="/" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
