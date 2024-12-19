import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AccountPage.css"; // Add styling as per your requirement
import "./AccountSetting.css";
import profileImg from "./Assets/GTRS.jpeg"; // Use a default placeholder image or user's uploaded one


function AccountSetting() {
  const [userData, setUserData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
        setUpdatedData(response.data.user); // Pre-fill the form with user data
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data);
        alert("Failed to load user profile.");
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Update user information
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/users/update-profile",
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating user profile:", error.response?.data);
      alert("Failed to update profile.");
    }
  };

  // Reset password
  const handleChangePassword = async () => {
    const { newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/reset-password",
        {
          email: userData.email,
          newPassword,
          confirmPassword,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error resetting password:", error.response?.data);
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="account-page">
      {/* Account Settings Section */}
      <section className="account-settings">
        <h2>Account Settings</h2>
        <div className="profile-container">
          <img
            src={profileImg}
            alt="Profile"
            className="profile-img"
          />
          <input type="file" className="change-image-btn" />
        </div>

        <form className="account-form">
          <input
            type="text"
            name="first_name"
            value={updatedData.first_name || ""}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            value={updatedData.last_name || ""}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={updatedData.email || ""}
            disabled
            placeholder="Email"
          />
          <input
            type="text"
            name="phone_number"
            value={updatedData.phone_number || ""}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="street_address"
            value={updatedData.street_address || ""}
            onChange={handleInputChange}
            placeholder="Street Address"
          />
          <input
            type="text"
            name="country"
            value={updatedData.country || ""}
            onChange={handleInputChange}
            placeholder="Country"
          />
          <input
            type="text"
            name="state"
            value={updatedData.state || ""}
            onChange={handleInputChange}
            placeholder="State"
          />
          <input
            type="text"
            name="postal_code"
            value={updatedData.postal_code || ""}
            onChange={handleInputChange}
            placeholder="Postal Code"
          />
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </form>
      </section>

      {/* Change Password Section */}
      <section className="change-password">
        <h2>Change Password</h2>
        <form className="password-form">
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm Password"
          />
          <button type="button" onClick={handleChangePassword}>
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
}

export default AccountSetting;
