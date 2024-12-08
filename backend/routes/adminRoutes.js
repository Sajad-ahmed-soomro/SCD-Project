const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, updateAdminProfile } = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require("../middlewares/adminAuth");


// Initialize multer with your storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage });

// Routes
router.post('/login', loginAdmin);
router.get('/profile', authenticateToken, getAdminProfile);
router.put('/update',authenticateToken, upload.single('photo'), updateAdminProfile);  // PUT request to update profile

module.exports = router;
