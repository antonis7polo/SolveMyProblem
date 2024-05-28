// routes/analyticsRoutes.js
const express = require('express');
const { getAnalytics } = require('../controllers/getAnalyticsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/analytics',authMiddleware, getAnalytics);

module.exports = router;
