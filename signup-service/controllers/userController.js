const User = require('../models/user');
const { publishUserCreated } = require('../config/rabbitMQ');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();

        
        await publishUserCreated({ username, email });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};