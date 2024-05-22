const User = require('../models/user');

const updateUserCredits = async (msg) => {
    try {
        const data = JSON.parse(msg.content.toString());
        console.log('Received message:', data);
        const {userID, creditsChange} = data.data;
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found');
        }
        user.credits += creditsChange;
        await user.save();
        console.log(`Updated credits for user ${userID} to ${user.credits}`);
    } catch (error) {
        console.error('Failed to update credits:', error);
    }
}

module.exports = { updateUserCredits };

