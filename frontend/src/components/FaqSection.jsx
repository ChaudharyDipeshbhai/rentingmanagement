import React from 'react';
import './styles/FaqSection.css';
import Navbar from './Navbar';  // Importing Navbar component

const FaqSection = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <section id="faq" className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h3>How can I manage my apartment?</h3>
            <p>
              As a manager, you can easily manage your apartments by adding or removing tenants, tracking rent payments, handling maintenance requests, and more.
            </p>
          </div>
          <div className="faq-item">
            <h3>What roles do users have?</h3>
            <p>
              The roles in the system include Admin, Manager, and Tenant. Each role has different access levels and responsibilities:
              <ul>
                <li><strong>Admin:</strong> Can manage all aspects of the platform, including user roles.</li>
                <li><strong>Manager:</strong> Can manage apartments, tenants, and maintenance requests.</li>
                <li><strong>Tenant:</strong> Can view and manage their apartment details, make payments, and submit maintenance requests.</li>
              </ul>
            </p>
          </div>
          <div className="faq-item">
            <h3>How do I make a payment?</h3>
            <p>
              Tenants can make payments through the payment management section in their dashboard. You can choose to pay through bank transfer, credit card, or other online payment methods integrated into the platform.
            </p>
          </div>
          <div className="faq-item">
            <h3>How do I submit a maintenance request?</h3>
            <p>
              Tenants can submit maintenance requests directly from their dashboard. Simply navigate to the "Maintenance Requests" section and fill out the necessary details.
            </p>
          </div>
          <div className="faq-item">
            <h3>How can I view my apartment details?</h3>
            <p>
              As a tenant, you can view your apartment details such as rent payment history, upcoming dues, and maintenance requests directly from your dashboard.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
