// models/logs.js
const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ['user', 'results'],
        required: true
    },
    userId: {
        //type: Number,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: function() {
            return this.eventType === 'results';
        }
    },
    name: {
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
    resultsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: function() {
            return this.eventType === 'results' && this.label === 'success';
        }
    },
    creditsUsed: {
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
