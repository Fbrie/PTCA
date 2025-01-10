// File: src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State variables for input fields and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Handler function for the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }

    setLoading(true); // Start loading spinner
    try {
      // ✅ Log the start of the API call
      console.log('[LOGIN] Making API call to /api/auth/login');

      // Make the API request to the login endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response as JSON
      const data = await response.json();

      // ✅ Log the response data
      console.log('[LOGIN] Response:', data);

      if (response.ok) {
        // If login is successful, show success message
        alert(data.message);

        // ✅ After successful login, make a call to the /profile endpoint
        console.log('[LOGIN] Fetching user profile...');
        const profileResponse = await fetch('http://localhost:5000/profile');
        const profileData = await profileResponse.json();

        // ✅ Log the profile response
        console.log('[LOGIN] Profile Response:', profileData);

        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        // If login fails, show an error message
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      // Log any error that occurs during the API call
      console.error('[LOGIN] Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  };

  // Render the login form
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;

