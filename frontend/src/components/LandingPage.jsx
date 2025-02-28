import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesOverview from './FeaturesOverview';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import HelpSection from './HelpSection';
import FaqSection from './FaqSection';

import './styles/LandingPage.css';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero'); // Default section

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSection />;
      case 'features':
        return <FeaturesOverview />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      case 'help':
        return <HelpSection />;
      case 'faq':
        return <FaqSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="landing-page">
      <Navbar setActiveSection={setActiveSection} /> {/* Pass the function to Navbar */}
      {renderSection()} {/* Render the active section */}
    </div>
  );
};

export default LandingPage;

// import Navbar from './Navbar';
// return (
//   <div className="landing-page">
//     <Navbar setActiveSection={setActiveSection} /> {/* Pass the function to Navbar */}
//     {renderSection()} {/* Render the active section */}
//   </div>
// );