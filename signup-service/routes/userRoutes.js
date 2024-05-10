const express = require('express');
const router = express.Router();
const { createUser, getUserData } = require('../controllers/userController');
const signUpValidator = require('../validator/signUpValidator');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const { login } = require('../controllers/loginController')
const { logout } = require('../controllers/logoutController')
const { getCredits } = require('../controllers/creditsController');


router.post('/signup', signUpValidator, createUser);
router.post('/login', login);
router.post('/logout', AuthMiddleware, logout)
router.post('/users', AuthMiddleware, getUserData)
router.get('/credits', AuthMiddleware, getCredits);

module.exports = router;