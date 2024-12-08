const Event = require('../models/Event');

// Controller for fetching reports
const getReports = async (req, res) => {
    try {
        // Fetch successful events
        const successfulEvents = await Event.find({ ticketsSold: { $gt: 0 } })
            .sort({ ticketsSold: -1 })
            .limit(10);

        // Fetch event category counts
        const eventCategories = await Event.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Format response
        res.json({
            successfulEvents: successfulEvents.map(event => ({
                title: event.title,
                ticketsSold: event.ticketsSold,
            })),
            eventCategories: eventCategories.map(category => ({
                name: category._id,
                count: category.count,
            })),
        });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports' });
    }
};

module.exports = {
    getReports,
};
