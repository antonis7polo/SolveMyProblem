//submissionRoutes.js

const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissionsController');
const originAuth = require('../middlewares/originAuthMiddleware');
const auth = require('../middlewares/authMiddleware');


router.get('/submission/:userId',auth, submissionsController.getSubmissionsByUserId);
router.get('/submission',auth, submissionsController.getAllSubmissions);
router.get('/submission/data/:id',auth, submissionsController.getSubmissionDataById);

module.exports = router;
