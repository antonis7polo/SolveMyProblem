const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required', type: 'error' });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Wrong credentials!', type: 'error' });
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(401).json({ message: 'Wrong credentials!', type: 'error' });
        }

        const token = jwt.sign(
            {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.', type: 'error' });
    }
};
