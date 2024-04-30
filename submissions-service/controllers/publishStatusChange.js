// publishStatusChange.js
function publishStatusChange(submissionId, action, submissionData, channel) {
    let message;
    if (action === 'insert' && submissionData) {
        message = {
            action: action,
            data: {
                submissionId: submissionId.toString(),
                name: submissionData.name,
                userId: submissionData.userId,
                inputData: submissionData.inputData
            }
        };
    } else if (action === 'delete') {
        message = {
            action: action,
            submissionId: submissionId.toString()
        };
    } else if (action === 'update' && submissionData) {
        message = {
            action: action,
            data: {
                submissionId: submissionId.toString(),
                name: submissionData.name,
                userId: submissionData.userId,
                inputData: submissionData.inputData
            }
        };
    }
    else {
        console.error('Invalid action or missing data for publishStatusChange');
        return;
    }

    const EXCHANGE_NAME = process.env.PROBLEMS_EXCHANGE_NAME;
    const ROUTING_KEY = process.env.PROBLEMS_ROUTING_KEY;
    try {
        channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log('Published status change:', message);
    } catch (error) {
        console.error('Failed to publish message:', error);
    }
}

module.exports = { publishStatusChange };
