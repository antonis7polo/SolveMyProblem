const { body } = require('express-validator');
const User = require('../models/user');

module.exports = [
    body('username')
        .not().isEmpty().withMessage('Username field is mandatory')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Username must contain only alphanumeric characters')
        .custom(async (username) => {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error('Username already in use');
            }
            return true;
        }),


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

    //body('isAdmin')
        //.not().isEmpty().withMessage('isAdmin field is mandatory')
        //.isBoolean().withMessage('isAdmin must be a boolean')

];