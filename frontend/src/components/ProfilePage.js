import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [donationHistory, setDonationHistory] = useState([]);

  // Fetch user data and donation history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized. Please log in again.");
          navigate("/login");
          return;
        }

        // Fetch user data
        const userResponse = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data.user);

        // Fetch donation history
        try {
          const historyResponse = await axios.get("http://localhost:5000/donations/donation-history", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDonationHistory(historyResponse.data.donations);
        } catch (error) {
          console.error("Error fetching donation history:", error.response?.data || error.message);
          alert("Failed to load donation history.");
        }
      } catch (error) {
        console.error("Global fetch error:", error.message);
        alert("Failed to load account data.");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="account-page">
      {/* Profile Section */}
      <section className="profile-section">
        <div className="profile-card">
          <img
            src={`http://localhost:5000${userData.profileImage || "/images/default_profile.png"}`}
            alt="User"
            className="profile-img"
          />
          <h2 className="profile-name">{userData.first_name} {userData.last_name}</h2>
          <div className="profile-actions">
            <button
              className="btn setting-btn"
              onClick={() => navigate("/home/profile/account-setting")}
            >
              ⚙️ Setting
            </button>
            <button className="btn logout-btn" onClick={handleLogout}>
              Log-out
            </button>
          </div>
        </div>
        <div className="address-card">
          <h4 className="address-title">Billing Address</h4>
          <p>
            <strong>{userData.first_name} {userData.last_name}</strong>
          </p>
          <p>{userData.street_address}, {userData.state}, {userData.country} {userData.postal_code}</p>
          <p>{userData.email}</p>
          <p>{userData.phone_number}</p>
        </div>
      </section>

      {/* Donation History Section */}
      <section className="donation-history">
        <h3>Donation History</h3>
        <table className="donation-table">
          <thead>
            <tr>
              <th>DONATION ID</th>
              <th>PROJECT ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((donation, index) => (
              <tr key={index}>
                <td>{donation.donationId}</td>
                <td>{donation.projectId}</td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td><strong>${donation.total.toFixed(2)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
