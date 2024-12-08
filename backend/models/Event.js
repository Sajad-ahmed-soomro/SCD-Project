const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Event model
const eventSchema = new Schema({
    name: { type: String, required: true },  // Name of the event
    description: { type: String, required: true },  // Description of the event
    date: { type: Date, required: true },  // Event date
    location: { type: String, required: true },  // Event location
    status: { type: String, default: 'Active' },  // Event status (Active, Inactive)
    createdAt: { type: Date, default: Date.now },  // Date when the event was created
    updatedAt: { type: Date, default: Date.now }  // Date when the event was last updated
});

// Create and export the Event model
module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
