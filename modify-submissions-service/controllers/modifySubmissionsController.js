const { publishToQueue } = require('../utils/mqService');

exports.createSubmission = async (req, res) => {
    try {
        const submissionData = req.body;

        await publishToQueue({ action: 'modify', data: submissionData });

        res.status(201).json({ message: 'Submission created or modified and sent to queue' });
    } catch (error) {
        console.error('Failed to create or modify submission:', error);
        res.status(500).json({ message: 'Failed to create or modify submission', error });
    }
};

exports.deleteSubmission = async (req, res) => {
    try {
        const submissionId = req.params.id;

        await publishToQueue({ id: submissionId, action: 'delete' });

        res.json({ message: 'Submission deleted and sent to queue' });
    } catch (error) {
        console.error('Failed to delete submission:', error);
        res.status(500).json({ message: 'Failed to delete submission', error });
    }
}
