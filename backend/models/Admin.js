const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    role: { type: String, default: 'Admin' },
    status: { type: String, default: 'Active' } // Active, Inactive
});

// Avoid overwriting the model if it's already compiled
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

module.exports = Admin;