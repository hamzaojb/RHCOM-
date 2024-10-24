// src/components/Navbar.js
import React from 'react';
import '../css/Navbar.css'; // Si tu as un fichier CSS pour la navbar




const Navbar = () => {
  return (
    <div className="navbarr">
       <h3 > HRCOM</h3>    
    <nav className="navbar">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
    <footer className='footer'>Copyright 2025 , HRCOM</footer>
    </div>
  );
};

export default Navbar;
