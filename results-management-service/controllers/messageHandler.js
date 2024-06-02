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
            username: data.username,
            results: data.results,
            creationTimestamp: data.createdAt,
            updateTimestamp: data.updatedAt,
            submissionTimestamp: data.submissionTimestamp
        });

        try {
            await newResult.save();
            console.log('Result saved:', newResult);

            publishToSubmissions({
                submissionId: data.submissionId,
                label: data.label
            }, channel);

            publishToLog({
                ...data,
                resultsId: newResult._id,
                taskCompletionTime: data.taskCompletionTime,
                cpuTime: data.cpuTime,
                creditsUsed: data.creditsUsed,
                queueTime: data.queueTime,
                executionTimestamp: data.executionTimestamp
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
            resultsId: null,
            taskCompletionTime: data.taskCompletionTime,
            cpuTime: data.cpuTime,
            creditsUsed: data.creditsUsed,
            queueTime: data.queueTime,
            executionTimestamp: data.executionTimestamp,
            label: 'fail'
        }, channel);
    } else if (data.action === 'delete') {
        try {
            await Result.deleteOne({submissionId: data.submissionId});
            console.log('Result deleted:', data.submissionId);
        } catch (error) {
            console.error('Error deleting result:', error);
        }

    }
}

function publishToSubmissions(data, channel) {
    const message = Buffer.from(JSON.stringify(data));
    channel.publish(process.env.SUBMISSION_EXCHANGE, process.env.SUBMISSION_ROUTING_KEY, message, { persistent: true });
    console.log("Published to submissions queue:", data);
}


function publishToLog(data, channel) {
    const logData = {
        ...data,
        resultsId: data.resultsId,
        taskCompletionTime: data.taskCompletionTime,
        cpuTime: data.cpuTime,
        creditsUsed: data.creditsUsed,
        queueTime: data.queueTime,
        executionTimestamp: data.executionTimestamp
    };

    const message = Buffer.from(JSON.stringify(logData));
    channel.publish(process.env.LOG_EXCHANGE, process.env.LOG_ROUTING_KEY, message, { persistent: true });
    console.log("Published to log queue:", logData);
}


module.exports = { handleMessage };
