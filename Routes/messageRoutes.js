// routes/messageRoutes.js
const express = require('express');
const { sendMessage, getMessages } = require('../Controllers/messageController');
const router = express.Router();

// POST: Send a message
router.post('/', sendMessage);

// GET: Get messages for a specific user
router.get('/:userId', getMessages);

module.exports = router;

