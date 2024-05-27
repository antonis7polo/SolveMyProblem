// routes/credits.js
const express = require('express');
const router = express.Router();
const creditController = require('../controllers/addCreditsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', creditController.addCredits);

module.exports = router;
