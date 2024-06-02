const User = require("../models/user");

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