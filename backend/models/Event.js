const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventManager' },
    sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
    status: { type: String, default: 'Pending Approval' },
    ticketAvailability: { type: Boolean, default: true },
    approvalStatus: { type: String, default: 'Pending' },
    popularity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);
