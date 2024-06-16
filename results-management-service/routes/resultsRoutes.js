//resultRoutes.js
const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const originAuth = require('../middlewares/originAuthMiddleware');
const ensureCorrectUser = require('../middlewares/correctUserMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.get('/result/:id',originAuth, ensureCorrectUser,  resultsController.getResultById);

module.exports = router;
