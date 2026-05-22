const express = require('express');
const router = express.Router();
const { registerTeam, loginUser } = require('../controllers/authController');

// Route for registering a new team
router.post('/register', registerTeam);

// Route for logging in a team leader
router.post('/login', loginUser);

module.exports = router;
