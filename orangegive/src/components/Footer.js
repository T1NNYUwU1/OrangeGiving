import React from "react";
import "./Footer.css"; // Import Footer-specific styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section about">
        <h4 className="logo">
          <span className="orange-text">Orange</span>Give
        </h4>
        <p className="about-text">
          OrangeGive makes it easy and safe for you to give to local projects,
          while providing nonprofits with the tools, training, and support they
          need to thrive.
        </p>
        <div className="social-icons">
          <span>🔗</span>
          <span>📷</span>
          <span>❌</span>
          <span>💼</span>
          <span>🎯</span>
        </div>
      </div>
      <div className="footer-section">
        <h5>My Account</h5>
        <ul>
          <li>My Account</li>
          <li className="highlighted">Donation Cart</li>
          <li>Donation History</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Helps</h5>
        <ul>
          <li>Terms & Condition</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Proxy</h5>
        <ul>
          <li>Projects</li>
          <li>Themes</li>
          <li>Locations</li>
        </ul>
      </div>
      <div className="footer-section instagram">
        <h5>Instagram</h5>
        <div className="footer-images">
          <img src="https://via.placeholder.com/50" alt="1" />
          <img src="https://via.placeholder.com/50" alt="2" />
          <img src="https://via.placeholder.com/50" alt="3" />
          <img src="https://via.placeholder.com/50" alt="4" />
          <img src="https://via.placeholder.com/50" alt="5" />
          <img src="https://via.placeholder.com/50" alt="6" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>OrangeGive © 2024. All Rights Reserved</p>
        <div className="payment-icons">
          <img src="https://via.placeholder.com/50x25" alt="PromptPay" />
          <img src="https://via.placeholder.com/50x25" alt="VISA" />
          <img src="https://via.placeholder.com/50x25" alt="Discover" />
          <img src="https://via.placeholder.com/50x25" alt="Mastercard" />
          <span className="secure-payment">🔒 Secure Payment</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
