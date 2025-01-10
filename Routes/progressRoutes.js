// routes/progressRoutes.js
const express = require('express');
const { getProgress, addProgress } = require('../Controllers/progressController');
const router = express.Router();

// GET: Get all progress records
router.get('/', getProgress);

// POST: Add a progress record
router.post('/', addProgress);

module.exports = router;

