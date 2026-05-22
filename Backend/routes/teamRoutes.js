const express = require('express');
const router = express.Router();
const { getTeamDetails } = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

// Protected route to get team profile details
router.get('/details', protect, getTeamDetails);

module.exports = router;
