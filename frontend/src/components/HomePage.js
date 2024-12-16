import React from "react";
import GTRS from './Assets/GTRS.jpeg';
import Nissan from './Assets/Nissan.jpg';
import WorldMap from './Assets/WRLDMP.jpg';
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header Component */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Give Hope</h1>
          <p>Change Lives</p>
          <p>
            Join our mission to make a real difference in the lives of people
            worldwide.
          </p>
        </div>
        <div className="hero-images">
          <img src={Nissan} alt="Image 1" />
          <img src={Nissan} alt="Image 2" />
          <img src={Nissan} alt="Image 3" />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="featured-card">
          <img src={GTRS} alt="Project 1" />
          <p>Hurricane Milton Relief Fund</p>
        </div>
        <div className="featured-card">
          <img src={GTRS} alt="Project 2" />
          <p>GlobalSchooling Gift Fund</p>
        </div>
        <div className="featured-card">
          <img src={GTRS} alt="Project 3" />
          <p>Immediate Crisis Relief Fund</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <p>Nonprofits create projects and request funding.</p>
            <h4>NONPROFITS</h4>
          </div>
          <div className="step">
            <p>You give to projects that inspire you and make a donation.</p>
            <h4>DONORS</h4>
          </div>
          <div className="step">
            <p>Companies can match donations and fund impactful projects.</p>
            <h4>COMPANIES</h4>
          </div>
          <div className="step">
            <p>Your funding helps achieve life-changing goals.</p>
            <h4>OUR IMPACT</h4>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat">
          <h3>$957M</h3>
          <p>DOLLARS</p>
        </div>
        <div className="stat">
          <h3>1,884,906</h3>
          <p>DONORS</p>
        </div>
        <div className="stat">
          <h3>38,356</h3>
          <p>PROJECTS</p>
        </div>
        <div className="stat">
          <h3>175+</h3>
          <p>COUNTRIES</p>
        </div>
      </section>

      {/* World Map Section */}
      <section className="world-map">
        <img src={WorldMap} alt="WorldMap" />
      </section>


      {/* Join Community Section */}
      <section className="community-section">
        <h2>Join our community</h2>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-pinterest"></i>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="footer">

      </footer>
    </div>
  );
};

export default HomePage;
