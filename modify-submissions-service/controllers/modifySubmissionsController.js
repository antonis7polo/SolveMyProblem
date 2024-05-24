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

        const inputData = {};

        if (pythonFile && pythonFile.length > 0) {
            inputData.solver = pythonFile[0].buffer.toString('base64');
        }
        else {
            inputData.solver = '';
        }

        if (jsonFile && jsonFile.length > 0) {
            inputData.parameters = jsonFile[0].buffer.toString('base64');
        }
        else {
            inputData.parameters = '';
        }

        if (numVehicles) {
            inputData.numVehicles = numVehicles;
        }

        else {
            inputData.numVehicles = '';
        }

        if (depot) {
            inputData.depot = depot;
        }

        else {
            inputData.depot = '';
        }

        if (maxDistance) {
            inputData.maxDistance = maxDistance;
        }

        else {
            inputData.maxDistance = '';
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
