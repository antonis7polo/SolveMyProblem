const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: {
        type: String,
        enum: ['not_ready', 'ready', 'completed', 'failed', 'in_progress'],
        default: 'not_ready'
    },
    userId: { type: Number, required: true, index: true },
    inputData: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
