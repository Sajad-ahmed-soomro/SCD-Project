const Event = require('../models/Event');

exports.getPendingEvents = async (req, res) => {
    try {
        const events = await Event.find({ approvalStatus: 'Pending' }); // Fetch only pending events
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};
// Update Discount
exports.updateDiscount = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { discount } = req.body; // Get the discount from the request body
        const event = await Event.findByIdAndUpdate(
            eventId,
            { discount },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Discount updated', event });
    } catch (error) {
        res.status(500).json({ message: 'Error updating discount', error });
    }
};

// Approve Event
exports.approveEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndUpdate(
            eventId,
            { approvalStatus: 'Approved' },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event approved', event });
    } catch (error) {
        res.status(500).json({ message: 'Error approving event', error });
    }
};

// Reject Event
exports.rejectEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event rejected and removed from the system' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting event', error });
    }
};
