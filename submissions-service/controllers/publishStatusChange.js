function publishStatusChange(submissionId, action, submissionData, channel) {
    let message;
    if (action === 'insert' && submissionData) {
        message = {
            action: action,
            data: {
                submissionId: submissionId.toString(),
                name: submissionData.name,
                userId: submissionData.userId,
                username: submissionData.username,
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
                username: submissionData.username,
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
        // Log only the relevant fields without inputData
        if (message.data) {
            console.log('Published status change:', {
                action: message.action,
                data: {
                    submissionId: message.data.submissionId,
                    name: message.data.name,
                    userId: message.data.userId,
                    username: message.data.username
                }
            });
        } else {
            console.log('Published status change:', {
                action: message.action,
                submissionId: message.submissionId
            });
        }
    } catch (error) {
        console.error('Failed to publish message:', error);
    }
}

async function publishDeletionToResultsService(submissionId, channel) {
    const message = {
        submissionId: submissionId,
        action: 'delete'
    };

    try {
        const exchange = process.env.RESULT_DELETE_EXCHANGE_NAME;
        const routingKey = process.env.RESULT_DELETE_ROUTING_KEY;

        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log(`Deletion message published for submission ID ${submissionId} to results service.`);
    } catch (error) {
        console.error('Error publishing deletion message to results service:', error);
    }
}

module.exports = { publishStatusChange, publishDeletionToResultsService };
