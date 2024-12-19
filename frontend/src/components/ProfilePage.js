import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Navigation
import "./ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
  }, []);

  // Fetch donation history
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/donation/user/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error.message);
      }
    };

    if (userData._id) fetchDonations();
  }, [userData._id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>

      {/* Main Content */}
      <div className="profile-layout">
        <div className="profile-card">
          {/* Profile Info */}
          <div className="profile-info">
            <img src={userData.image } alt="Profile" className="profile-pic" />
            <div className="user-details">
              <h2>{userData.first_name}</h2>
              <div className="profile-buttons">
                <button className="btn" onClick={() => navigate("/update-profile")}>⚙️ Update Profile</button>
                <button className="btn logout-btn" onClick={handleLogout}>🔒 Log-out</button>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="billing-info">
            <h3>BILLING ADDRESS</h3>
            <p><strong>{userData.first_name} {userData.last_name}</strong></p>
            <p>{userData.street_address}</p>
            <p>{userData.email}</p>
            <p>{userData.phone_number}</p>
          </div>
        </div>
      </div>

      {/* Donation History */}
      <div className="donation-history">
        <h3>Donation History</h3>
        <table>
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Project ID</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.donation_id}</td>
                <td>{donation.project_id?.title || "Unknown Project"}</td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td>${donation.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default ProfilePage;
