import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaHome, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import './styles/NavbarMT.css';

const Navbar = ({ userRole, userInfo }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [username, setUsername] = useState('N/A');
  const [email, setEmail] = useState('N/A');
  const navigate = useNavigate();

  useEffect(() => {
    // Set the initial values for username and email from userInfo
    if (userInfo) {
      setUsername(userInfo.name || 'N/A');
      setEmail(userInfo.email || 'N/A');
    }
  }, [userInfo]);

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = () => {
    alert('Logging out...');
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  const handleUsernameChange = () => {
    if (emailInput === email) {
      setUsername(newUsername);
      alert('Username updated successfully!');
    } else {
      alert('Email does not match our records. Please try again.');
    }
  };

  const renderRoleSpecificLinks = () => {
    if (userRole === 'manager') {
      // return (
      //   <>
      //     {/* <li>
      //       <Link to="/manage-apartments">
      //         <FaTasks /> Manage Apartments
      //       </Link>
      //     </li>
      //     <li>
      //       <Link to="/view-requests">
      //         <FaTasks /> View Requests
      //       </Link>
      //     </li>
      //   </> */}
      // );
    } else if (userRole === 'tenant') {
      // return (
      //   <>
      //     <li>
      //       <Link to="/view-apartments">
      //         <FaHome /> View Apartments
      //       </Link>
      //     </li>
      //     <li>
      //       <Link to="/submit-request">
      //         <FaTasks /> Submit Request
      //       </Link>
      //     </li>
      //   </>
      // );
    }else if (userRole === 'admin') {
      // return (
      //   <>
      //     <li>
      //       <Link to="/view-users">
      //         <FaUsers /> View Users
      //       </Link>
      //     </li>
      //   </>
      // );
      }
      // return null;
    return null;
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Apartment Management</h2>
      </div>

      <ul className="navbar-links">
        {renderRoleSpecificLinks()}
      </ul>

      <div className="navbar-profile">
        <FaUserCircle className="profile-icon" onClick={handleProfileToggle} />
        {isProfileOpen && (
          <div className="profile-dropdown">
            <p><strong>Current Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {userRole || 'N/A'}</p>
            <div className="update-username">
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button onClick={handleUsernameChange}>Update Username</button>
            </div>
            <button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
