exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully', type: 'success' });
};