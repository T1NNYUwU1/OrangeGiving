import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <h3>Nonprofits</h3>
          <p>Nonprofits around the world use our platform...</p>
        </div>
        <div className="step">
          <h3>Donors</h3>
          <p>People like you give to great causes...</p>
        </div>
        <div className="step">
          <h3>Companies</h3>
          <p>We collaborate with companies...</p>
        </div>
        <div className="step">
          <h3>Our Impact</h3>
          <p>Nonprofits track the funding they receive...</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
