const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    credits: { type: Number, default: 0 }
}, { collection: 'Users' });

const User = mongoose.model('User', userSchema);

module.exports = User;