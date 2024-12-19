import React from 'react';
import Community from './Assets/HomeAssetfile/Community';
import Hero from './Assets/HomeAssetfile/Hero';
import HowItWorks from './Assets/HomeAssetfile/HowItWorks';
import './HomePage.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <HowItWorks />
      <Community />
    </div>
  );
}

export default App;
