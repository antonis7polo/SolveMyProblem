// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();

const { getAnalytics } = require('../controllers/getAnalyticsController');
const isAdmin = require('../middlewares/adminMiddleware');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.get('/analytics',originAuthMiddleware, isAdmin, getAnalytics);

module.exports = router;
