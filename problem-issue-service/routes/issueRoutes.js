//issueRoutes.js

const express = require('express');
const router = express.Router();
const issueController = require('../controllers/runProblemController');
const costController = require('../controllers/calculateCostController');
const auth = require('../middlewares/authMiddleware');


router.post('/run',auth, issueController.runProblem);
router.get('/cost/:problemId', auth, costController.getCost);

module.exports = router;
