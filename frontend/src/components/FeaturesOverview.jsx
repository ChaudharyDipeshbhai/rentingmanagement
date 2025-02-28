import React from 'react';
import { FaHome, FaUserAlt, FaQuestionCircle } from 'react-icons/fa';
import './styles/FeatureOverview.css';

const FeaturesOverview = () => {
  return (
    <section className="overview">
      <h2>Features Overview</h2>
      <div className="cards-container">
        <div className="card">
          <FaHome size={40} />
          <h3>Manage Apartments</h3>
          <p>Easily manage tenants and apartments at your fingertips.</p>
        </div>
        <div className="card">
          <FaUserAlt size={40} />
          <h3>User Dashboard</h3>
          <p>Access personalized dashboards for tenants, managers, and admins.</p>
        </div>
        <div className="card">
          <FaQuestionCircle size={40} />
          <h3>Help & Support</h3>
          <p>24/7 support for all your queries and assistance.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
