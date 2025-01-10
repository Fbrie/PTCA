// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import global styles
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/profile';
import TestApi from './Components/TestApi';
import PTCWLogo from './PTCWLogo'; // Import the logo component
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      {/* Header Section */}
      <header className="PTCW">
        <PTCWLogo size={150} className="PTCW-logo" /> {/* Logo Component */}
        <h1>Welcome to PTCW</h1>
        <p>
          Bridging the gap between parents and teachers with seamless communication and progress tracking.
        </p>
        
        {/* Navigation Section */}
        <nav className="App-Navbar">
        <Navbar />

        <Link to="/profile">Profile</Link> {/* Add a link to /profile */}
          <Link className="App-link" to="/login">
            Login

          </Link>
          <Link className="App-link" to="/register">
            Register

          </Link>
          <Link className="App-link" to="/about">
            Learn More

          </Link>
          <Link className="App-link" to="/test-api">
            Test API

          </Link>
        </nav>
      </header>

      {/* Routing Section */}
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/about"
            element={
              <section>
                <h2>About PTCW</h2>
                <p>
                  PTCW (Parent Teacher Communicating Website) is a platform designed to enhance collaboration
                  between parents and teachers. Track student progress, schedule meetings, and communicate effortlessly.
                </p>
              </section>
            }
          />
          <Route path="/test-api" element={<TestApi />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <footer className="App-footer">
        <p>© 2024 PTCW. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;


