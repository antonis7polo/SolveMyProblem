const { body } = require('express-validator');
const User = require('../models/user');

module.exports = [
    body('username')
        .not().isEmpty().withMessage('Username field is mandatory')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
        .isAlpha().withMessage('Username must contain only letters'),

    body('email')
        .not().isEmpty().withMessage('Email field is mandatory')
        .isEmail().withMessage('Email is not valid')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            return true;
        }),

    body('password')
        .not().isEmpty().withMessage('Password field is mandatory')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('repassword')
        .not().isEmpty().withMessage('Confirm password field is mandatory')
        .isLength({ min: 6 }).withMessage('Confirm password must be at least 6 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
];