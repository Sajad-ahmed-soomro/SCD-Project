const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON request body

// Sample route
app.get('/', (req, res) => {
    res.send('Event Management System API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
