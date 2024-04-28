const { publishToQueue } = require('../utils/mqService');

exports.createSubmission = async (req, res) => {
    try {
        const submissionData = req.body;

        // Publish the message with the action type and submission data to the queue
        await publishToQueue(submissionData);

        // Respond to the client indicating successful creation/modification
        res.status(201).json({ message: 'Submission created or modified and sent to queue' });
    } catch (error) {
        console.error('Failed to create or modify submission:', error);
        res.status(500).json({ message: 'Failed to create or modify submission', error });
    }
};
