const express = require('express');
const solverController = require('../controllers/solverController');
const router = express.Router();

router.post('/solve', solverController.solveProblem);

module.exports = router;
