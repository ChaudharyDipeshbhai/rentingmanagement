import React from 'react';
import './styles/ContactSection.css';
import Navbar from './Navbar';

const ContactSection = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-description">
          Have questions or need assistance? Our team is here to help! Reach out to us via email, phone, or visit our office.
        </p>
        <div className="contact-info">
          <p><strong>Email:</strong> support@apartmenthub.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Office Address:</strong> 123 Apartment Hub Avenue, Suite 400, Cityville</p>
        </div>
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
        <div className="social-links">
          <h3>Follow Us</h3>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
