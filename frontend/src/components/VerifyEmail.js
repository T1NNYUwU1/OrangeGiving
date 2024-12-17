
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/verify-email", {
        email,
        otp,
      });

      alert(response.data.message);
      navigate("/"); // Redirect to Login page
    } catch (error) {
      console.error("Error verifying email:", error.response?.data.message);
      alert(error.response?.data.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="verify-email-container">
    <div className="verify-email-form">
      <h3 className="form-title">Verify Email</h3>
      <form onSubmit={handleConfirm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" className="confirm-btn">
          Confirm
        </button>
      </form>
    </div>
  </div>
  );
}

export default VerifyEmail;
