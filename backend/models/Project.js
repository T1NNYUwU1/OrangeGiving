const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  total_donations: {
    type: Number,
    default: 0,
  },
  goal: {
    type: Number,
    required: true,
  },
  long_description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, 
{ _id: false }, // Disable default `_id` field
{ timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
