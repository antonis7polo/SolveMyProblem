// routes/solverWrapperRoutes.js
const express = require('express');
const router = express.Router();

const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);

module.exports = router;
