"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from '../styles/Analytics.module.css';

const Analytics = () => {
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('general');
    //const [showLast24Hours, setShowLast24Hours] = useState(false);
    //const [showLastMonth, setShowLastMonth] = useState(false);
    //const [showGeneralAnalytics, setShowGeneralAnalytics] = useState(false);
    //const [showUserAnalytics, setShowUserAnalytics] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

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

    const handleUserSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setFilteredUsers(
            analytics.totalCPUTimePerUser
                ?.map(user => user.username)
                ?.filter(username => username.toLowerCase().includes(searchTerm)) || []
        );
    };

    const handleUserSelect = (username) => {
        setSelectedUser(username);
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
        <div className={styles.container}>
            <h1 className={styles.heading}>Analytics</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.menuBar}>
                        <button
                            onClick={() => setSelectedCategory('general')}
                            className={`${styles.menuButton} ${selectedCategory === 'general' ? styles.active : ''}`}
                        >
                            General Analytics
                        </button>
                        <button
                            onClick={() => setSelectedCategory('last24Hours')}
                            className={`${styles.menuButton} ${selectedCategory === 'last24Hours' ? styles.active : ''}`}
                        >
                            Analytics for Last 24 Hours
                        </button>
                        <button
                            onClick={() => setSelectedCategory('lastMonth')}
                            className={`${styles.menuButton} ${selectedCategory === 'lastMonth' ? styles.active : ''}`}
                        >
                            Analytics for Last Month
                        </button>
                        <button
                            onClick={() => setSelectedCategory('userAnalytics')}
                            className={`${styles.menuButton} ${selectedCategory === 'userAnalytics' ? styles.active : ''}`}
                        >
                            User Analytics
                        </button>
                    </div>
        
                    {selectedCategory === 'general' && (
                        <div className={styles.chartContainer}>
                            <table className={styles.table}>
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
                            <div className={styles.chart}>
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
                            <div className={styles.chart}>
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
                    )}
        
                    {selectedCategory === 'last24Hours' && (
                        <div className={styles.chartContainer}>
                            <div className={styles.chart}>
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
                            <div className={styles.chart}>
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
                            <div className={styles.chart}>
                                <h3>Total Queue Time per Hour (Last 24 Hours)</h3>
                                <Bar
                                    data={{
                                        labels: last24Hours,
                                        datasets: [
                                            {
                                                label: 'Total Queue Time',
                                                data: analytics.totalQueueTimePerHour,
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
                        </div>
                    )}
        
                    {selectedCategory === 'lastMonth' && (
                        <div className={styles.chartContainer}>
                            <div className={styles.chart}>
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
                            <div className={styles.chart}>
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
                            <div className={styles.chart}>
                                <h3>Total Queue Time per Day (Last Month)</h3>
                                <Bar
                                    data={{
                                        labels: last31Days,
                                        datasets: [
                                            {
                                                label: 'Total Queue Time',
                                                data: last31Days.map(day => analytics.totalQueueTimePerDay?.[day] || 0),
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
                    )}
        
                    {selectedCategory === 'userAnalytics' && (
                        <div style={{ marginBottom: '20px' }}>
                            <h2>User Analytics</h2>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Search for a user..."
                                    onChange={handleUserSearch}
                                />
                                <ul className={styles.userList}>
                                    {filteredUsers.length > 0 ? filteredUsers.map((username, index) => (
                                        <li key={index} onClick={() => handleUserSelect(username)}>
                                            {username}
                                        </li>
                                    )) : analytics.totalCPUTimePerUser?.map((user, index) => (
                                        <li key={index} onClick={() => handleUserSelect(user.username)}>
                                            {user.username}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {selectedUser && (
                                <div className={styles.chartContainer}>
                                    <div className={styles.chart}>
                                        <h4>Total Queue Time</h4>
                                        <Bar
                                            data={{
                                                labels: ['User', 'Average'],
                                                datasets: [
                                                    {
                                                        label: 'Total Queue Time',
                                                        data: [
                                                            analytics.totalQueueTimePerUser.find(user => user.username === selectedUser)?.totalQueueTime || 0,
                                                            analytics.totalQueueTimePerUser.reduce((sum, user) => sum + user.totalQueueTime, 0) / analytics.totalQueueTimePerUser.length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)'],
                                                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={600}
                                            height={400}
                                            options={{ indexAxis: 'y' }}
                                        />
                                    </div>
                                    <div className={styles.chart}>
                                        <h4>Average Queue Time</h4>
                                        <Bar
                                            data={{
                                                labels: ['User', 'Average'],
                                                datasets: [
                                                    {
                                                        label: 'Average Queue Time',
                                                        data: [
                                                            analytics.averageQueueTimePerUser.find(user => user.username === selectedUser)?.averageQueueTime || 0,
                                                            analytics.averageQueueTimePerUser.reduce((sum, user) => sum + user.averageQueueTime, 0) / analytics.averageQueueTimePerUser.length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)'],
                                                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={600}
                                            height={400}
                                            options={{ indexAxis: 'y' }}
                                        />
                                    </div>
                                    <div className={styles.chart}>
                                        <h4>Total CPU Time</h4>
                                        <Bar
                                            data={{
                                                labels: ['User', 'Average'],
                                                datasets: [
                                                    {
                                                        label: 'Total CPU Time',
                                                        data: [
                                                            analytics.totalCPUTimePerUser.find(user => user.username === selectedUser)?.totalCPUTime || 0,
                                                            analytics.totalCPUTimePerUser.reduce((sum, user) => sum + user.totalCPUTime, 0) / analytics.totalCPUTimePerUser.length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)'],
                                                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={600}
                                            height={400}
                                            options={{ indexAxis: 'y' }}
                                        />
                                    </div>
                                    <div className={styles.chart}>
                                        <h4>Average CPU Time</h4>
                                        <Bar
                                            data={{
                                                labels: ['User', 'Average'],
                                                datasets: [
                                                    {
                                                        label: 'Average CPU Time',
                                                        data: [
                                                            analytics.averageCPUTimePerUser.find(user => user.username === selectedUser)?.averageCPUTime || 0,
                                                            analytics.averageCPUTimePerUser.reduce((sum, user) => sum + user.averageCPUTime, 0) / analytics.averageCPUTimePerUser.length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)'],
                                                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={600}
                                            height={400}
                                            options={{ indexAxis: 'y' }}
                                        />
                                    </div>
                                    <div className={styles.chart}>
                                        <h4>Total Resource Usage</h4>
                                        <Bar
                                            data={{
                                                labels: ['User', 'Average'],
                                                datasets: [
                                                    {
                                                        label: 'Total Resource Usage',
                                                        data: [
                                                            analytics.totalResourceUsagePerUser.find(user => user.username === selectedUser)?.totalResourceUsage || 0,
                                                            analytics.totalResourceUsagePerUser.reduce((sum, user) => sum + user.totalResourceUsage, 0) / analytics.totalResourceUsagePerUser.length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)'],
                                                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={600}
                                            height={400}
                                            options={{ indexAxis: 'y' }}
                                        />
                                    </div>
                                    <div className={styles.chart}>
                                        <h4>Average Resource Usage</h4>
                                        <Bar
                                            data={{
                                                labels: ['User', 'Average'],
                                                datasets: [
                                                    {
                                                        label: 'Average Resource Usage',
                                                        data: [
                                                            analytics.averageResourceUsagePerUser.find(user => user.username === selectedUser)?.averageResourceUsage || 0,
                                                            analytics.averageResourceUsagePerUser.reduce((sum, user) => sum + user.averageResourceUsage, 0) / analytics.averageResourceUsagePerUser.length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)'],
                                                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={600}
                                            height={400}
                                            options={{ indexAxis: 'y' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>    
    );
};

export default Analytics;
