// controllers/messageHandler.js
const Result = require('../models/result');

async function handleMessage(msg, channel) {
    let data;
    try {
        data = JSON.parse(msg.content.toString());
    } catch (error) {
        console.error('Failed to parse message content:', msg.content.toString());
        return;
    }

    if (data.label === 'success') {
        const newResult = new Result({
            submissionId: data.submissionId,
            name: data.name,
            userId: data.userId,
            results: data.results
        });

        try {
            await newResult.save();
            console.log('Result saved:', newResult);

            publishToSubmissions({
                submissionId: data.submissionId,
                label: data.label
            }, channel);  // Pass channel to publishing functions

            publishToLog({
                ...data
            }, channel);
        } catch (error) {
            console.error('Error saving result:', error);
        }
    } else if (data.label === 'fail') {
        publishToSubmissions({
            submissionId: data.submissionId,
            label: 'fail'
        }, channel);

        publishToLog({
            ...data,
            label: 'fail'
        }, channel);
    }
}

function publishToSubmissions(data, channel) {
    const message = Buffer.from(JSON.stringify(data));
    channel.publish(process.env.SUBMISSION_EXCHANGE, process.env.SUBMISSION_ROUTING_KEY, message, { persistent: true });
    console.log("Published to submissions queue:", data);
}

function publishToLog(data, channel) {
    const message = Buffer.from(JSON.stringify(data));
    channel.publish(process.env.LOG_EXCHANGE, process.env.LOG_ROUTING_KEY, message, {persistent: true});
    console.log("Published to log queue:", data);
}

module.exports = { handleMessage };
