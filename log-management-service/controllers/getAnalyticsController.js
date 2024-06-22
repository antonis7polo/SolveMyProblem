const Analytics = require('../models/analytics');

async function getAnalytics(req, res) {
    try {
        const analytics = await Analytics.findOne();
        if (!analytics) {
            return res.status(404).json({ message: 'Analytics not found' });
        }
        return res.status(200).json(analytics);
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({ message: 'Error fetching analytics' });
    }
}

module.exports = { getAnalytics };
