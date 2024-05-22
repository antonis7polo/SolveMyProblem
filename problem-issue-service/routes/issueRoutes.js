//issueRoutes.js

const express = require('express');
const router = express.Router();
const issueController = require('../controllers/runProblemController');
const originAuth = require('../middlewares/originAuthMiddleware');
const auth = require('../middlewares/authMiddleware');


router.post('/run',auth, issueController.runProblem);

module.exports = router;
