// controllers/getLogsController.js

const Logs = require('../models/logs');

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
        filter.resultsId = parseInt(resultsId);
    }

    try {
        const logs = await Logs.find(filter);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getLogs };

