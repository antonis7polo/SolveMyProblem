const User = require('../models/user');
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

        
        await publishUserCreated({ username, email });

        res.status(201).json({ message: 'User created successfully', user: newUser });
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