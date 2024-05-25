// controllers/getAnalyticsController.js

const Logs = require('../models/logs');
const mongoose = require('mongoose');
const moment = require('moment');

async function getAnalytics(req, res) {
    try {
        const logs = await Logs.find();

        let uniqueUsers = new Set();
        let totalCPUTime = 0, minCPUTime = Infinity, maxCPUTime = 0, cpuCount = 0;
        let totalQueueTime = 0, minQueueTime = Infinity, maxQueueTime = 0, queueCount = 0;
        let successCount = 0, failureCount = 0;
        let totalResourceUsage = 0, minResourceUsage = Infinity, maxResourceUsage = 0, resourceCount = 0;
        let resultsCount = 0;

        let cpuTimePerUser = {};
        let queueTimePerUser = {};
        let resourceUsagePerUser = {};

        let totalResourceUsagePerDay = {};
        let totalCPUTimePerDay = {};
        let totalResourceUsagePerHour = Array(24).fill(0);
        let totalCPUTimePerHour = Array(24).fill(0);
        let newUsersPerDay = {};

        const now = moment();
        const last24Hours = now.clone().subtract(24, 'hours');

        // Process logs to calculate analytics
        logs.forEach(log => {
            const executionDate = moment(log.executionTimestamp).startOf('day').format('YYYY-MM-DD');
            const executionHour = moment(log.executionTimestamp).hour();
            const executionTimestamp = moment(log.executionTimestamp);

            if (log.eventType === 'user') {
                uniqueUsers.add(log.userId.toString());
                // New users per day
                newUsersPerDay[executionDate] = (newUsersPerDay[executionDate] || 0) + 1;
            } else if (log.eventType === 'results') {
                const userId = log.userId.toString();

                // CPU Time calculations
                if (log.cpuTime !== undefined) {
                    const cpuTime = log.cpuTime;
                    totalCPUTime += cpuTime;
                    cpuCount++;
                    if (cpuTime < minCPUTime) minCPUTime = cpuTime;
                    if (cpuTime > maxCPUTime) maxCPUTime = cpuTime;

                    if (!cpuTimePerUser[userId]) {
                        cpuTimePerUser[userId] = { totalCPUTime: 0, count: 0 };
                    }
                    cpuTimePerUser[userId].totalCPUTime += cpuTime;
                    cpuTimePerUser[userId].count++;

                    // Total CPU time per day
                    totalCPUTimePerDay[executionDate] = (totalCPUTimePerDay[executionDate] || 0) + cpuTime;

                    // Total CPU time per hour for the last 24 hours
                    if (executionTimestamp.isAfter(last24Hours)) {
                        totalCPUTimePerHour[executionHour] += cpuTime;
                    }
                }

                // Queue Time calculations
                if (log.queueTime !== undefined) {
                    const queueTime = log.queueTime;
                    totalQueueTime += queueTime;
                    queueCount++;
                    if (queueTime < minQueueTime) minQueueTime = queueTime;
                    if (queueTime > maxQueueTime) maxQueueTime = queueTime;

                    if (!queueTimePerUser[userId]) {
                        queueTimePerUser[userId] = { totalQueueTime: 0, count: 0 };
                    }
                    queueTimePerUser[userId].totalQueueTime += queueTime;
                    queueTimePerUser[userId].count++;
                }

                // Success/Failure calculations
                if (log.label === 'success') {
                    successCount++;
                } else if (log.label === 'fail') {
                    failureCount++;
                }

                // Resource Usage calculations
                if (log.resourceUsage !== undefined) {
                    const resourceUsage = log.resourceUsage;
                    totalResourceUsage += resourceUsage;
                    resourceCount++;
                    if (resourceUsage < minResourceUsage) minResourceUsage = resourceUsage;
                    if (resourceUsage > maxResourceUsage) maxResourceUsage = resourceUsage;

                    if (!resourceUsagePerUser[userId]) {
                        resourceUsagePerUser[userId] = { totalResourceUsage: 0, count: 0 };
                    }
                    resourceUsagePerUser[userId].totalResourceUsage += resourceUsage;
                    resourceUsagePerUser[userId].count++;

                    // Total resource usage per day
                    totalResourceUsagePerDay[executionDate] = (totalResourceUsagePerDay[executionDate] || 0) + resourceUsage;

                    // Total resource usage per hour for the last 24 hours
                    if (executionTimestamp.isAfter(last24Hours)) {
                        totalResourceUsagePerHour[executionHour] += resourceUsage;
                    }
                }

                resultsCount++;
            }
        });

        // Calculate averages per user
        const averageCPUTimePerUser = Object.keys(cpuTimePerUser).map(userId => ({
            userId,
            averageCPUTime: cpuTimePerUser[userId].count ? (cpuTimePerUser[userId].totalCPUTime / cpuTimePerUser[userId].count) : 0,
            totalCPUTime: cpuTimePerUser[userId].totalCPUTime
        }));

        const averageQueueTimePerUser = Object.keys(queueTimePerUser).map(userId => ({
            userId,
            averageQueueTime: queueTimePerUser[userId].count ? (queueTimePerUser[userId].totalQueueTime / queueTimePerUser[userId].count) : 0,
            totalQueueTime: queueTimePerUser[userId].totalQueueTime
        }));

        const averageResourceUsagePerUser = Object.keys(resourceUsagePerUser).map(userId => ({
            userId,
            averageResourceUsage: resourceUsagePerUser[userId].count ? (resourceUsagePerUser[userId].totalResourceUsage / resourceUsagePerUser[userId].count) : 0,
            totalResourceUsage: resourceUsagePerUser[userId].totalResourceUsage
        }));

        // Calculate overall averages
        const averageCPUTime = cpuCount ? (totalCPUTime / cpuCount) : 0;
        const averageQueueTime = queueCount ? (totalQueueTime / queueCount) : 0;
        const averageResourceUsage = resourceCount ? (totalResourceUsage / resourceCount) : 0;
        const throughput = resultsCount / (24 * 60); // Assuming logs are within a 24-hour timeframe

        // Construct analytics response
        const analytics = {
            uniqueUsers: uniqueUsers.size,
            averageCPUTime,
            minCPUTime: cpuCount ? minCPUTime : 0,
            maxCPUTime: cpuCount ? maxCPUTime : 0,
            averageQueueTime,
            minQueueTime: queueCount ? minQueueTime : 0,
            maxQueueTime: queueCount ? maxQueueTime : 0,
            throughput,
            successRate: resultsCount ? (successCount / resultsCount) : 0,
            averageResourceUsage,
            minResourceUsage: resourceCount ? minResourceUsage : 0,
            maxResourceUsage: resourceCount ? maxResourceUsage : 0,
            successCount,
            failureCount,
            averageCPUTimePerUser,
            averageQueueTimePerUser,
            averageResourceUsagePerUser,
            totalCPUTimePerUser: averageCPUTimePerUser.map(user => ({ userId: user.userId, totalCPUTime: user.totalCPUTime })),
            totalQueueTimePerUser: averageQueueTimePerUser.map(user => ({ userId: user.userId, totalQueueTime: user.totalQueueTime })),
            totalResourceUsagePerUser: averageResourceUsagePerUser.map(user => ({ userId: user.userId, totalResourceUsage: user.totalResourceUsage })),
            totalResourceUsagePerDay,
            totalCPUTimePerDay,
            totalResourceUsagePerHour,
            totalCPUTimePerHour,
            newUsersPerDay
        };

        return res.status(200).json(analytics);
    } catch (error) {
        console.error('Error calculating analytics:', error);
        return res.status(500).json({ message: 'Error calculating analytics' });
    }
}

module.exports = { getAnalytics };
