//submissionRoutes.js

const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissionsController');
const isAdmin = require('../middlewares/adminMiddleware');
const ensureCorrectUserOrAdminForSubmissionsByUserId = require('../middlewares/correctUserMiddlewareUserId');
const ensureCorrectUserOrAdminForSubmissionById = require('../middlewares/correctUserMiddleware');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.get('/submission/:userId',originAuthMiddleware, ensureCorrectUserOrAdminForSubmissionsByUserId,submissionsController.getSubmissionsByUserId);
router.get('/submission', originAuthMiddleware, isAdmin, submissionsController.getAllSubmissions);
router.get('/submission/data/:id', originAuthMiddleware, ensureCorrectUserOrAdminForSubmissionById, submissionsController.getSubmissionDataById);

module.exports = router;
