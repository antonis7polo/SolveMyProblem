const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { publishUserCreated } = require('../config/rabbitMQ');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { username, email, password, isAdmin } = req.body;
        const newUser = new User({ username, email, password, isAdmin });
        await newUser.save();
        

        const executionTimestamp = new Date();
        await publishUserCreated({ userId: newUser._id, username, executionTimestamp: executionTimestamp.toISOString()});

        const token = jwt.sign(
            {
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin
                }
            },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token, user: { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password, ...userData } = user._doc;

        res.status(200).json({ userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }

};


exports.createAdminUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password, isAdmin: true});
        await newUser.save();

        res.status(200).json({ message: 'User created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};