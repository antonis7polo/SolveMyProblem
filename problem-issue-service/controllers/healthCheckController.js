// controllers/healthCheckController.js
const checkHealth = (req, res) => {
    res.status(200).json({ status: 'Healthy', service: 'Problem Issue Microservice' });
};

module.exports = { checkHealth };
