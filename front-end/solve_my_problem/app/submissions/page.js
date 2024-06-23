"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../utils/withAuth';
import { encrypt } from "../utils/encrypt";
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/AdminSubmissions.module.css';
import Alert from '@mui/material/Alert';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Access localStorage only on the client side
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(isAdmin);

        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/submission', {
                    headers: {
                        'X-OBSERVATORY-AUTH': localStorage.getItem('token'),
                        'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES))
                    }
                });
                setSubmissions(response.data);
                setFilteredSubmissions(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setSubmissions([]);
                } else {
                    setError(error.response ? error.response.data.message : 'Error fetching submissions. Service is temporarily down.');
                }
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
            await axios.delete(`http://localhost:3001/submission/delete/${submissionId}`, {
                headers: {
                    'X-OBSERVATORY-AUTH': localStorage.getItem('token'),
                    'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES))
                }
            });
            setSubmissions(submissions.filter(submission => submission._id !== submissionId));
            setFilteredSubmissions(filteredSubmissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
            setError('Error deleting submission. Service is temporarily down.');
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
            <Header isAdmin={isAdmin} />
            <div className={styles.container}>
                <h1 className={styles.title}>Submissions</h1>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by creator's name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>
                {error && (
                    <Alert severity="error" onClose={() => setError(null)} style={{ marginBottom: '20px' }}>{error}</Alert>
                )}
                {loading ? (
                    <p>Loading...</p>
                ) : filteredSubmissions.length === 0 ? (
                    <p>No submissions found</p>
                ) : (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
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
                                    <td>
                                        {submission.status === 'completed' && 'Problem executed successfully'}
                                        {submission.status === 'failed' && 'Problem execution failed'}
                                        {submission.status === 'ready' && 'Problem ready to execute'}
                                        {submission.status === 'not_ready' && 'Problem not ready to execute'}
                                        {submission.status === 'in_progress' && 'Problem execution in progress'}
                                    </td>
                                    <td>
                                        <button onClick={() => handleView(submission._id, submission.userId)}
                                                className={`${styles.button} ${styles.viewButton}`}>View
                                        </button>
                                        {submission.status === 'completed' && (
                                            <button onClick={() => handleViewResults(submission._id, submission.userId)}
                                                    className={`${styles.button} ${styles.resultsButton}`}>View Results
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(submission._id)}
                                                className={`${styles.button} ${styles.deleteButton}`}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default withAuth(Submissions);