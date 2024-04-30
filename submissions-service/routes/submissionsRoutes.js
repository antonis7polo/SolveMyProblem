//submissionRoutes.js

const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissionsController');
const originAuth = require('../middlewares/originMiddleware');
const auth = require('../middlewares/authMiddleware');


router.get('/submission/:userId', submissionsController.getSubmissionsByUserId);
router.get('/submission', submissionsController.getAllSubmissions);
router.get('/submission/data/:id', submissionsController.getSubmissionDataById);

module.exports = router;
