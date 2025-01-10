const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing or invalid' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Profile route
router.get('/profile', authenticateToken, (req, res) => {
  // Log user information on the server-side console
  console.log('Profile accessed by:', req.user);

  // Respond with user data
  res.json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
