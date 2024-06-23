const { createOrUpdateSubmission, updateSubmissionStatus, deleteSubmission, updateProgressStatus } = require('./rabbitMQController');

function handleMessage(msg, channel) {
    const messageContent = msg.content.toString();
    const messageData = JSON.parse(messageContent);

    switch (messageData.action) {
        case 'modify':
            createOrUpdateSubmission(messageData.data, channel)
                .then(result => {
                    console.log('Submission modified successfully:', {
                        name: result.name,
                        username: result.username
                    });
                })
                .catch(error => console.error('Failed to modify submission:', error));
            break;
        case 'delete':
            deleteSubmission(messageData, channel)
                .then(() => console.log('Submission deleted successfully'))
                .catch(error => console.error('Failed to delete submission:', error));
            break;
        case 'update':
            updateProgressStatus(messageData)
                .then( updatedSubmission => {
                    console.log('Submission status successfully');
                })
                .catch(error => console.error('Failed to update submission status:', error));
            break;
        default:
            console.error('Unhandled action type:', messageData.action);
    }
}

function processResult(msg, channel) {
    const resultData = JSON.parse(msg.content.toString());
    console.log('Processing result for submission:', { submissionId: resultData.submissionId });

    updateSubmissionStatus({
        submissionId: resultData.submissionId,
        label: resultData.label
    }, channel).then(updatedSubmission => {
        console.log('Updated submission status successfully');
    }).catch(error => {
        console.error('Failed to update submission status:', error);
    });
}

module.exports = { handleMessage, processResult };