// routes/analyticsRoutes.js
const express = require('express');
const { getAnalytics } = require('../controllers/getAnalyticsController');
const isAdmin = require('../middlewares/adminMiddleware');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');

const router = express.Router();

router.get('/analytics',originAuthMiddleware, isAdmin, getAnalytics);

module.exports = router;
