import axios from "axios"; // Import Axios
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

      // เก็บ Token ใน localStorage
      localStorage.setItem("token", response.data.token);

      // อัปเดต context และ Redirect ไปยัง Home
      login();
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || "Error");
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
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
      </div>
    </div>
  );
}

export default LoginForm;
