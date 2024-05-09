// controllers/getAnalyticsController.js

const Logs = require('../models/logs');

async function getAnalytics(req, res) {
    try {
        const logs = await Logs.find();

        let uniqueUsers = new Set();
        let totalCPUTime = 0, minCPUTime = Infinity, maxCPUTime = 0, cpuCount = 0;
        let totalQueueTime = 0, minQueueTime = Infinity, maxQueueTime = 0, queueCount = 0;
        let successCount = 0, failureCount = 0;
        let totalResourceUsage = 0, minResourceUsage = Infinity, maxResourceUsage = 0, resourceCount = 0;
        let resultsCount = 0;

        // Process logs to calculate analytics
        logs.forEach(log => {
            if (log.eventType === 'user') {
                uniqueUsers.add(log.userId.toString());
            } else if (log.eventType === 'results') {
                // CPU Time calculations
                if (log.cpuTime !== undefined) {
                    const cpuTime = log.cpuTime;
                    totalCPUTime += cpuTime;
                    cpuCount++;
                    if (cpuTime < minCPUTime) minCPUTime = cpuTime;
                    if (cpuTime > maxCPUTime) maxCPUTime = cpuTime;
                }

                // Queue Time calculations
                if (log.queueTime !== undefined) {
                    const queueTime = log.queueTime;
                    totalQueueTime += queueTime;
                    queueCount++;
                    if (queueTime < minQueueTime) minQueueTime = queueTime;
                    if (queueTime > maxQueueTime) maxQueueTime = queueTime;
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
                }

                resultsCount++;
            }
        });

        // Calculate averages
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
            maxResourceUsage: resourceCount ? maxResourceUsage : 0
        };

        return res.status(200).json(analytics);
    } catch (error) {
        console.error('Error calculating analytics:', error);
        return res.status(500).json({ message: 'Error calculating analytics' });
    }
}

module.exports = { getAnalytics };
