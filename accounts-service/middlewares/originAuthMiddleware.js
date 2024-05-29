const { decrypt } = require('../config/decrypt');

module.exports = (req, res, next) => {
    const customServicesHeader = req.header('custom-services-header');
    
    if (customServicesHeader) {
        try {
            // Decrypt the header content
            const decrypted = decrypt(JSON.parse(customServicesHeader));

            if (decrypted === process.env.SECRET_STRING_SERVICES) {
                return next();
            } else {
                return res.status(403).json({ message: 'Not allowed origin.', type: 'error' });
            }
        } catch (err) {
            console.error(err);
            return res.status(403).json({ message: 'Invalid or malformed custom services header.', type: 'error' });
        }
    } else {
        return res.status(403).json({ message: 'Missing custom services header.', type: 'error' });
    }
};
