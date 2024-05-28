"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '../../utils/withAuth';

const UserSubmissions = ({ params }) => {
    const router = useRouter();
    const { userId } = params;
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentSubmissionId, setCurrentSubmissionId] = useState(null);
    const [cost, setCost] = useState(null);
    const [creditsError, setCreditsError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submission/${userId}`, {
                    headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token') }
                });
                setSubmissions(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching submissions');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [userId]);

    const handleViewSubmission = (submissionId) => {
        router.push(`/submissions/${userId}/${submissionId}`);
    };

    const handleDelete = async (submissionId) => {
        try {
            await axios.delete(`http://localhost:3001/submission/delete/${submissionId}`, {
                headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token') }
            });
            setSubmissions(submissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    };

    const handleRun = async (submissionId) => {
        try {
            const response = await axios.get(`http://localhost:3002/submission/cost/${submissionId}`, {
                headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token') }
            });
            setCost(response.data.cost);
            setCurrentSubmissionId(submissionId);
            setShowModal(true);
        } catch (error) {
            console.error('Error running problem:', error);
        }
    };

    const handleViewResults = (submissionId) => {
        router.push(`/submissions/${userId}/${submissionId}/results`);
    };

    const handleContinue = async () => {
        try {
            const response = await axios.post(`http://localhost:3002/submission/run`, { problemId: currentSubmissionId });
            console.log(response.data.message);
            setShowModal(false);
            setCreditsError(null);
            const updatedTimestamp = new Date().toISOString();
            setSubmissions(submissions.map(submission =>
                submission._id === currentSubmissionId
                    ? { ...submission, status: 'in_progress', updatedAt: updatedTimestamp, submissionTimestamp: updatedTimestamp }
                    : submission
            ));
        } catch (error) {
            console.error('Error running problem:', error);
            if (error.response && error.response.data && (error.response.data.message === 'Not enough credits')) {
                setCreditsError('Not enough credits to run the problem.');
            } else {
                setError('Failed to run the problem. Please try again.');
            }
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setCreditsError(null);
    };

    const handleAddCredits = () => {
        router.push(`/credits/${userId}`);
    };

    return (
        <div>
            <h1>User Submissions</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            {submissions.length === 0 ? (
                                <p>No submissions found</p>
                            ) : (
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Creator</th>
                                        <th>Submission Name</th>
                                        <th>Created At</th>
                                        <th>Status</th>
                                        <th>Submission Timestamp</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {submissions.map((submission) => (
                                        <tr key={submission._id}>
                                            <td>{submission.username}</td>
                                            <td>{submission.name}</td>
                                            <td>{new Date(submission.createdAt).toLocaleString()}</td>
                                            <td>{submission.status}</td>
                                            <td>{submission.submissionTimestamp ? new Date(submission.submissionTimestamp).toLocaleString() : 'N/A'}</td>
                                            <td>
                                                <button onClick={() => handleViewSubmission(submission._id)}>View</button>
                                                {submission.status === 'ready' && <button onClick={() => handleRun(submission._id)}>Run</button>}
                                                {submission.status === 'completed' && <button onClick={() => handleViewResults(submission._id)}>View Results</button>}
                                                <button onClick={() => handleDelete(submission._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                    <button onClick={() => router.push(`/submissions/${userId}/create`)}>Create New Problem</button>
                </>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Cost Calculation</h2>
                        <p>The cost for this submission is: {cost}</p>
                        {creditsError ? (
                            <>
                                <p style={{ color: 'red' }}>{creditsError}</p>
                                <button onClick={handleAddCredits}>Add Credits</button>
                            </>
                        ) : (
                            <>
                                {error && !creditsError && <p style={{ color: 'red' }}>{error}</p>}
                                <button onClick={handleContinue}>Continue</button>
                            </>
                        )}
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                .modal {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    text-align: center;
                }
                .modal-content button {
                    margin: 5px;
                }
            `}</style>
        </div>
    );
};

export default withAuth(UserSubmissions);
