// app/submissions/page.js
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/submission');
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <div>
            <h1>All Submissions</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Creator</th>
                        <th>Submission Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submissions.map((submission) => (
                        <tr key={submission._id}>
                            <td>{submission.username}</td>
                            <td>{submission.name}</td>
                            <td>{new Date(submission.createdAt).toLocaleString()}</td>
                            <td>{new Date(submission.updatedAt).toLocaleString()}</td>
                            <td>{submission.status}</td>
                            <td>
                                <button>View</button>
                                {submission.status === 'completed' && <button>View Results</button>}
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Submissions;
