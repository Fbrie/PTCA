// File: routes/login.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Config/db');

const router = express.Router();

// Ensure JWT_SECRET is properly set
const JWT_SECRET = process.env.JWT_SECRET || 'a16e0750ae72c339250ab2f728c20246c0c99b265629f5a75d39db8928f9411c';

// ✅ POST /api/login - Login a user
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log(`[LOGIN] Attempting login for email: ${email}`);

  if (!email || !password) {
    console.warn('[LOGIN] Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Query the database to find the user
    const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      console.warn(`[LOGIN] User with email ${email} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    console.log(`[LOGIN] User found: ${user.username}`);

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn(`[LOGIN] Invalid credentials for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`[LOGIN] Login successful for email: ${email}`);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('[LOGIN] Error during login:', error);
    console.log(err)
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

