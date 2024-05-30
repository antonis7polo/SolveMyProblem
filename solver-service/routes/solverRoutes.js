// routes/solverRoutes.js
const express = require('express');
const router = express.Router();

const originAuthMiddleware = require('../middlewares/originAuthMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', originAuthMiddleware, checkHealth);

module.exports = router;
