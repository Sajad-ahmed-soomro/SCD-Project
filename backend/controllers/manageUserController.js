const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Toggle user status (Activate/Deactivate)
exports.toggleUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const { status } = req.body; // Get the status from the request body

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If status is provided in the request, use it to update
        const newStatus = status || (user.status === 'Active' ? 'Inactive' : 'Active');

        // Update the user's status in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { status: newStatus },
            { new: true }
        );

        res.status(200).json({
            message: `User status updated to ${newStatus}`,
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error in updating user status:', error);
        res.status(500).json({ message: 'Error updating user status', error });
    }
};

// Remove user
exports.removeUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing user', error });
    }
};
