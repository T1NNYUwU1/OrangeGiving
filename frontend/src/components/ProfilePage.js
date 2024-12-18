import React, { useEffect, useState } from "react";
import axios from "axios";
import Nissan from "./Assets/Nissan.jpg";
import "./ProfilePage.css";

const ProfilePage = () => {
    const [userData, setUserData] = useState({});

    // Fetch user profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token"); // Assume token is stored in localStorage
                const response = await axios.get("http://localhost:5000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching profile data:", error.response?.data?.message || error.message);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="profile-layout">
            {/* Profile Card */}
            <div className="profile-card">
                <div className="profile-info">
                    <img
                        src={userData.image || Nissan}
                        alt="Profile"
                        className="profile-pic"
                    />
                    <div className="user-details">
                        <h2 className="username">{userData.first_name} {userData.last_name}</h2>
                        <div className="profile-buttons">
                            <button className="btn setting-btn">⚙️ Setting</button>
                            <button className="btn logout-btn">🔒 Log-out</button>
                        </div>
                    </div>
                </div>
                {/* Billing Address */}
                <div className="billing-info">
                    <h3>BILLING ADDRESS</h3>
                    <p><strong>{userData.first_name} {userData.last_name}</strong></p>
                    <p>{userData.street_address}</p>
                    <p>{userData.email}</p>
                    <p>{userData.phone_number}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
