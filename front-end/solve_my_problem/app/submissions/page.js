"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../utils/withAuth';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/submission');
                setSubmissions(response.data);
                setFilteredSubmissions(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching submissions');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = submissions.filter(submission =>
            submission.username.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSubmissions(filtered);
    };

    const handleDelete = async (submissionId) => {
        try {
            await axios.delete(`http://localhost:3001/submission/delete/${submissionId}`);
            setSubmissions(submissions.filter(submission => submission._id !== submissionId));
            setFilteredSubmissions(filteredSubmissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    };

    const handleView = (submissionId, userId) => {
        router.push(`/submissions/${userId}/${submissionId}?isAdmin=${isAdmin}`);
    };

    const handleViewResults = (submissionId, userId) => {
        router.push(`/submissions/${userId}/${submissionId}/results?isAdmin=${isAdmin}`);
    };

    return (
        <div>
            <h1>All Submissions</h1>
            <input
                type="text"
                placeholder="Search by creator's name"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : filteredSubmissions.length === 0 ? (
                <p>No submissions found</p>
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
                    {filteredSubmissions.map((submission) => (
                        <tr key={submission._id}>
                            <td>{submission.username}</td>
                            <td>{submission.name}</td>
                            <td>{new Date(submission.createdAt).toLocaleString()}</td>
                            <td>{new Date(submission.updatedAt).toLocaleString()}</td>
                            <td>{submission.status}</td>
                            <td>
                                <button onClick={() => handleView(submission._id, submission.userId)}>View</button>
                                {submission.status === 'completed' && (
                                    <button onClick={() => handleViewResults(submission._id, submission.userId)}>View Results</button>
                                )}
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

export default withAuth(Submissions);
