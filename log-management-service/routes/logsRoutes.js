// routes/logsRoutes.js
const express = require('express');
const { getLogs } = require('../controllers/getLogsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/logs', authMiddleware, getLogs);

module.exports = router;
