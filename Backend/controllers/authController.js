const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new team
// @route   POST /auth/register
// @access  Public
const registerTeam = async (req, res) => {
  try {
    const { email, password, team_name, year_of_passing, team_members } = req.body;

    // Validate inputs
    if (!email || !password || !team_name || !year_of_passing || !team_members) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create a new User
    const newUser = new User({
      email: email.toLowerCase(),
      password_hash,
      team_name,
      year_of_passing,
      team_members
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Team registered successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Login a team
// @route   POST /auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token containing the user's _id and email
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET || 'supersecurepiratesecretkey123!',
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

module.exports = {
  registerTeam,
  loginUser
};
