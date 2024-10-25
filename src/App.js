// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './model/Home';
import Login from './model/Login';
import Signup from './model/Signup';

const App = () => {
  const token = localStorage.getItem('token'); // Vérifier la présence du token

  return (
    <Router>
      <Routes>
        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} /> {/* Redirection vers Login si pas de token */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
