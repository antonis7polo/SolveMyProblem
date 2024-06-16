const express = require('express');
const router = express.Router();
const {  getUserData } = require('../controllers/userController');
const { createUser } = require('../controllers/signUpController');
const { createAdminUser } = require('../controllers/adminController');
const signUpValidator = require('../validator/signUpValidator');
const originAuthMiddleware = require('../middlewares/originAuthMiddleware');
const ensureCorrectUser = require('../middlewares/correctUserMiddleware');
const { login } = require('../controllers/loginController')
const { checkHealth } = require('../controllers/healthCheckController');

router.get('/health', checkHealth);
router.post('/signup',originAuthMiddleware, signUpValidator, createUser);
router.post('/login',originAuthMiddleware, login);
router.get('/user/:id',originAuthMiddleware, ensureCorrectUser, getUserData);
router.post('/create-admin', originAuthMiddleware, createAdminUser);




module.exports = router

