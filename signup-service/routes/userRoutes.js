const express = require('express');
const router = express.Router();
const { createUser, getUserData } = require('../controllers/userController');
const signUpValidator = require('../validation/signUpValidator');
const AuthMiddleware = require('../middlewares/authMiddleware');
const { login } = require('../controllers/loginController')


router.post('/signup', signUpValidator, createUser);
router.post('/login', login);
router.get('/user/:id', AuthMiddleware, getUserData)

module.exports = router;