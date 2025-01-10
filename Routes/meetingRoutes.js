// routes/meetingRoutes.js
const express = require('express');
const { scheduleMeeting, getMeetings } = require('../Controllers/meetingController');
const router = express.Router();

// POST: Schedule a meeting
router.post('/', scheduleMeeting);

// GET: Get all scheduled meetings
router.get('/', getMeetings);

module.exports = router;

