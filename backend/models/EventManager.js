const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const eventManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
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

// Hash the password before saving
eventManagerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('EventManager', eventManagerSchema);
