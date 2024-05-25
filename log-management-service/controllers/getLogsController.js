// controllers/getLogsController.js

const Logs = require('../models/logs');
const mongoose = require('mongoose');

async function getLogs(req, res) {

    const { eventType, userId, resultsId } = req.query;
    const filter = {};

    if (eventType) {
        filter.eventType = eventType;
    }
    if (userId) {
        filter.userId = parseInt(userId);
    }
    if (resultsId) {
        if (mongoose.Types.ObjectId.isValid(resultsId)) {
            filter.resultsId = resultsId; 
        }
    }

    try {
        const logs = await Logs.find(filter);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getLogs };

