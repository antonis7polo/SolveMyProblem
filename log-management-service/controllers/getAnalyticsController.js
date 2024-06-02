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
        let totalCreditsUsed = 0, minCreditsUsed = Infinity, maxCreditsUsed = 0, creditsCount = 0;
        let resultsCount = 0;

        let cpuTimePerUser = {};
        let queueTimePerUser = {};
        let creditsUsedPerUser = {};

        let totalCreditsUsedPerDay = {};
        let totalCPUTimePerDay = {};
        let totalQueueTimePerDay = {};
        let totalCreditsUsedPerHour = Array(24).fill(0);
        let totalCPUTimePerHour = Array(24).fill(0);
        let totalQueueTimePerHour = Array(24).fill(0);
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

                    // Total queue time per day
                    totalQueueTimePerDay[executionDate] = (totalQueueTimePerDay[executionDate] || 0) + queueTime;

                    // Total queue time per hour for the last 24 hours
                    if (executionTimestamp.isAfter(last24Hours)) {
                        totalQueueTimePerHour[executionHour] += queueTime;
                    }
                }

                // Success/Failure calculations
                if (log.label === 'success') {
                    successCount++;
                } else if (log.label === 'fail') {
                    failureCount++;
                }

                // credits Usage calculations
                if (log.creditsUsed !== undefined) {
                    const creditsUsed = log.creditsUsed;
                    totalCreditsUsed += creditsUsed;
                    creditsCount++;
                    if (creditsUsed < minCreditsUsed) minCreditsUsed = creditsUsed;
                    if (creditsUsed > maxCreditsUsed) maxCreditsUsed = creditsUsed;

                    if (!creditsUsedPerUser[userId]) {
                        creditsUsedPerUser[userId] = { totalCreditsUsed: 0, count: 0 };
                    }
                    creditsUsedPerUser[userId].totalCreditsUsed += creditsUsed;
                    creditsUsedPerUser[userId].count++;

                    // Total credits usage per day
                    totalCreditsUsedPerDay[executionDate] = (totalCreditsUsedPerDay[executionDate] || 0) + creditsUsed;

                    // Total credits usage per hour for the last 24 hours
                    if (executionTimestamp.isAfter(last24Hours)) {
                        totalCreditsUsedPerHour[executionHour] += creditsUsed;
                    }
                }

                resultsCount++;
            }
        });

        // Fetch all usernames
        const users = await Logs.find({ eventType: 'user' }).select('userId username');

        const userMap = {};
        users.forEach(user => {
            userMap[user.userId.toString()] = user.username;
        });

        // Calculate averages per user and include username
        const averageCPUTimePerUser = Object.keys(cpuTimePerUser).map(userId => ({
            userId,
            username: userMap[userId] || 'Unknown',
            averageCPUTime: cpuTimePerUser[userId].count ? (cpuTimePerUser[userId].totalCPUTime / cpuTimePerUser[userId].count) : 0,
            totalCPUTime: cpuTimePerUser[userId].totalCPUTime
        }));

        const averageQueueTimePerUser = Object.keys(queueTimePerUser).map(userId => ({
            userId,
            username: userMap[userId] || 'Unknown',
            averageQueueTime: queueTimePerUser[userId].count ? (queueTimePerUser[userId].totalQueueTime / queueTimePerUser[userId].count) : 0,
            totalQueueTime: queueTimePerUser[userId].totalQueueTime
        }));

        const averageCreditsUsedPerUser = Object.keys(creditsUsedPerUser).map(userId => ({
            userId,
            username: userMap[userId] || 'Unknown',
            averageCreditsUsed: creditsUsedPerUser[userId].count ? (creditsUsedPerUser[userId].totalCreditsUsed / creditsUsedPerUser[userId].count) : 0,
            totalCreditsUsed: creditsUsedPerUser[userId].totalCreditsUsed
        }));

        // Calculate overall averages
        const averageCPUTime = cpuCount ? (totalCPUTime / cpuCount) : 0;
        const averageQueueTime = queueCount ? (totalQueueTime / queueCount) : 0;
        const averageCreditsUsed = creditsCount ? (totalCreditsUsed / creditsCount) : 0;
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
            averageCreditsUsed,
            minCreditsUsed: creditsCount ? minCreditsUsed : 0,
            maxCreditsUsed: creditsCount ? maxCreditsUsed : 0,
            successCount,
            failureCount,
            averageCPUTimePerUser,
            averageQueueTimePerUser,
            averageCreditsUsedPerUser,
            totalCPUTimePerUser: averageCPUTimePerUser.map(user => ({ userId: user.userId, username: user.username, totalCPUTime: user.totalCPUTime })),
            totalQueueTimePerUser: averageQueueTimePerUser.map(user => ({ userId: user.userId, username: user.username, totalQueueTime: user.totalQueueTime })),
            totalCreditsUsedPerUser: averageCreditsUsedPerUser.map(user => ({ userId: user.userId, username: user.username, totalCreditsUsed: user.totalCreditsUsed })),
            totalCreditsUsedPerDay,
            totalCPUTimePerDay,
            totalQueueTimePerDay,
            totalCreditsUsedPerHour,
            totalCPUTimePerHour,
            totalQueueTimePerHour,
            newUsersPerDay
        };

        return res.status(200).json(analytics);
    } catch (error) {
        console.error('Error calculating analytics:', error);
        return res.status(500).json({ message: 'Error calculating analytics' });
    }
}

module.exports = { getAnalytics };
