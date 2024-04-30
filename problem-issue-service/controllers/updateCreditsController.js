const Account = require('../models/account');

async function updateCredits(data) {
    const { userID, creditsChange } = data;
    const account = await Account.findOne({ userID });
    if (!account) {
        console.log(`Account not found for userID: ${userID}`);
        return;
    }

    // Update credits
    account.credits += creditsChange;
    await account.save();
    console.log(`Credits updated for userID: ${userID}. New balance: ${account.credits}`);
}

module.exports = { updateCredits };