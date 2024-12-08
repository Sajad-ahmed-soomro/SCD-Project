const express = require('express');
const connectDB = require('./config/db'); // Import the database connection function
require('dotenv').config();
// const eventRoutes = require('./routes/eventRoutes'); // Import the event routes
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const eventManagerRoutes = require('./routes/eventManagerRoutes');
const eventStatusRoutes = require("./routes/eventStatusRoutes")

const userManageRoutes = require('./routes/userManageRoutes'); // Adjust the path as necessary

const reportRoutes = require("./routes/reportRoutes");

const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not specified
app.use(cors());
// Connect to the MongoDB database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', adminRoutes); // Admin routes

app.use('/api/manageUser', userManageRoutes);

// event route
// app.use('/api', eventRoutes);

// manage events status
app.use("/api/event-status", eventStatusRoutes);
app.use('/api/eventManagers', eventManagerRoutes); // Event Managers API routes

// report for admin

app.use("/api/report", reportRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
