import React, { useState } from 'react';
import './Navbar.css';
import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import toogle_light from '../../assets/night.png';
import toogle_dark from '../../assets/day.png';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: theme === 'light' ? '#fff' : '#333' }}
    >
      <div className="container-fluid">
        <img
          src={theme === 'light' ? logo_light : logo_dark}
          alt="logo"
          className="navbar-brand"
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <CustomLink to="/" onClick={toggleNavbar}>Home</CustomLink>
            <CustomLink to="/QrGenerator" onClick={toggleNavbar}>QrGenerator</CustomLink>
            <CustomLink to="/Feedback" onClick={toggleNavbar}>Feedback</CustomLink>
            <CustomLink to="/About" onClick={toggleNavbar}>About</CustomLink>
          </ul>
        </div>

        <img
          onClick={toggle_mode}
          src={theme === 'light' ? toogle_light : toogle_dark}
          alt="toggle icon"
          className="toggleicon"
        />
      </div>
    </nav>
  );
};

const CustomLink = ({ to, children, onClick, ...props }) => {
  const path = window.location.pathname;
  return (
    <li className={`nav-item ${path === to ? 'active' : ''}`}>
      <Link to={to} className="nav-link" onClick={onClick} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default Navbar;
