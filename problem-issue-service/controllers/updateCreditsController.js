const Account = require('../models/account');

async function updateCredits(data) {
    const { userID, creditsChange } = data;


    let account = await Account.findOne({ userID: userID });

    // Check if the account exists
    if (!account) {
        // Log that no account was found
        console.log(`Account not found for userID: ${userID}, creating new one.`);

        // Create a new account with the initial credits based on creditsChange
        // Ensure that credits don't start negative
        account = new Account({
            userID: userID,
            credits: Math.max(0, creditsChange) // Prevent negative initial credits
        });

        await account.save();
        console.log(`New account created for userID: ${userID} with initial credits: ${account.credits}`);
    } else {
        // Update credits if account exists
        account.credits += creditsChange;
        await account.save();
        console.log(`Credits updated for userID: ${userID}. New balance: ${account.credits}`);
    }
}

module.exports = { updateCredits }
