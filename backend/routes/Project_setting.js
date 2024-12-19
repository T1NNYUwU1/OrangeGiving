const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');
const verifyToken = require('../middleware/token.js')
const upload = require('../middleware/Image.js');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Create a new project with multiple images
router.post('/create', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, goal, long_description } = req.body;

    if (!title || !goal || !long_description) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
    if (!imagePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const newProject = new Project({
      project_id: uuidv4(),
      title,
      total_donations: 0,
      goal,
      long_description,
      image: imagePath
    });

    await newProject.save();

    res.status(201).json({ message: 'Project created successfully.', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Get a project by project_id
router.get('/:project_id', verifyToken, async (req, res) => {
  try {
    const { project_id } = req.params;

    const project = await Project.findOne({ project_id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// API: Get projects with filtering, sorting, and relevant sorting
router.get('/', async (req, res) => {
  try {
    const { sort } = req.query;

    // ตัวเลือกการ sort
    let sortOption = {};
    if (sort === 'fundsRaised') sortOption.total_donations = -1;
    else if (sort === 'closestTogoal') sortOption.goal = 1;
    else if (sort === 'newest') sortOption.createdAt = -1;

    const projects = await Project.find({}).sort(sortOption);

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Search Projects
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const projects = await Project.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
      ],
    });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found.' });
    }

    res.status(200).json({
      message: 'Search results fetched successfully.',
      projects,
    });
  } catch (error) {
    console.error('Error searching projects:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;