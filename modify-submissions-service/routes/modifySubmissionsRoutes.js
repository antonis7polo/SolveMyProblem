const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const modifySubmissionsController = require('../controllers/modifySubmissionsController');
const originAuth = require('../middlewares/originAuthMiddleware');
const auth = require('../middlewares/authMiddleware');
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.delete('/delete/:id',originAuth, auth, modifySubmissionsController.deleteSubmission);
router.post('/create',originAuth, auth, upload.fields([{ name: 'pythonFile', maxCount: 1 }, { name: 'jsonFile', maxCount: 1 }]), modifySubmissionsController.uploadFiles);


module.exports = router;

