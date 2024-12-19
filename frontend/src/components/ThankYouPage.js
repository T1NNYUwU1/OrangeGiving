import React from "react";
import { Link } from "react-router-dom";
import "./ThankYouPage.css";

function ThankYou() {
  return (
    <div className="thank-you-page">
      <h1>Thank You For Your Donation</h1>
      <p>If there was any question, feel free to ask.</p>
      <div className="thank-you-actions">
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
        <Link to="/project" className="view-projects-btn">
          View More Projects
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;