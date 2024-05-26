const express = require('express');
const router = express.Router();
const { createUser, getUserData } = require('../controllers/userController');
const signUpValidator = require('../validator/signUpValidator');
const AuthMiddleware = require('../middlewares/authMiddleware');
const { login } = require('../controllers/loginController')
const { addCredits } = require('../controllers/manageCreditsController');

router.post('/signup', signUpValidator, createUser);
// router.post('/signup', (req, res) => {
//     res.status(200).json({ message: 'Signup endpoint works!' });
// });
router.post('/login', login);
// router.get('/user/:id', AuthMiddleware, getUserData);
router.get('/user/:id',AuthMiddleware, getUserData);
router.post('/credits', AuthMiddleware, addCredits);


module.exports = router;