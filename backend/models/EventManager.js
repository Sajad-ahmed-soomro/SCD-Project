const mongoose = require('mongoose');

const eventManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assignedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    status: { type: String, default: 'Active' },
    notifications: [
        {
            notificationId: { type: mongoose.Schema.Types.ObjectId },
            message: { type: String },
            sentOn: { type: Date, default: Date.now },
            status: { type: String, default: 'Unread' }
        }
    ]
});

module.exports = mongoose.model('EventManager', eventManagerSchema);
