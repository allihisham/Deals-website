import React from 'react';
import { FaGem } from 'react-icons/fa';
import './App.css';

function Navbar() {
    return (
      <div className="navbar-container">
        <nav className="navbar">
          <ul className="navbar-menu">
            <li className="navbar-item"><a href="/">Home</a></li>
            <li className="navbar-item"><a href="/simdeals">Sim Deals</a></li>
            <li className="navbar-item"><a href="/mobiledeals">Mobile Deals</a></li>
            <li className="navbar-logo">
              <FaGem size={40} color="#FF6347" />
            </li>
            <li className="navbar-item"><a href="/blog">Blog</a></li>
            <li className="navbar-item"><a href="/contacts">Contacts</a></li>
            <li className="navbar-item"><a href="/about">About</a></li>
          </ul>
        </nav>
      </div>
    );
  }

export default Navbar;
