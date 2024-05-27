const Logs = require('../models/logs');

/**
 * Handles the storage of user creation logs
 * @param {Object} messageData - Data from the "user created" message
 */
async function handleUserCreated(messageData) {
    console.log(`Processing user message with data: ${JSON.stringify(messageData)}`);
    try {
        const { userId, executionTimestamp } = messageData;

        const logEntry = new Logs({
            eventType: 'user',
            userId,
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
            userId, resultsId, submissionId, name, label, resourceUsage,
            cpuTime, taskCompletionTime, queueTime, executionTimestamp
        } = messageData;

        const logEntry = new Logs({
            eventType: 'results',
            userId,
            resultsId,
            submissionId,
            name,
            label,
            resourceUsage,
            cpuTime,
            taskCompletionTime,
            queueTime,
            executionTimestamp
        });

        await logEntry.save();
        console.log(`Results stored log stored with event ID: ${logEntry._id}`);
    } catch (error) {
        console.error('Error storing results stored log:', error);
    }
}

module.exports = { handleUserCreated, handleResultsStored };
