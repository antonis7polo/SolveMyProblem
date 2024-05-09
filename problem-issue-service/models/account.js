const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, required: true, unique: true },
    credits: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema);
