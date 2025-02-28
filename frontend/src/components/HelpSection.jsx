import React from 'react';
import './styles/HelpSection.css';
import Navbar from './Navbar';  // Import Navbar correctly

const HelpSection = () => {
  return (
    <>
      {/* Add Navbar here to ensure it's included at the top */}
      <Navbar />

      <section id="help" className="help-section">
        <div className="help-container">
          <h2>Help & Support</h2>
          <p>We're here to assist you with any issues or queries you might have.</p>

          <div className="help-options">
            <div className="help-card">
              <h3>For Tenants</h3>
              <ul>
                <li>
                  <a href="#report-issue">Report a Maintenance Issue</a>
                </li>
                <li>
                  <a href="#make-payment">Make a Rent Payment</a>
                </li>
                <li>
                  <a href="#lease-queries">Lease Agreement Queries</a>
                </li>
              </ul>
            </div>

            <div className="help-card">
              <h3>For Managers</h3>
              <ul>
                <li>
                  <a href="#tenant-requests">Manage Tenant Requests</a>
                </li>
                <li>
                  <a href="#unit-management">Apartment Unit Management</a>
                </li>
                <li>
                  <a href="#reports">Generate Reports</a>
                </li>
              </ul>
            </div>

            <div className="help-card">
              <h3>For Admins</h3>
              <ul>
                <li>
                  <a href="#user-management">User Role Management</a>
                </li>
                <li>
                  <a href="#settings">Application Settings</a>
                </li>
                <li>
                  <a href="#security">Security and Permissions</a>
                </li>
              </ul>
            </div>
          </div>

          <p className="contact-note">
            Still need help? Contact us at <a href="mailto:support@apartmenthub.com">support@apartmenthub.com</a> or call <strong>+123 456 7890</strong>.
          </p>
        </div>
      </section>
    </>
  );
};

export default HelpSection;
