// controllers/resultsController.js
const Result = require('../models/Result');
const mongoose = require('mongoose');

exports.getResultById = async (req, res) => {
    const submissionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID format' });
    }

    try {
        const result = await Result.findOne({ submissionId: submissionId });
        if (!result) {
            return res.status(404).json({ message: 'Result not found for the provided submission ID' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error retrieving result by submission ID:', error);
        res.status(500).json({ message: 'Error retrieving result', error: error });
    }
};
