import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './model/Home';
import Login from './model/Login';
import Signup from './model/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
