const express = require('express');
const router = express.Router();
const { submitIdea, checkIdeaStatus } = require('../controllers/ideaController');
const { protect } = require('../middleware/auth');

// Protected route to submit a project/hackathon idea
router.post('/submit', protect, submitIdea);

// Protected route to check if an idea has already been submitted by this team
router.get('/status', protect, checkIdeaStatus);

module.exports = router;
