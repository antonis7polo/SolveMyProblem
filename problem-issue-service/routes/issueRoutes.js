//issueRoutes.js

const express = require('express');
const router = express.Router();
const issueController = require('../controllers/runProblemController');
const costController = require('../controllers/calculateCostController');
const auth = require('../middlewares/authMiddleware');
const ensureCorrectUser = require('../middlewares/correctUserMiddleware');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.post('/run',originAuthMiddleware, ensureCorrectUser, issueController.runProblem);
router.get('/cost/:problemId',originAuthMiddleware, auth, costController.getCost);

module.exports = router;
