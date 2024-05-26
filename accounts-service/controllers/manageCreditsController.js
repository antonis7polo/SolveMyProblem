const User = require('../models/user');
const { publishCreditsAdded } = require('../config/rabbitMQ');  

exports.addCredits = async (req, res) => {
    const { userId, creditsChange } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.credits += creditsChange;
        await user.save();

        // Publish the credits addition event to RabbitMQ
        await publishCreditsAdded({ userID: userId, creditsChange });

        res.status(200).json({ message: 'Credits added successfully', user });
    } catch (error) {
        console.error('Failed to add credits:', error);
        res.status(500).json({ message: 'Error adding credits', error: error.message });
    }
};


