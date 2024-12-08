const bcrypt = require('bcrypt');
const EventManager = require('../models/EventManager');
const Sponsor = require('../models/Sponser');



// Get all event managers
exports.getAllEventManagers = async (req, res) => {
    try {
        const managers = await EventManager.find();
        res.json(managers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching event managers' });
    }
};

// Function to delete an event manager
exports.deleteEventManager = async (req, res) => {
    try {
        const { id } = req.params; // Get manager ID from request params
        const eventManager = await EventManager.findByIdAndDelete(id); // Delete from database

        if (!eventManager) {
            return res.status(404).json({ message: 'Event manager not found' });
        }

        res.status(200).json({ message: 'Event manager deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred while deleting event manager' });
    }
};

// Add a new event manager
exports.addEventManager = async (req, res) => {
    try {
        const { name, email, phone, status, password } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new EventManager
        const newManager = new EventManager({
            name,
            email,
            phone,
            status,
            password: hashedPassword, // Save the hashed password
        });

        // Save the new manager to the database
        await newManager.save();
        res.status(201).json({ success: true, manager: newManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding event manager' });
    }
};

// Update an event manager
exports.updateEventManager = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status } = req.body;

        // Ensure we have the updated values
        const updatedManager = await EventManager.findByIdAndUpdate(
            id,
            { name, email, phone, status },
            { new: true }
        );

        if (updatedManager) {
            res.json({ success: true, manager: updatedManager });
        } else {
            res.status(404).json({ message: 'Manager not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating event manager' });
    }
};

// Assign an event to an event manager
exports.assignEventToManager = async (req, res) => {
    try {
        const { id } = req.params; // Manager ID
        const { eventId } = req.body; // Event ID from request body

        // Check if the event is already assigned to another manager
        const existingAssignment = await EventManager.findOne({ assignedEvents: eventId });
        if (existingAssignment) {
            return res.status(400).json({ message: 'Event is already assigned to another manager' });
        }

        // Assign the event to the manager
        const updatedManager = await EventManager.findByIdAndUpdate(
            id,
            { $addToSet: { assignedEvents: eventId } }, // Add to assignedEvents array
            { new: true }
        );

        if (!updatedManager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        res.json({ success: true, manager: updatedManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning event to manager' });
    }
};
