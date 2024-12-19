const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Donation = require('../models/Donation.js');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Project = require('../models/Project.js');
const verifyToken = require('../middleware/token.js');

// Create a donation
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { project_id, amount, date } = req.body;

    // Validate required fields
    if (!project_id || !amount) {
      return res.status(400).json({ message: 'Project ID and amount are required.' });
    }

    // Validate user ID from token
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - no user ID found in token.' });
    }

    // Validate project_id
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number.' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if project exists
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Create a new donation
    const donation = new Donation({
      project_id,
      user_id: userId,
      donation_id: uuidv4(), // Generate unique donation ID
      amount,
      date: date ? new Date(date) : Date.now()
    });

    await donation.save();

    // Update total_donations in Project
    project.total_donations = (project.total_donations || 0) + amount;
    await project.save();

    res.status(201).json({
      message: 'Donation created and total_donations updated successfully',
      donation
    });
  } catch (error) {
    console.error('Error creating donation:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// ดูข้อมูลบริจาคทั้งหมดของ project_id นั้น
router.get('/project/:project_id', verifyToken, async (req, res) => {
  try {
    const { project_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }

    const donations = await Donation.find({ project_id })
      .populate('user_id', 'first_name last_name email');

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this project.' });
    }

    res.status(200).json({
      message: 'Donations fetched successfully.',
      donations
    });
  } catch (error) {
    console.error('Error fetching donations for project:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// ดูรายการบริจาคทั้งหมดของผู้ใช้คนหนึ่ง
router.get('/user/:user_id', verifyToken, async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    const donations = await Donation.find({ user_id })
      .populate('project_id', 'title goal');

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this user.' });
    }

    res.status(200).json({
      message: 'Donations fetched successfully.',
      donations
    });
  } catch (error) {
    console.error('Error fetching user donations:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});



// Fetch project details including total donations and remaining amount
router.get('/total/:project_id', verifyToken, async (req, res) => {
  try {
    const { project_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }

    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const remainingAmount = project.goal - project.total_donations;

    res.status(200).json({
      project_id: project._id,
      title: project.title,
      goal: project.goal,
      total_donations: project.total_donations,
      remaining_amount: remainingAmount > 0 ? remainingAmount : 0,
      message: remainingAmount > 0 
        ? `You need ${remainingAmount} more to reach the goal.` 
        : 'Goal has been reached!'
    });
  } catch (error) {
    console.error('Error fetching project details:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


router.get('/test', (req, res) => {
  res.send('Donation routes are working!');
});


module.exports = router;
