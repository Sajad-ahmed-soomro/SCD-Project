const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const AdminModel = require('../models/Admin');
require('dotenv').config();
const jwt = require('jsonwebtoken');
JWT_SECRET=process.env.JWT_SECRET;
// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Store images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname); // Add a unique suffix to the filename
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin with the given email exists
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        res.json({
            success: true,
            message: 'Login successful',
            token, // Send the token to the client
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                photo: admin.photo
                    ? `http://localhost:5000/uploads/${admin.photo}`
                    : 'https://via.placeholder.com/150' // Fallback if no photo
            }
        });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ success: false, message: 'Server error occurred' });
    }
};


// Controller to fetch admin profile
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({
            ...admin.toObject(),
            photo: admin.photo ? `http://localhost:5000/uploads/${admin.photo}` : 'https://via.placeholder.com/150',
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

// Controller to update admin profile
exports.updateAdminProfile = async (req, res) => {
    try {
        const { name, email, status, password } = req.body;
        const updatedData = { name, email, status };

        // Handle password update if provided
        if (password) {
            const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
            const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
            updatedData.password = hashedPassword;  // Set the hashed password
        }

        // Check if the request contains a file (photo)
        if (req.file) {
            const photo = req.file.filename;  // Save the photo filename
            updatedData.photo = photo;
        }

        // Update admin profile in the database
        const updatedAdmin = await AdminModel.findByIdAndUpdate(
            "675333e0a19f41b24517718c", // Use dynamic adminId if needed
            { $set: updatedData },
            { new: true } // Return updated document
        );

        if (updatedAdmin) {
            res.json({
                success: true,
                admin: updatedAdmin
            });
        } else {
            res.status(404).json({ success: false, message: 'Admin not found' });
        }
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
