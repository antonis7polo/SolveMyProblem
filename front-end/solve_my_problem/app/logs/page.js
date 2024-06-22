"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { encrypt } from "../utils/encrypt";
import withAuth from '../utils/withAuth';
import styles from '../styles/Logs.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        eventType: 'results',
        username: '',
        submissionId: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(isAdmin);

        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3007/logs', {
                    headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token'), 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
                });
                setLogs(response.data);
                setFilteredLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    useEffect(() => {
        let filtered = logs;

        if (filters.eventType) {
            filtered = filtered.filter(log => log.eventType === filters.eventType);
        }
        if (filters.username) {
            filtered = filtered.filter(log => log.username.toLowerCase().includes(filters.username.toLowerCase()));
        }
        if (filters.submissionId) {
            filtered = filtered.filter(log => log.submissionId && log.submissionId.toString().startsWith(filters.submissionId));
        }

        setFilteredLogs(filtered);
    }, [filters, logs]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const getEventTypeLabel = (eventType) => {
        switch (eventType) {
            case 'user':
                return 'User Created';
            case 'results':
                return 'Problem Executed';
            default:
                return eventType;
        }
    };

    return (
        <div>
            <Header isAdmin={isAdmin} />
        <div className={styles.container}>
            <h1 className={styles.heading}>Logs</h1>
            <div className={styles.filterContainer}>
                <label className={styles.filterLabel}>
                    Filter by Log Type:
                    <select name="eventType" onChange={handleFilterChange} value={filters.eventType} className={styles.filterInput}>
                        <option value="user">User Created</option>
                        <option value="results">Problem Executed</option>
                    </select>
                </label>
                <label className={styles.filterLabel}>
                    Search by Username:
                    <input type="text" name="username" onChange={handleFilterChange} value={filters.username} className={styles.filterInput} />
                </label>
                {filters.eventType === 'results' && (
                    <label className={styles.filterLabel}>
                        Search by Submission ID:
                        <input type="text" name="submissionId" onChange={handleFilterChange} value={filters.submissionId} className={styles.filterInput} />
                    </label>
                )}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                filters.eventType === 'results' ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Log ID</th>
                                <th>Log Type</th>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Submission ID</th>
                                <th>Submission Name</th>
                                <th>Label</th>
                                <th>Credits Used</th>
                                <th>CPU Time (ms)</th>
                                <th>Task Completion Time (ms)</th>
                                <th>Queue Time (ms)</th>
                                <th>Execution Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log._id}>
                                    <td>{log._id}</td>
                                    <td>{getEventTypeLabel(log.eventType)}</td>
                                    <td>{log.userId}</td>
                                    <td>{log.username}</td>
                                    <td>{log.submissionId || ''}</td>
                                    <td>{log.name || ''}</td>
                                    <td>{log.label || ''}</td>
                                    <td>{log.creditsUsed || ''}</td>
                                    <td>
                                        {log.cpuTime ? Number(log.cpuTime.toFixed(3)).toString() : '0'}
                                    </td>
                                    <td>
                                        {log.taskCompletionTime ? Number(log.taskCompletionTime.toFixed(3)).toString() : '0'}
                                    </td>
                                    <td>
                                        {log.queueTime ? Number(log.queueTime.toFixed(3)).toString() : '0'}
                                    </td>
                                    <td>{new Date(log.executionTimestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Log ID</th>
                                <th>Log Type</th>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Execution Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log._id}>
                                    <td>{log._id}</td>
                                    <td>{getEventTypeLabel(log.eventType)}</td>
                                    <td>{log.userId}</td>
                                    <td>{log.username}</td>
                                    <td>{new Date(log.executionTimestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
            <Footer/>
    </div>
    );
};

export default withAuth(Logs);
