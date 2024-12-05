const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Gallery', gallerySchema);
