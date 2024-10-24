// src/model/Home.js
import React from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar'; // Assure-toi que le chemin est correct

const Home = () => {
  return (
    <div className="home-container">
      <div className="left">
        <Navbar /> {/* Utilisation du composant Navbar */}
      </div>
      <div className="right">
        <h1>Right Section</h1>
      </div>
    </div>
  );
};

export default Home;
