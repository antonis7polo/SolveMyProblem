const { publishToQueue } = require('../config/mqService');

exports.deleteSubmission = async (req, res) => {
    try {
        const submissionId = req.params.id;

        await publishToQueue({ id: submissionId, action: 'delete' });

        res.json({ message: 'Submission deleted and sent to queue' });
    } catch (error) {
        console.error('Failed to delete submission:', error);
        res.status(500).json({ message: 'Failed to delete submission', error });
    }
};

exports.uploadFiles = async (req, res) => {
    try {
        const { pythonFile, jsonFile } = req.files;
        const { id, name, username, userId, numVehicles, depot, maxDistance } = req.body;

        if (req.user.id !== userId) {
            return res.status(403).json({ message: 'Not authorized to upload files for another user.' });
        }

        const inputData = {};

        if (pythonFile && pythonFile.length > 0) {
            const solver = pythonFile[0];
            inputData.solver = solver.buffer;
            inputData.solverMetadata = { size: solver.size, type: solver.mimetype };
        }

        if (jsonFile && jsonFile.length > 0) {
            const parameters = jsonFile[0];
            inputData.parameters = parameters.buffer;
            inputData.parametersMetadata = { size: parameters.size, type: parameters.mimetype };
        }

        if (numVehicles) {
            inputData.numVehicles = numVehicles;
        }

        if (depot) {
            inputData.depot = depot;
        }

        if (maxDistance) {
            inputData.maxDistance = maxDistance;
        }

        const message = {
            id,
            name,
            username,
            userId,
            inputData
        };

        await publishToQueue({ action: 'modify', data: message });

        res.status(201).json({ message: 'Submission data processed and sent to the queue.' });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload.' });
    }
};