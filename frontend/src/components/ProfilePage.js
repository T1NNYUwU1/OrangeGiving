import React from "react";
import Nissan from "./Assets/Nissan.jpg";
import "./ProfilePage.css";

const ProfilePage = () => {
    return(
        <div className="layout-box">
            <div class="profile-container">
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="profile-title">
                            <div className="picture-container">
                            <img src={Nissan} alt="Profile Picture" className="profile-pic"/>
                            </div>
                            <div className="profile-name">
                                <h2>TIN SOGAY</h2>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button class="btn setting-btn">
                            Setting
                        </button>
                        <button class="btn logout-btn">
                            Log-out
                        </button>
                    </div>
                </div>
                <div className="profile-stats">
                    <div className="text-container">
                        <h3>Billing Address</h3>
                        <p><strong>TIN SOGAY</strong></p>
                        <p>Silom RD. Allentown, New Mexico 31134</p>
                        <p>tinnaptgaygay69@gmail.com</p>
                        <p>(671) 555-0110</p>
                    </div>
                </div>
            </div>
            <div className="donation-container">
            <h3>Donation History</h3>
            </div>
        </div>
    )
}

export default ProfilePage;