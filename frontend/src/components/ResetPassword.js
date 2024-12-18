import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import "./ResetPassword.css";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const email = location.state?.email || ""; // Get email from state

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    try {
      // Retrieve the token from localStorage (or another source)
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Unauthorized - please log in again.");
        navigate("/login");
        return;
      }
  
      // Call the reset-password API with the token
      const response = await axios.post(
        "http://localhost:5000/users/reset-password",
        {
          email,
          otp,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
  
      alert(response.data.message); // Notify success
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error resetting password:", error.response?.data.message);
      alert(error.response?.data.message || "Failed to reset password. Please try again.");
    }
  };
  

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="change-password-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
