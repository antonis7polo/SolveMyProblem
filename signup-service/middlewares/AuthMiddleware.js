const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated', type: 'error' });
    }

    const token = authHeader.split(' ')[1]; 
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET_JWT);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to authenticate token.', type: 'error' });
    }

    if (!decodedToken) {
        return res.status(401).json({ message: 'Not authenticated', type: 'error' });
    }

    try {
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found.', type: 'error' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.', type: 'error' });
    }
};
