const express = require('express');
const router = express.Router();
const modifySubmissionsController = require('../controllers/modifySubmissionsController');
const originAuth = require('../middlewares/originMiddleware');
const auth = require('../middlewares/authMiddleware');

router.post('/create', modifySubmissionsController.createSubmission);
router.delete('/delete/:id', modifySubmissionsController.deleteSubmission);

module.exports = router;