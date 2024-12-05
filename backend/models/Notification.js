const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Event Approval, Sponsorship Request, etc.
    message: { type: String, required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    recipientRole: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    sentOn: { type: Date, default: Date.now },
    status: { type: String, default: 'Unread' }
});

module.exports = mongoose.model('Notification', notificationSchema);
