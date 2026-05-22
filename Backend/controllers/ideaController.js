const Idea = require('../models/Idea');

// @desc    Submit Idea Form
// @route   POST /idea/submit
// @access  Private
const submitIdea = async (req, res) => {
  try {
    const { abstract, domain, industry, business_model } = req.body;

    // Validate inputs
    if (!abstract || !domain || !industry || !business_model) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if an idea already exists for this team (user_id from JWT)
    const existingIdea = await Idea.findOne({ user_id: req.user.id });
    if (existingIdea) {
      return res.status(400).json({
        success: false,
        message: 'Idea already submitted'
      });
    }

    // Create and save the new idea
    const newIdea = new Idea({
      user_id: req.user.id,
      abstract,
      domain,
      industry,
      business_model
    });

    await newIdea.save();

    return res.status(201).json({
      success: true,
      message: 'Idea submitted successfully'
    });
  } catch (error) {
    // Handle double-safety for unique key index in mongoDB
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Idea already submitted'
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Server error submitting idea'
    });
  }
};

// @desc    Check Idea Submission Status
// @route   GET /idea/status
// @access  Private
const checkIdeaStatus = async (req, res) => {
  try {
    // Check if an idea document exists for the logged-in team
    const ideaExists = await Idea.exists({ user_id: req.user.id });

    return res.status(200).json({
      success: true,
      idea_submitted: !!ideaExists
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error checking idea status'
    });
  }
};

module.exports = {
  submitIdea,
  checkIdeaStatus
};
