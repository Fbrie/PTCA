// src/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <a href="/login">Login</a>
        </li>
        
        <li>
          <a href="/register">Register</a>
        </li>
        
        <li>
          <a href="/about">Learn More</a>
        </li>
        
        <li>
          <a href="/test-api">Test API</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

