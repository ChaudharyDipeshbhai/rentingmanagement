import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaQuestionCircle, FaPhoneAlt, FaInfoCircle, FaMap, FaRobot, FaChartLine } from 'react-icons/fa';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
        <img src="/निवासम्.png" alt="Apartment Hub Logo" className="logo-image" />
        </Link>
      </div>
      <h2>निवासम् </h2>

      <ul className="nav-links">
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/about"><FaInfoCircle /> About Us</Link></li>
        <li><Link to="/contact"><FaPhoneAlt /> Contact Us</Link></li>
        <li><Link to="/help"><FaQuestionCircle /> Help</Link></li>
        <li><Link to="/faq"><FaQuestionCircle /> FAQ</Link></li>
        <li><Link to="/map"><FaMap /> Map</Link></li>
        <li><Link to="/chat"><FaRobot /> Chat</Link></li>
        <li><Link to="/category-selector"><FaChartLine /> Category</Link></li>
        <li><Link to="/login"><FaUserAlt /> Login</Link></li>
      
      </ul>
    </nav>
  );
};

export default Navbar;
