// controllers/healthCheckController.js
const checkHealth = (req, res) => {
    res.status(200).json({ status: 'Healthy', service: 'Modify Submissions Microservice' });
};

module.exports = { checkHealth };
