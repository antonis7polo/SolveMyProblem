const User = require('../models/User');

exports.updateUserCredits = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.credits += amount;  // Assuming there is a credits field in your User model
        await user.save();
        console.log(`Credits updated: ${user.username}, New Credits: ${user.credits}`);
    } catch (error) {
        console.error('Failed to update credits:', error);
    }
};