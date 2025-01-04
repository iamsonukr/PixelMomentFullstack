import React from 'react';
// import { a } from 'react-router-dom';
import './Footer.css'

const Footer = ({setMenu}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Pixel Moment</h3>
          <p>This is the admin panel for PixelMoment.vercel.app . Manage your bookings, employee .</p>
        </div>

        <div className="footer-section">
          <h3>Quick as</h3>
          <ul>
            <li><a to="/">Pixel Moment</a></li>
            <li><a to="/create" onClick={()=>setMenu('create')}>New bookings</a></li>
            <li><a to="/about">Manage Employees</a></li>
            <li><a to="/contact">Manage Website</a></li>
          </ul>
        </div>

        {/* <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><a to="/">New Bookings</a></li>
            <li><a to="/">Main Website</a></li>
            <li><a to="/">Travel</a></li>
            <li><a to="/">Food</a></li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-as">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://aedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-aedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} PixelMoments . All rights reserved.</p>
        <div className="footer-bottom-as">
          <a to="/privacy">Privacy Policy</a>
          <a to="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;