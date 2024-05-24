// app/submissions/[userId]/page.js
"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



const UserSubmissions = ({ params }) => {
    const router = useRouter();
    const { userId } = params;
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submission/${userId}`);
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [userId]);

    return (
        <div>
            <h1>User Submissions</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
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
                                    {submission.status === 'ready' && <button>Run</button>}
                                    {submission.status === 'completed' && <button>View Results</button>}
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={() => router.push(`/submissions/${userId}/create`)}>Create New Problem</button>
                </div>
            )}
        </div>
    );
};

export default UserSubmissions;
