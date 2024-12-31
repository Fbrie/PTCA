import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      {/* Header Section */}
      <header className="PTCW">
        <img src="/logo.svg" alt="App Logo" className="App-logo" />
        <h1>Welcome to PTCW</h1>
        <p>
          Bridging the gap between parents and teachers with seamless communication and progress tracking.
        </p>
        <nav className="App-nav">
          <a className="App-link" href="/login">
            Login
          </a>
          <a className="App-link" href="/register">
            Register
          </a>
          <a className="App-link" href="/about">
            Learn More
          </a>
        </nav>
      </header>

      {/* Routing Section */}
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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




