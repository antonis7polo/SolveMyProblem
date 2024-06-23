const jwt = require('jsonwebtoken');

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
    const userIdFromParams = req.params.id;
    const isAdmin = decodedToken.user.isAdmin;

    if (isAdmin) {
        req.user = decodedToken.user;
        return next();
    }


    if (userIdFromParams && userIdFromToken !== userIdFromParams) {
        return res.status(403).json({ message: 'Not authorized', type: 'error' });
    }

    req.user = decodedToken.user;
    next();
};

module.exports = ensureCorrectUser;
