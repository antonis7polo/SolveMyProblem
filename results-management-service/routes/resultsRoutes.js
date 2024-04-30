//resultRoutes.js

const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const originAuth = require('../middlewares/originMiddleware');
const auth = require('../middlewares/authMiddleware');


router.get('/result/:id', resultsController.getResultById);

module.exports = router;
