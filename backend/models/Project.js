const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  organization: {
    name: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
    email: { type: String },
  },
  total_donations: { // จำนวนเงินที่ระดมทุนได้จนถึงปัจจุบัน
    type: Number
  },
  goal: { // เป้าหมายระดมทุน
    type: Number,
    required: true
  },
  address_project: {
    type: String,
    required: true
  },
  type_project: {
    type: String,
    required: true
  },
  short_description: {
    type: String,
    required: true
  },
  long_description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);