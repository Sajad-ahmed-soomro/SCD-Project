const express = require('express');
const router = express.Router();
const userController = require('../controllers/manageUserController'); // Import the controller

// Define routes and link them to the controller methods
router.get('/users', userController.getAllUsers); // Get all users
router.patch('/users/:id', userController.toggleUserStatus); // Deactivate user
router.delete('/users/:id', userController.removeUser); // Remove user

module.exports = router;
