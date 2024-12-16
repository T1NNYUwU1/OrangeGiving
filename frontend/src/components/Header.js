import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="orange-text">Orange</span>Give
      </div>
      <nav className="nav-buttons">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Projects</button>
      </nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by keyword"
          className="search-input"
        />
        <button className="search-btn">🔍</button>
      </div>
      <div className="header-icons">
        <button className="icon-btn">
          <i>🤝</i>
        </button>
      </div>
      <button className="login-btn">Log in</button>
    </header>
  );
}

export default Header;
