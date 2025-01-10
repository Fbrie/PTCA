// Routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db= require('../Config/db');
const authController = require('../Controllers/authController');
const verifyToken = require('../Middleware/authMiddleware');
const jwt = require('jsonwebtoken');


router.post('/login', authController.login);

// Register Endpoint
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  router.post('/register', (req, res) => {
    res.send('Register endpoint is working!');
  });

  // Validate input
  if (!username || !email || !password || !role) {
    console.log('❌ Missing fields in the request body:', req.body);
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL Query to insert user
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';

    // Execute the query
    db.query(sql, [username, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error('❌ Database insert error:', err);
        console.log(err)
        return res.status(500).json({ message: 'user already exists' });
      }

      console.log('✅ User registered successfully:', result);
      res.status(201).json({ message: 'User registered successfully!'  });
    });
  } catch (error) {
    console.error('❌ Password hashing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Secure Profile Route
router.get('/profile', verifyToken, (req, res) => {
    console.log(`[PROFILE] Profile request for: ${req.user.username}`);
    res.json({ message: 'Profile fetched successfully', user: req.user });
  });

  const users = [
    {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
      role: 'Admin',
    },
  ];
  
  // Login route
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    // Log the token
    console.log('Generated Token:', token);
  
    // Return the token to the client
    res.json({ token });
  });
  

module.exports = router;

