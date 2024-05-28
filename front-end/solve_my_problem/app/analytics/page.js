// app/analytics/page.js
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Analytics = () => {
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('http://localhost:3007/analytics', {
                    headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token') }
                });

                const data = response.data;

                data.totalCPUTimePerHour = rotateHourlyData(data.totalCPUTimePerHour);
                data.totalResourceUsagePerHour = rotateHourlyData(data.totalResourceUsagePerHour);
    
                setAnalytics(response.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const getLastNDays = (n) => {
        const today = new Date();
        return Array.from({ length: n }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();
    };

    const rotateHourlyData = (data) => {
        const now = new Date();
        const currentHour = now.getHours();
        return data.slice(currentHour + 1).concat(data.slice(0, currentHour + 1));
    };

    const getLast24Hours = () => {
        const now = new Date();
        const labels = [];
        for (let i = 0; i < 24; i++) {
            const hour = new Date(now);
            hour.setHours(now.getHours() - i + 3);  //x axis was -3 from current hour (added 3)
            labels.push(hour.toISOString().slice(11, 13) + ':00');
        }
        return labels.reverse();
    };


    const formatDataForChart = (data, label) => {
        return {
            labels: Object.keys(data),
            datasets: [
                {
                    label: label,
                    data: Object.values(data),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const last31Days = getLastNDays(31);
    const last24Hours = getLast24Hours();

    const analyticsForTable = [
        'uniqueUsers',
        'averageCPUTime',
        'minCPUTime',
        'maxCPUTime',
        'averageQueueTime',
        'minQueueTime',
        'maxQueueTime',
        'throughput',
        'successRate',
        'successCount',
        'failureCount',
        'averageResourceUsage',
        'minResourceUsage',
        'maxResourceUsage',
    ];

    return (
        <div>
            <h1>Analytics</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Analytic</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsForTable.map(key => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{analytics[key]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>Charts</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ width: '600px' }}>
                            <h3>Success vs Failure</h3>
                            <Bar
                                data={{
                                    labels: ['Success', 'Failure'],
                                    datasets: [
                                        {
                                            label: 'Count',
                                            data: [analytics.successCount, analytics.failureCount],
                                            backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(255, 99, 132, 0.4)'],
                                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total CPU Time per User</h3>
                            <Bar
                                data={{
                                    labels: analytics.totalCPUTimePerUser?.map(user => user.userId) || [],
                                    datasets: [
                                        {
                                            label: 'Total CPU Time',
                                            data: analytics.totalCPUTimePerUser?.map(user => user.totalCPUTime) || [],
                                            backgroundColor: 'rgba(75, 192, 192, 0.4)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total Queue Time per User</h3>
                            <Bar
                                data={{
                                    labels: analytics.totalQueueTimePerUser?.map(user => user.userId) || [],
                                    datasets: [
                                        {
                                            label: 'Total Queue Time',
                                            data: analytics.totalQueueTimePerUser?.map(user => user.totalQueueTime) || [],
                                            backgroundColor: 'rgba(153, 102, 255, 0.4)',
                                            borderColor: 'rgba(153, 102, 255, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total Resource Usage per User</h3>
                            <Bar
                                data={{
                                    labels: analytics.totalResourceUsagePerUser?.map(user => user.userId) || [],
                                    datasets: [
                                        {
                                            label: 'Total Resource Usage',
                                            data: analytics.totalResourceUsagePerUser?.map(user => user.totalResourceUsage) || [],
                                            backgroundColor: 'rgba(255, 206, 86, 0.4)',
                                            borderColor: 'rgba(255, 206, 86, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Average CPU Time per User</h3>
                            <Bar
                                data={{
                                    labels: analytics.averageCPUTimePerUser?.map(user => user.userId) || [],
                                    datasets: [
                                        {
                                            label: 'Average CPU Time',
                                            data: analytics.averageCPUTimePerUser?.map(user => user.averageCPUTime) || [],
                                            backgroundColor: 'rgba(75, 192, 192, 0.4)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Average Queue Time per User</h3>
                            <Bar
                                data={{
                                    labels: analytics.averageQueueTimePerUser?.map(user => user.userId) || [],
                                    datasets: [
                                        {
                                            label: 'Average Queue Time',
                                            data: analytics.averageQueueTimePerUser?.map(user => user.averageQueueTime) || [],
                                            backgroundColor: 'rgba(153, 102, 255, 0.4)',
                                            borderColor: 'rgba(153, 102, 255, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Average Resource Usage per User</h3>
                            <Bar
                                data={{
                                    labels: analytics.averageResourceUsagePerUser?.map(user => user.userId) || [],
                                    datasets: [
                                        {
                                            label: 'Average Resource Usage',
                                            data: analytics.averageResourceUsagePerUser?.map(user => user.averageResourceUsage) || [],
                                            backgroundColor: 'rgba(255, 206, 86, 0.4)',
                                            borderColor: 'rgba(255, 206, 86, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total Resource Usage per Day (Last Month)</h3>
                            <Bar
                                data={{
                                    labels: last31Days,
                                    datasets: [
                                        {
                                            label: 'Total Resource Usage',
                                            data: last31Days.map(day => analytics.totalResourceUsagePerDay?.[day] || 0),
                                            backgroundColor: 'rgba(255, 159, 64, 0.4)',
                                            borderColor: 'rgba(255, 159, 64, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total CPU Time per Day (Last Month)</h3>
                            <Bar
                                data={{
                                    labels: last31Days,
                                    datasets: [
                                        {
                                            label: 'Total CPU Time',
                                            data: last31Days.map(day => analytics.totalCPUTimePerDay?.[day] || 0),
                                            backgroundColor: 'rgba(54, 162, 235, 0.4)',
                                            borderColor: 'rgba(54, 162, 235, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total Resource Usage per Hour (Last 24 Hours)</h3>
                            <Bar
                                data={{
                                    labels: last24Hours,
                                    datasets: [
                                        {
                                            label: 'Total Resource Usage',
                                            data: analytics.totalResourceUsagePerHour,
                                            backgroundColor: 'rgba(255, 159, 64, 0.4)',
                                            borderColor: 'rgba(255, 159, 64, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>Total CPU Time per Hour (Last 24 Hours)</h3>
                            <Bar
                                data={{
                                    labels: last24Hours,
                                    datasets: [
                                        {
                                            label: 'Total CPU Time',
                                            data: analytics.totalCPUTimePerHour,
                                            backgroundColor: 'rgba(54, 162, 235, 0.4)',
                                            borderColor: 'rgba(54, 162, 235, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <h3>New Users per Day (Last Month)</h3>
                            <Bar
                                data={{
                                    labels: last31Days,
                                    datasets: [
                                        {
                                            label: 'New Users',
                                            data: last31Days.map(day => analytics.newUsersPerDay?.[day] || 0),
                                            backgroundColor: 'rgba(153, 102, 255, 0.4)',
                                            borderColor: 'rgba(153, 102, 255, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Analytics;
