import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./LoginForm.css";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to track error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      // Store Token
      localStorage.setItem("token", response.data.token);
      login(); // Update Context
      navigate("/"); // Redirect to Home Page
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || "Error");
      // Set error message instead of using alert
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h3 className="form-title">Get start</h3>
      <div className="form-content">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-options">
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p className="register-link">
            Don’t have an account?{" "}
            <Link to="/signup" className="register-btn">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
