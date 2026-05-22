const Phase = require('../models/Phase');

// @desc    Get Current Hackathon Phase
// @route   GET /phase/current
// @access  Private
const getCurrentPhase = async (req, res) => {
  try {
    // Find the phase where is_active is true
    const activePhase = await Phase.findOne({ is_active: true });

    if (!activePhase) {
      return res.status(200).json({
        success: true,
        current_phase: 'No active phase'
      });
    }

    return res.status(200).json({
      success: true,
      current_phase: activePhase.phase_name
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching current phase'
    });
  }
};

module.exports = {
  getCurrentPhase
};
