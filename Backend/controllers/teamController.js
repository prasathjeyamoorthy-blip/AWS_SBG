const User = require('../models/User');

// @desc    Get current team details
// @route   GET /team/details
// @access  Private
const getTeamDetails = async (req, res) => {
  try {
    // Fetch the user using the ID stored in req.user by the auth middleware
    const user = await User.findById(req.user.id).select('-password_hash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving team details'
    });
  }
};

module.exports = {
  getTeamDetails
};
