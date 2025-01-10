// File: controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Config/db');

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || '';

// ✅ Register a new user
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log(`[REGISTER] Received data:`, { username, email, role }); // Log request data

  if (!username || !email || !password || !role) {
    console.warn('[REGISTER] Missing required fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      console.warn(`[REGISTER] User with email ${email} already exists`);
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    await db.promise().query(query, [username, email, hashedPassword, role]);

    console.log(`[REGISTER] User ${email} registered successfully`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('[REGISTER] Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(`[LOGIN] Attempting login for email: ${email}`); // Log request

  if (!email || !password) {
    console.warn('[LOGIN] Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists
    const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      console.warn(`[LOGIN] User with email ${email} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    console.log(`[LOGIN] User found: ${user.username}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn(`[LOGIN] Invalid credentials for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`[LOGIN] Login successful for email: ${email}`);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('[LOGIN] Error during login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Protected route to get user profile
const getProfile = (req, res) => {
  console.log(`[PROFILE] Fetching profile for user: ${req.user.username}`);
  res.json({ message: 'Profile fetched successfully', user: req.user });
};

module.exports = {
  register,
  login,
  getProfile,
};
