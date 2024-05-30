"use client";

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from '../styles/Analytics.module.css';
import {encrypt} from "../utils/encrypt";

const Analytics = () => {
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const indicatorRef = useRef(null);
    const menuBarRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDiagram, setSelectedDiagram] = useState('averageQueueTime');
    const [selectedLastMonthDiagram, setSelectedLastMonthDiagram] = useState('totalResourceUsagePerDay');
    const [selectedLast24HoursDiagram, setSelectedLast24HoursDiagram] = useState('totalResourceUsagePerHour');
    const [selectedGeneralDiagram, setSelectedGeneralDiagram] = useState('table');





    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('http://localhost:3007/analytics', {
                    headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token'), 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
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

    useEffect(() => {
        if (menuBarRef.current) {
            const activeButton = menuBarRef.current.querySelector(`.${styles.active}`);
            if (activeButton && indicatorRef.current) {
                indicatorRef.current.style.left = `${activeButton.offsetLeft}px`;
                indicatorRef.current.style.width = `${activeButton.offsetWidth}px`;
            }
        }
    }, [selectedCategory]);

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
        setSearchTerm(e.target.value); // Update the search term
        setFilteredUsers(
            analytics.totalCPUTimePerUser
                ?.map(user => user.username)
                ?.filter(username => username.toLowerCase().includes(searchTerm)) || []
        );
    };
    
    const handleUserSelect = (username) => {
        setSelectedUser(username);
        setSearchTerm(username); // Set the search term to the selected username
        setIsDropdownVisible(false);
    };
    
    const toggleDropdown = () => {
        setIsDropdownVisible(true);
    };
    
    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDropdownVisible(false);
        }
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
        'averageResourceUsage',
        'minResourceUsage',
        'maxResourceUsage',
    ];

    const analyticsLabels = {
        uniqueUsers: 'Total Users',
        averageCPUTime: 'Average CPU Time',
        minCPUTime: 'Minimum CPU Time',
        maxCPUTime: 'Maximum CPU Time',
        averageQueueTime: 'Average Queue Time',
        minQueueTime: 'Minimum Queue Time',
        maxQueueTime: 'Maximum Queue Time',
        throughput: 'Throughput',
        successRate: 'Success Rate',
        averageResourceUsage: 'Average Resource Usage',
        minResourceUsage: 'Minimum Resource Usage',
        maxResourceUsage: 'Maximum Resource Usage',
      };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Analytics</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.menuBar} ref={menuBarRef}>
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
                        <div className={styles.indicator} ref={indicatorRef}></div>
                    </div>
                    {selectedCategory === 'general' && (
                        <div className={styles.userAnalyticsContainer}>
                            <div className={styles.userAnalyticsContent}>
                                <div className={styles.diagramMenu}>
                                    <button
                                        className={`${styles.menuButton} ${selectedGeneralDiagram === 'table' ? styles.active : ''}`}
                                        onClick={() => setSelectedGeneralDiagram('table')}
                                    >
                                        Analytics Table
                                    </button>
                                    <button
                                        className={`${styles.menuButton} ${selectedGeneralDiagram === 'successFailure' ? styles.active : ''}`}
                                        onClick={() => setSelectedGeneralDiagram('successFailure')}
                                    >
                                        Success vs Failure
                                    </button>
                                    <button
                                        className={`${styles.menuButton} ${selectedGeneralDiagram === 'newUsers' ? styles.active : ''}`}
                                        onClick={() => setSelectedGeneralDiagram('newUsers')}
                                    >
                                        New Users per Day (Last Month)
                                    </button>
                                </div>
                                <div className={`${styles.chart} ${styles.fixedHeight}`}>
                                    {selectedGeneralDiagram === 'table' && (
                                        <table className={`${styles.table} ${styles.fixedHeight}`}>
                                            <thead>
                                                <tr>
                                                    <th>Analytic</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {analyticsForTable.map(key => (
                                                    <tr key={key}>
                                                        <td>{analyticsLabels[key] || key}</td>
                                                        <td>{analytics[key]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                    {selectedGeneralDiagram === 'successFailure' && (
                                        <div className={styles.pieChart}>
                                            <h4>Success vs Failure</h4>
                                            <Pie
                                                data={{
                                                    labels: ['Success', 'Failure'],
                                                    datasets: [
                                                        {
                                                            label: 'Count',
                                                            data: [analytics.successCount, analytics.failureCount],
                                                            backgroundColor: ['rgba(0, 128, 128, 0.6)', 'rgba(154, 205, 50, 0.6)'],
                                                            borderColor: ['rgba(0, 128, 128, 1)', 'rgba(154, 205, 50, 1)'],
                                                            borderWidth: 1,
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,  // This should be false to ensure proper scaling
                                                }}
                                            />
                                        </div>
                                    )}
                                    {selectedGeneralDiagram === 'newUsers' && (
                                        <div className={styles.chart}>
                                            <h4>New Users per Day (Last Month)</h4>
                                            <Bar
                                                data={{
                                                    labels: last31Days,
                                                    datasets: [
                                                        {
                                                            label: 'New Users',
                                                            data: last31Days.map(day => analytics.newUsersPerDay?.[day] || 0),
                                                            backgroundColor: 'rgba(0, 128, 128, 0.6)', // Blue-Green
                                                            borderColor: 'rgba(0, 128, 128, 1)',
                                                            borderWidth: 1,
                                                        },
                                                    ],
                                                }}
                                                width={600}
                                                height={400}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedCategory === 'last24Hours' && (
                        <div className={styles.userAnalyticsContainer}>
                            <div className={styles.userAnalyticsContent}>
                                <div className={styles.diagramMenu}>
                                    <button
                                        className={`${styles.menuButton} ${selectedLast24HoursDiagram === 'totalResourceUsagePerHour' ? styles.active : ''}`}
                                        onClick={() => setSelectedLast24HoursDiagram('totalResourceUsagePerHour')}
                                    >
                                        Total Resource Usage per Hour
                                    </button>
                                    <button
                                        className={`${styles.menuButton} ${selectedLast24HoursDiagram === 'totalCPUTimePerHour' ? styles.active : ''}`}
                                        onClick={() => setSelectedLast24HoursDiagram('totalCPUTimePerHour')}
                                    >
                                        Total CPU Time per Hour
                                    </button>
                                    <button
                                        className={`${styles.menuButton} ${selectedLast24HoursDiagram === 'totalQueueTimePerHour' ? styles.active : ''}`}
                                        onClick={() => setSelectedLast24HoursDiagram('totalQueueTimePerHour')}
                                    >
                                        Total Queue Time per Hour
                                    </button>
                                </div>
                                <div className={styles.chart}>
                                    <h4>
                                        {selectedLast24HoursDiagram.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('C P U', 'CPU')}
                                    </h4>
                                    <Bar
                                        data={{
                                            labels: last24Hours,
                                            datasets: [
                                                {
                                                    label: selectedLast24HoursDiagram.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('C P U', 'CPU'),
                                                    data: analytics[selectedLast24HoursDiagram],
                                                    backgroundColor: 'rgba(0, 128, 128, 0.6)', // Blue-Green
                                                    borderColor: 'rgba(0, 128, 128, 1)',
                                                    borderWidth: 1,
                                                },
                                            ],
                                        }}
                                        width={600}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedCategory === 'lastMonth' && (
                        <div className={styles.userAnalyticsContainer}>
                            <div className={styles.userAnalyticsContent}>
                                <div className={styles.diagramMenu}>
                                    <button
                                        className={`${styles.menuButton} ${selectedLastMonthDiagram === 'totalResourceUsagePerDay' ? styles.active : ''}`}
                                        onClick={() => setSelectedLastMonthDiagram('totalResourceUsagePerDay')}
                                    >
                                        Total Resource Usage per Day
                                    </button>
                                    <button
                                        className={`${styles.menuButton} ${selectedLastMonthDiagram === 'totalCPUTimePerDay' ? styles.active : ''}`}
                                        onClick={() => setSelectedLastMonthDiagram('totalCPUTimePerDay')}
                                    >
                                        Total CPU Time per Day
                                    </button>
                                    <button
                                        className={`${styles.menuButton} ${selectedLastMonthDiagram === 'totalQueueTimePerDay' ? styles.active : ''}`}
                                        onClick={() => setSelectedLastMonthDiagram('totalQueueTimePerDay')}
                                    >
                                        Total Queue Time per Day
                                    </button>
                                </div>
                                <div className={styles.chart}>
                                    <h4>
                                        {selectedLastMonthDiagram.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('C P U', 'CPU')}
                                    </h4>
                                    <Bar
                                        data={{
                                            labels: last31Days,
                                            datasets: [
                                                {
                                                    label: selectedLastMonthDiagram.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('C P U', 'CPU'),
                                                    data: last31Days.map(day => analytics[selectedLastMonthDiagram]?.[day] || 0),
                                                    backgroundColor: 'rgba(0, 128, 128, 0.6)', // Blue-Green
                                                    borderColor: 'rgba(0, 128, 128, 1)',
                                                    borderWidth: 1,
                                                },
                                            ],
                                        }}
                                        width={600}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedCategory === 'userAnalytics' && (
                        <div className={styles.userAnalyticsContainer}>
                            <div className={styles.userSearchContainer} onBlur={handleBlur} tabIndex="0">
                                <input
                                    type="text"
                                    placeholder="Search for a user..."
                                    onChange={handleUserSearch}
                                    onFocus={toggleDropdown}
                                    className={styles.userSearchInput}
                                    value={searchTerm} // Bind the input value to the search term
                                />
                                <ul className={`${styles.userList} ${isDropdownVisible ? styles.visible : ''}`}>
                                    {filteredUsers.length > 0 ? filteredUsers.map((username, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleUserSelect(username)}
                                            className={selectedUser === username ? styles.selected : ''}
                                        >
                                            {username}
                                        </li>
                                    )) : analytics.totalCPUTimePerUser?.map((user, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleUserSelect(user.username)}
                                            className={selectedUser === user.username ? styles.selected : ''}
                                        >
                                            {user.username}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {selectedUser && (
                                <div className={styles.selectedUserText}>
                                    Showing analytics for user: {selectedUser}
                                </div>
                            )}
                            {selectedUser && (
                                <div className={styles.userAnalyticsContent}>
                                    <div className={styles.diagramMenu}>
                                        <button
                                            className={`${styles.menuButton} ${selectedDiagram === 'averageQueueTime' ? styles.active : ''}`}
                                            onClick={() => setSelectedDiagram('averageQueueTime')}
                                        >
                                            Average Queue Time
                                        </button>
                                        <button
                                            className={`${styles.menuButton} ${selectedDiagram === 'totalQueueTime' ? styles.active : ''}`}
                                            onClick={() => setSelectedDiagram('totalQueueTime')}
                                        >
                                            Total Queue Time
                                        </button>
                                        <button
                                            className={`${styles.menuButton} ${selectedDiagram === 'averageCPUTime' ? styles.active : ''}`}
                                            onClick={() => setSelectedDiagram('averageCPUTime')}
                                        >
                                            Average CPU Time
                                        </button>
                                        <button
                                            className={`${styles.menuButton} ${selectedDiagram === 'totalCPUTime' ? styles.active : ''}`}
                                            onClick={() => setSelectedDiagram('totalCPUTime')}
                                        >
                                            Total CPU Time
                                        </button>
                                        <button
                                            className={`${styles.menuButton} ${selectedDiagram === 'averageResourceUsage' ? styles.active : ''}`}
                                            onClick={() => setSelectedDiagram('averageResourceUsage')}
                                        >
                                            Average Resource Usage
                                        </button>
                                        <button
                                            className={`${styles.menuButton} ${selectedDiagram === 'totalResourceUsage' ? styles.active : ''}`}
                                            onClick={() => setSelectedDiagram('totalResourceUsage')}
                                        >
                                            Total Resource Usage
                                        </button>
                                    </div>
                                    <div className={styles.chart}>
                                        <h4>
                                            {selectedDiagram.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('C P U', 'CPU')}
                                        </h4>
                                        <Bar
                                            data={{
                                                labels: [selectedUser, 'Average'],
                                                datasets: [
                                                    {
                                                        label: selectedDiagram.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('C P U', 'CPU'),
                                                        data: [
                                                            analytics[`${selectedDiagram}PerUser`].find(user => user.username === selectedUser)[selectedDiagram] || 0,
                                                            analytics[`${selectedDiagram}PerUser`].reduce((sum, user) => sum + user[selectedDiagram], 0) / analytics[`${selectedDiagram}PerUser`].length || 0,
                                                        ],
                                                        backgroundColor: ['rgba(0, 128, 128, 0.6)', 'rgba(154, 205, 50, 0.6)'],
                                                        borderColor: ['rgba(0, 128, 128, 1)', 'rgba(154, 205, 50, 1)'],
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            width={300}
                                            height={100}
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
