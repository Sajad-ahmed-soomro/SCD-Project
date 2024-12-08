const express = require('express');

const router = express.Router();
const {
    getAllEventManagers,
    addEventManager,
    updateEventManager,
    deleteEventManager,
    assignEventToManager
} = require('../controllers/eventManagerController');

// Routes for managing event managers
router.get('/', getAllEventManagers); // View all managers
router.post('/', addEventManager); // Add a new manager
router.put('/:id', updateEventManager); // Edit a manager
router.delete('/:id', deleteEventManager); // Remove a manager
router.put('/assignEvent/:id', assignEventToManager);
module.exports = router;
