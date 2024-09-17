import React from 'react';
import './App.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <ul className="footer-links">
            <li><a href="/terms">Terms Of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
          <p>© 2024 YourCompany</p>
        </div>
        <div className="footer-right">
          <div className="newsletter">
            <h3>Subscribe to the latest Deals</h3>
            <input type="email" placeholder="Enter your email to sign up" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaGithub />
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
