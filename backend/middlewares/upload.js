const multer = require('multer');

// Set up file storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where the uploaded file should go
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid name conflicts
    }
});

// Filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only images are allowed'), false); // Reject non-image files
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Max file size 5MB
});

module.exports = upload;
