import React from 'react';
import './styles/AboutSection.css';
import Navbar from './Navbar'; // Import the Navbar component
import { FaTools, FaUserTie, FaHeadset, FaLock } from 'react-icons/fa'; // Import icons

const AboutSection = () => {
  const features = [
    {
      icon: <FaTools />,
      title: 'Efficient Management',
      description: 'Handle tenant details, maintenance requests, and rent payments effortlessly.',
    },
    {
      icon: <FaUserTie />,
      title: 'Role-Based Dashboards',
      description: 'Tailored interfaces for tenants, managers, and administrators.',
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Dedicated support to ensure your queries are resolved promptly.',
    },
    {
      icon: <FaLock />,
      title: 'Secure Transactions',
      description: 'Blockchain-backed payment systems for safe and transparent financial management.',
    },
  ];

  return (
    <>
      <Navbar /> {/* Add the Navbar at the top */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            Welcome to <strong>Apartment Hub</strong>, your trusted partner in seamless apartment management.
            Our platform is designed to empower tenants, managers, and admins with the tools they need to create
            a hassle-free living experience.
          </p>
          <div className="features-cards">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="card-icon">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
              </div>
            ))}
          </div>
          <p className="about-closing">
            Join us in redefining apartment management and discover how we can simplify your living experience.
          </p>
          <button className="cta-button" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
            Learn More
          </button>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
