//resultRoutes.js
const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const originAuth = require('../middlewares/originAuthMiddleware');
const ensureCorrectUser = require('../middlewares/correctUserMiddleware');

router.get('/result/:id',originAuth, ensureCorrectUser,  resultsController.getResultById);

module.exports = router;
