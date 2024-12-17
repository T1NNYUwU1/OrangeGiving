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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Update context and Redirect
      login();
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || "Error");
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3 className="form-title">Get start</h3>
        <div className="form-content">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          <p className="register-link">
            Don’t have an account?{" "}
            <Link to="/signup" className="create-account-link">
              Create account
            </Link>
          </p>
        </div>
      </div>
      <footer className="footer">
        <p>OrangeGive &copy; 2024. All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default LoginForm;
