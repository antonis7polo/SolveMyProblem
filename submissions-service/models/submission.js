const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: {
        type: String,
        enum: ['not_ready', 'ready', 'completed', 'failed', 'in_progress'],
        default: 'not_ready'
    },
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    username: { type: String, required: true },
    inputData: {
        parameters: { type: Buffer },
        parametersMetadata: {
            size: { type: Number },
            type: { type: String }
        },
        solver: { type: Buffer },
        solverMetadata: {
            size: { type: Number },
            type: { type: String }
        },
        numVehicles: { type: Number },
        depot: { type: Number },
        maxDistance: { type: Number }
    },
    submissionTimestamp: { type: Date }
}, { timestamps: true });

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);