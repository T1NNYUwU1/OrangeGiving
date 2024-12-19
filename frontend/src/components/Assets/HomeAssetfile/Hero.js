import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="images">
        <img src="/path-to-image1.jpg" alt="Happy person" />
        <img src="/path-to-image2.jpg" alt="Helping children" />
        <img src="/path-to-image3.jpg" alt="Volunteers working" />
      </div>
      <div className="text">
        <h1>Give Hope</h1>
        <h2>Change Lives</h2>
        <p>
          Join our mission to make the world a better place through giving and volunteering.
        </p>
      </div>
    </section>
  );
}

export default Hero;
