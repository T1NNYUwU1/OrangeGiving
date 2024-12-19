const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const donationSchema = new mongoose.Schema({
  project_id: {
    type: String,
    ref: 'Project',
    required: true,
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true,
  },
  donation_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);
