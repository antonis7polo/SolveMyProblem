const express = require('express');
const router = express.Router();
const { createUser, getUserData, createAdminUser } = require('../controllers/userController');
const signUpValidator = require('../validator/signUpValidator');
const AuthMiddleware = require('../middlewares/authMiddleware');
const { login } = require('../controllers/loginController')

router.post('/signup', signUpValidator, createUser);
router.post('/login', login);
router.get('/user/:id', AuthMiddleware, getUserData);
router.post('/create-admin', createAdminUser);



module.exports = router;