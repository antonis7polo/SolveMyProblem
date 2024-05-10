const User = require('../models/user');

exports.getCredits = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required', type: 'error' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', type: 'error' });
        }

        res.status(200).json({ message: 'Credits fetched successfully', credits: user.credits });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch credits', type: 'error' });
    }
};