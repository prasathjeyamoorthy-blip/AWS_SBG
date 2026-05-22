const mongoose = require('mongoose');

const PhaseSchema = new mongoose.Schema({
  phase_name: {
    type: String,
    required: true
  },
  phase_order: {
    type: Number,
    required: true,
    unique: true
  },
  is_active: {
    type: Boolean,
    default: false
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Phase', PhaseSchema);
