//problem.js

const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    submissionId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String, required: true },
    inputData: mongoose.Schema.Types.Mixed,
    userId: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Problem || mongoose.model('Problem', problemSchema);
