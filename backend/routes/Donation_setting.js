const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Donation = require('../models/Donation.js');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Project = require('../models/Project');
const verifyToken = require('../middleware/token.js');

// Create a donation
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { project_id, amount, date } = req.body;

    if (!project_id || !amount) {
      return res.status(400).json({ message: 'Project ID and amount are required.' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - no user ID found in token.' });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const project = await Project.findOne({ project_id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const donation = new Donation({
      project_id,
      user_id: userId,
      donation_id: uuidv4(),
      amount,
      date: date ? new Date(date) : Date.now()
    });

    await donation.save();

    project.total_donations = (project.total_donations || 0) + amount;
    await project.save();

    res.status(201).json({ message: 'Donation created successfully.', donation });
  } catch (error) {
    console.error('Error creating donation:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Fetch donations for a project
router.get('/project/:project_id', verifyToken, async (req, res) => {
  try {
    const { project_id } = req.params;

    const donations = await Donation.find({ project_id })
      .populate('user_id', 'first_name last_name email');

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this project.' });
    }

    res.status(200).json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Fetch all donations for a specific user
router.get('/user/:user_id', verifyToken, async (req, res) => {
  try {
    const { user_id } = req.params;

    // Ensure you query using `String` for `user_id` and populate correctly
    const donations = await Donation.find({ user_id }) // Match as a string
      .populate({ path: 'project_id', model: 'Project', select: 'title goal' }); // Populate project details

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this user.' });
    }

    res.status(200).json({
      message: 'Donations fetched successfully.',
      donations,
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

    if (typeof project_id !== 'string' || !project_id.trim()) {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }

    const project = await Project.findOne({ project_id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const remainingAmount = project.goal - project.total_donations;

    res.status(200).json({
      project_id: project.project_id, // Use `project_id` since `_id` is not used anymore
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

// donate history user
router.get('/history', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming this is a String ID

    const donations = await Donation.find({ user_id: userId })
    .populate({
      path: 'project_id',
      model: 'Project',
      match: {}, // Add filters if needed
      select: 'title goal',
      options: { lean: true },
    });

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this user.' });
    }

    res.status(200).json({
      message: 'Donation history fetched successfully.',
      donations,
    });
  } catch (error) {
    console.error('Error fetching donation history:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.send('Donation routes are working!');
});

module.exports = router;
