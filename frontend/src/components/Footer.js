import React from "react";
import img1 from "./Assets/1.jpg";
import img2 from "./Assets/2.jpg";
import img3 from "./Assets/3.jpg";
import img4 from "./Assets/4.jpg";
import img5 from "./Assets/5.jpg";
import img6 from "./Assets/6.jpg";
import DCV from "./Assets/DCV.png";
import MC from "./Assets/mc.png";
import PP from "./Assets/pp.png";
import VS from "./Assets/vs.png";
import "./Footer.css";
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
          <img src={img1} alt="1" />
          <img src={img2} alt="2" />
          <img src={img3} alt="3" />
          <img src={img4} alt="4" />
          <img src={img5} alt="5" />
          <img src={img6} alt="6" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>OrangeGive © 2024. All Rights Reserved</p>
        <div className="payment-icons">
          <img src={PP} alt="PromptPay" />
          <img src={VS} alt="VISA" />
          <img src={DCV} alt="Discover" />
          <img src={MC} alt="Mastercard" />
          <span className="secure-payment">🔒 Secure Payment</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;