import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to 
निवासम्
</h1>
        <p>Your gateway to seamless apartment management</p>
        <Link to="/login" className="cta-btn">Get Started</Link>
      </div>
    </section>
  );
};

export default HeroSection;
