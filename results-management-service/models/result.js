const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new mongoose.Schema({
    submissionId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    name: String,
    userId: {type: Schema.Types.ObjectId, required: true, unique: true},
    results: String,
} , { timestamps: true });

module.exports = mongoose.models.Result || mongoose.model('Result', resultSchema);


