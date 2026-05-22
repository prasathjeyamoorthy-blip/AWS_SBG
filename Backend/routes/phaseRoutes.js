const express = require('express');
const router = express.Router();
const { getCurrentPhase } = require('../controllers/phaseController');
const { protect } = require('../middleware/auth');

// Protected route to check the current active hackathon phase
router.get('/current', protect, getCurrentPhase);

module.exports = router;
