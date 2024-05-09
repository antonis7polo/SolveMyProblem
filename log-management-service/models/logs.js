// models/logs.js
const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ['user', 'results'],
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    resultsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: function() {
            return this.eventType === 'results';
        }
    },
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: function() {
            return this.eventType === 'results';
        }
    },
    submissionName: {
        type: String,
        required: function() {
            return this.eventType === 'results';
        }
    },
    label: {
        type: String,
        enum: ['success', 'fail'],
        required: function() {
            return this.eventType === 'results';
        }
    },
    resourceUsage: {
        type: Number,
        required: function() {
            return this.eventType === 'results';
        }
    },
    cpuTime: {
        type: Number,
        required: function() {
            return this.eventType === 'results';
        }
    },
    taskCompletionTime: {
        type: Number,
        required: function() {
            return this.eventType === 'results';
        }
    },
    queueTime: {
        type: Number,
        required: function() {
            return this.eventType === 'results';
        }
    },
    executionTimestamp: { type: Date, required: true }
}, { timestamps: true });

const Logs = mongoose.model('Logs', logsSchema);

module.exports = Logs;
