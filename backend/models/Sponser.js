const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    sponsoredEvents: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
            contributionAmount: { type: Number },
            status: { type: String, default: 'Pending' } // Pending, Confirmed, Rejected
        }
    ],
    totalContributions: { type: Number, default: 0 },
    status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
