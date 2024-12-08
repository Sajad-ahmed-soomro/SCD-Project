const express = require('express');
const router = express.Router();
const { getReports } = require('../Controllers/reportController');

// Route for fetching reports
router.get('/reports', getReports);

module.exports = router;
