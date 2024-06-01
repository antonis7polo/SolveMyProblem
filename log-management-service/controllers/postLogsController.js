const Logs = require('../models/logs');

/**
 * Handles the storage of user creation logs
 * @param {Object} messageData - Data from the "user created" message
 */
async function handleUserCreated(messageData) {
    console.log(`Processing user message with data: ${JSON.stringify(messageData)}`);
    try {
        const { userId, username, executionTimestamp } = messageData; 

        const logEntry = new Logs({
            eventType: 'user',
            userId,
            username,
            executionTimestamp
        });

        await logEntry.save();
        console.log(`User creation log stored with event ID: ${logEntry._id}`);
    } catch (error) {
        console.error('Error storing user creation log:', error);
    }
}

/**
 * Handles the storage of results stored logs
 * @param {Object} messageData - Data from the "results stored" message
 */
async function handleResultsStored(messageData) {
    console.log(`Processing results message with data: ${JSON.stringify(messageData)}`);
    try {
        const {
            userId, username, submissionId, name, label, resourceUsage,    
            cpuTime, taskCompletionTime, queueTime, executionTimestamp, resultsId
        } = messageData;

        // Find the user creation log to get the username
        /*const userLog = await Logs.findOne({ userId, eventType: 'user' });

        if (!userLog) {
            throw new Error(`User log not found for userId: ${userId}`);
        }*/

        const logEntry = new Logs({
            eventType: 'results',
            userId,
            //username: userLog.username,
            username,
            submissionId,
            name,
            label,
            resourceUsage,
            cpuTime,
            taskCompletionTime,
            queueTime,
            executionTimestamp,
            resultsId
        });

        await logEntry.save();
        console.log(`Results stored log stored with event ID: ${logEntry._id}`);
    } catch (error) {
        console.error('Error storing results stored log:', error);
    }
}

module.exports = { handleUserCreated, handleResultsStored };
