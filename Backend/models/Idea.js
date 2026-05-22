const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensures only one idea per team
  },
  abstract: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  business_model: {
    type: String,
    required: true
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Idea', IdeaSchema);
