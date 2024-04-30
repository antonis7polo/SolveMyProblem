// messageHandler.js
const { createOrUpdateSubmission } = require('./rabbitMQController');

function handleMessage(msg, channel) {
    const messageContent = msg.content.toString();
    const messageData = JSON.parse(messageContent);
    console.log('Received message:', messageData);

    createOrUpdateSubmission(messageData, channel)
        .then(result => console.log('Submission processed successfully:', result))
        .catch(error => console.error('Failed to process submission:', error));
}

module.exports = { handleMessage };
