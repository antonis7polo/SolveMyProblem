const jwt = require('jsonwebtoken');
const Result = require('../models/result');

const ensureCorrectUser = async (req, res, next) => {
    const authHeader = req.header('X-OBSERVATORY-AUTH');
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated', type: 'error' });
    }

    const token = authHeader;
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

    const userIdFromToken = decodedToken.user.id;
    const isAdmin = decodedToken.user.isAdmin;

    try {
        const result = await Result.findOne({ submissionId: req.params.id });

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        if (isAdmin || userIdFromToken === result.userId.toString()) {
            req.user = decodedToken.user;
            req.result = result;
            return next();
        }

        return res.status(403).json({ message: 'Not authorized', type: 'error' });

    } catch (error) {
        console.error('Error fetching result:', error);
        return res.status(500).json({ message: 'Internal server error', type: 'error' });
    }
};

module.exports = ensureCorrectUser;
