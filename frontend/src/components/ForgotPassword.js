import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the forgot-password API
      const response = await axios.post("http://localhost:5000/users/forgot-password", {
        email,
      });

      alert(response.data.message); // Notify user that OTP was sent
      navigate("/forget-password/reset-password", { state: { email } }); // Pass email to the reset-password page
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data.message);
      alert(error.response?.data.message || "Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="send-otp-btn">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
