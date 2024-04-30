const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    submissionId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    name: String,
    userId: Number,
    results: String,
} , { timestamps: true });

module.exports = mongoose.models.Result || mongoose.model('Result', resultSchema);


