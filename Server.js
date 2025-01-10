const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./Config/db');
const profileRoutes = require('./Routes/profileRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes with logging
try {
  const authRoutes = require('./Routes/authRoutes');
  console.log('authRoutes type:', typeof authRoutes);

  const userRoutes = require('./Routes/userRoutes');
  console.log('userRoutes type:', typeof userRoutes);

  const messageRoutes = require('./Routes/messageRoutes');
  console.log('messageRoutes type:', typeof messageRoutes);

  const progressRoutes = require('./Routes/progressRoutes');
  console.log('progressRoutes type:', typeof progressRoutes);

  const meetingRoutes = require('./Routes/meetingRoutes');
  console.log('meetingRoutes type:', typeof meetingRoutes);

  // Database connection
  db.connect((err) => {
    if (err) {
      console.error('❌ Database connection failed:', err.stack);
      process.exit(1);
    }
    console.log('✅ Connected to MySQL database');
  });

  // Routes with type checking
  if (typeof authRoutes === 'function') {
    app.use('/api/auth', authRoutes);
  } else {
    console.error('authRoutes is not a valid middleware function');
  }

  if (typeof userRoutes === 'function') {
    app.use('/api/user', userRoutes);
  } else {
    console.error('userRoutes is not a valid middleware function');
  }

  if (typeof messageRoutes === 'function') {
    app.use('/api/messages', messageRoutes);
  } else {
    console.error('messageRoutes is not a valid middleware function');
  }

  if (typeof progressRoutes === 'function') {
    app.use('/api/progress', progressRoutes);
  } else {
    console.error('progressRoutes is not a valid middleware function');
  }

  if (typeof meetingRoutes === 'function') {
    app.use('/api/meetings', meetingRoutes);
  } else {
    console.error('meetingRoutes is not a valid middleware function');
  }

  // ✅ Logging the profile route registration
app.use('/profile', (req, res, next) => {
    console.log('[SERVER] /profile route is registered and active');
    next(); // Continue to the actual route handler
  }, profileRoutes);

  // Default Route
  app.get('/', (req, res) => {
    res.send('Welcome to the PTCW Backend API');
  });

  // Global Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong!',
      error: err.message,
    });
  });

  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });

} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}