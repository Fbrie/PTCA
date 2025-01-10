// File: routes/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Config/db');

const router = express.Router();

// ✅ POST /api/register - Register a new user
router.post('/', async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log(`[REGISTER] Received registration data:`, { username, email, role }); // Log the request data

  if (!username || !email || !password || !role) {
   // console.warn('[REGISTER] Missing required fields');//
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
    console.log(error)
    console.error('[REGISTER] Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
