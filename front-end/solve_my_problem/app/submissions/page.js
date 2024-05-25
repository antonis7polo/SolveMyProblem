"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const handleDelete = async (submissionId) => {
        try {
            await axios.delete(`http://localhost:3001/submission/delete/${submissionId}`);
            setSubmissions(submissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    };

    const handleView = (submissionId) => {
        router.push(`/submission/${submissionId}`);
    };

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
                                <button onClick={() => handleView(submission._id)}>View</button>
                                {submission.status === 'completed' && <button>View Results</button>}
                                <button onClick={() => handleDelete(submission._id)}>Delete</button>
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
