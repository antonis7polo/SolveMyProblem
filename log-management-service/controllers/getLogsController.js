// controllers/getLogsController.js

const Logs = require('../models/logs');
const mongoose = require('mongoose');

async function getLogs(req, res) {

    const { eventType, username, submissionId } = req.query;
    const filter = {};

    if (eventType) {
        filter.eventType = eventType;
    }
    if (username) {
        filter.username = username;
    }
    if (submissionId) {
        if (mongoose.Types.ObjectId.isValid(submissionId)) {
            filter.submissionId = submissionId; 
        }
    }

    try {
        const logs = await Logs.find(filter).sort({ executionTimestamp: -1 });;
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getLogs };

