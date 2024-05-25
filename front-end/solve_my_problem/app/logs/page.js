// app/logs/page.js
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        eventType: '',
        userId: '',
        resultsId: ''
    });

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/logs');
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
        if (filters.userId) {
            filtered = filtered.filter(log => log.userId.toString().startsWith(filters.userId));
        }
        if (filters.resultsId) {
            filtered = filtered.filter(log => log.resultsId && log.resultsId.toString().startsWith(filters.resultsId));
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

    return (
        <div>
            <h1>Logs</h1>
            <div>
                <label>
                    Filter by Event Type:
                    <select name="eventType" onChange={handleFilterChange} value={filters.eventType}>
                        <option value="">All</option>
                        <option value="user">User</option>
                        <option value="results">Results</option>
                    </select>
                </label>
                <label>
                    Filter by User ID:
                    <input type="text" name="userId" onChange={handleFilterChange} value={filters.userId} />
                </label>
                <label>
                    Filter by Results ID:
                    <input type="text" name="resultsId" onChange={handleFilterChange} value={filters.resultsId} />
                </label>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Event Type</th>
                            <th>User ID</th>
                            <th>Execution Timestamp</th>
                            <th>Results ID</th>
                            <th>Submission ID</th>
                            <th>Submission Name</th>
                            <th>Label</th>
                            <th>Resource Usage</th>
                            <th>CPU Time</th>
                            <th>Task Completion Time</th>
                            <th>Queue Time</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log) => (
                            <tr key={log._id}>
                                <td>{log._id}</td>
                                <td>{log.eventType}</td>
                                <td>{log.userId}</td>
                                <td>{new Date(log.executionTimestamp).toLocaleString()}</td>
                                {log.eventType === 'results' ? (
                                    <>
                                        <td>{log.resultsId}</td>
                                        <td>{log.submissionId}</td>
                                        <td>{log.submissionName}</td>
                                        <td>{log.label}</td>
                                        <td>{log.resourceUsage}</td>
                                        <td>{log.cpuTime}</td>
                                        <td>{log.taskCompletionTime}</td>
                                        <td>{log.queueTime}</td>
                                    </>
                                ) : (
                                    <>
                                        <td colSpan="8">N/A</td>
                                    </>
                                )}
                                <td>{new Date(log.createdAt).toLocaleString()}</td>
                                <td>{new Date(log.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Logs;
