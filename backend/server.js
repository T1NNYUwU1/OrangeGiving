const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/User_setting');
const donationRoutes = require('./routes/Donation_setting');
const projectRoutes = require('./routes/Project_setting');
const path = require('path');
const cors = require('cors');


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // อนุญาตเฉพาะ frontend ที่อยู่ port 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // อนุญาตให้ส่ง cookies หรือ headers ที่เกี่ยวกับการยืนยันตัวตน
}));
app.use("/images", express.static(path.join(__dirname, "../public")));
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/users', userRoutes); // Routes for users
app.use('/donations', donationRoutes); // Routes for donations
app.use('/projects', projectRoutes); // Routes for projects

// Default route for unhandled requests
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
