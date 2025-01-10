import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src="src/images/long-logo.png"
            alt="Airbnb logo"
            className="logo"
          />
        </Link>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/experiences">Experiences</Link>
          </li>
          <li>
            <Link to="/online-experiences">Online Experiences</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="host-button">Airbnb your home</button>
        <button className="icon-button">
          <i className="fas fa-globe"></i>
        </button>

        <div className="profile-container" onClick={toggleDropdown}>
          <i className="fas fa-bars"></i>
          <img
            src="https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png"
            alt="User Profile"
            className="profile-avatar"
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login">
                <button>Log in</button>
              </Link>
              <Link to="/signup">
                <button>Sign up</button>
              </Link>
              <Link to="/profile">
                <button>Profile</button>
              </Link>
              <Link to="/adminpanel">
                <button>Admin Panel</button>
              </Link>
              <button>Help</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
