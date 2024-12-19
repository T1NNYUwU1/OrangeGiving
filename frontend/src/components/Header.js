import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Header.css";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavigation("/")}>
        <span className="orange-text">Orange</span>Give
      </div>
      <nav className="nav-buttons">
        <button
          className={`nav-btn ${isActive("/home")}`}
          onClick={() => handleNavigation("/home")}
        >
          Home
        </button>
        <button
          className={`nav-btn ${isActive("/project")}`}
          onClick={() => handleNavigation("/project")}
        >
          Projects
        </button>
      </nav>

      {isLoggedIn ? (
        <div className="header-icons">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🤝</button>
          <button className="icon-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="login-btn" onClick={() => handleNavigation("/login")}>
          Log in
        </button>
      )}
    </header>
  );
}

export default Header;
