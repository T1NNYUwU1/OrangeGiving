const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import UUID

const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
    default: uuidv4, // Generate unique projectId
    unique: true // Ensure projectId is unique
  },
  title: {
    type: String,
    required: true
  },
  total_donations: { // จำนวนเงินที่ระดมทุนได้จนถึงปัจจุบัน
    type: Number,
    default: 0
  },
  goal: { // เป้าหมายระดมทุน
    type: Number,
    required: true
  },
  long_description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);