//account.js

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userID: { type: Number, required: true, unique: true },
    credits: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema);