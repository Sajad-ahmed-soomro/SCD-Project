const express = require('express');
const router = express.Router();
const eventStatusController = require('../controllers/eventStatusController');

// Event approval and rejection routes
router.put('/events/:id/approve', eventStatusController.approveEvent);
router.delete('/events/:id/reject', eventStatusController.rejectEvent);
router.get('/events', eventStatusController.getPendingEvents);
router.get('/getevents', eventStatusController.getEvents);
router.put('/events/:id/discount', eventStatusController.updateDiscount);

module.exports = router;
