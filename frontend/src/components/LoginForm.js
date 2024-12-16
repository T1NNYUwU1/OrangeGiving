import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginForm.css"; // Import LoginForm-specific styles

function LoginForm() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    navigate("/home"); // Navigate to the Home Page
  };

  return (
    <div className="login-form">
      <h3 className="form-title">Get start</h3>
      <div className="form-content">
        <h4>Login</h4>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="forgot-password">
              Forget Password
            </a>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p>
            Don’t have an account? <a href="/">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
