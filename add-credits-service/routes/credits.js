// routes/credits.js
const express = require('express');
const router = express.Router();
const creditController = require('../controllers/addCreditsController');
const ensureCorrectUser = require('../middlewares/correctUserMiddleware');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.post('/add',originAuthMiddleware, ensureCorrectUser, creditController.addCredits);

module.exports = router;
