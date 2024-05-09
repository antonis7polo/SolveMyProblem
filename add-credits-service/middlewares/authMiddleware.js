// const User = require('../models/User'); // Ensure this points to your User model
//
// async function authMiddleware(req, res, next) {
//     // Check for a username in the request body
//     const username = req.body.username;
//
//     if (!username) {
//         return res.status(400).send('Username is required');
//     }
//
//     try {
//         // Find the user in the database by username
//         const user = await User.findOne({ username: username });
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//
//         // Set the user ID on the request object
//         req.user = { id: user._id };
//         next();
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).send('Server error');
//     }
// }
//
// module.exports = authMiddleware;