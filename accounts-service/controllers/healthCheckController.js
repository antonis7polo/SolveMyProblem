// controllers/healthCheckController.js
const checkHealth = (req, res) => {
    res.status(200).json({ status: 'Healthy', service: 'Account Microservice' });
};

module.exports = { checkHealth };
