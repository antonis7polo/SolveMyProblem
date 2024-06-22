// models/analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    uniqueUsers: Number,
    averageCPUTime: Number,
    minCPUTime: Number,
    maxCPUTime: Number,
    averageQueueTime: Number,
    minQueueTime: Number,
    maxQueueTime: Number,
    throughput: Number,
    successRate: Number,
    averageCreditsUsed: Number,
    minCreditsUsed: Number,
    maxCreditsUsed: Number,
    successCount: Number,
    failureCount: Number,
    averageCPUTimePerUser: [{
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        averageCPUTime: Number,
        totalCPUTime: Number
    }],
    averageQueueTimePerUser: [{
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        averageQueueTime: Number,
        totalQueueTime: Number
    }],
    averageCreditsUsedPerUser: [{
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        averageCreditsUsed: Number,
        totalCreditsUsed: Number
    }],
    totalCPUTimePerUser: [{
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        totalCPUTime: Number
    }],
    totalQueueTimePerUser: [{
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        totalQueueTime: Number
    }],
    totalCreditsUsedPerUser: [{
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        totalCreditsUsed: Number
    }],
    totalCreditsUsedPerDay: mongoose.Schema.Types.Mixed,
    totalCPUTimePerDay: mongoose.Schema.Types.Mixed,
    totalQueueTimePerDay: mongoose.Schema.Types.Mixed,
    totalCreditsUsedPerHour: [Number],
    totalCPUTimePerHour: [Number],
    totalQueueTimePerHour: [Number],
    newUsersPerDay: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
