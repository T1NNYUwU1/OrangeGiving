import React from 'react';
import './Community.css'; // Import the CSS file for styles

const Community = () => {
  return (
    <section className="community">
      <div className="community-content">
        <h1 className="brand">OrangeGive</h1>
        <h2 className="headline">Join our community</h2>
        <div className="icons">
          <a href="https://www.facebook.com/share/p/18QqNowtvs/" target="_blank" rel ="noopener noreferrer"><span className="icon">📘</span></a>
          <a href="https://www.instagram.com/0rangegive/" target="_blank" rel="noopener noreferrer"><span className="icon">📸</span></a>
          <span className="icon">❌</span>
          <span className="icon">💼</span>
          <span className="icon">🎮</span>
          <span className="icon">📌</span>
        </div>
        <p className="copyright">©2024, All Right Reserved.</p>
      </div>
    </section>
  );
};

export default Community;
