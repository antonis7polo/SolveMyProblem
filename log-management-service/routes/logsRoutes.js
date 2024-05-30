// routes/logsRoutes.js
const express = require('express');
const { getLogs } = require('../controllers/getLogsController');
const isAdmin = require('../middlewares/adminMiddleware');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');

const router = express.Router();

//router.get('/logs',originAuthMiddleware, isAdmin, getLogs);
router.get('/logs', getLogs);

module.exports = router;
