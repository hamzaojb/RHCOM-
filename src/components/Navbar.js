// src/components/Navbar.js
import React from 'react';
import '../css/Navbar.css'; // Si tu as un fichier CSS pour la navbar
import { useNavigate } from 'react-router-dom'; // Assurez-vous que cet import est présent





const Navbar = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token'); // Assurez-vous que le token est stocké avec cette clé
    navigate('/'); // Rediriger vers la page de connexion
  };
  return (
    <div className="navbarr">
       <h3 > HRCOM</h3>    
    <nav className="navbar">
      <a href="/home">Employees</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
      <button onClick={handleLogout}>Déconnexion</button>

    </nav>
    <footer className='footer'>Copyright 2025 , HRCOM</footer>
    </div>
  );
};

export default Navbar;
