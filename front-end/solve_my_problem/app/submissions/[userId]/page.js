"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../utils/withAuth';
import { encrypt } from "../../utils/encrypt";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Submissions.module.css';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#E8F5E9', /* Light green background */
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '500px', /* Adjust the width as needed */
    }
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2E8B57', /* Seafoam Green */
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif', /* Same font as the rest of the page */
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    color: '#2E8B57', /* Seafoam Green */
    textAlign: 'center',
    fontSize: '1.2rem',
    fontFamily: 'Arial, sans-serif', /* Same font as the rest of the page */
}));

const CustomDialogActions = styled(DialogActions)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end', /* Align items to the end */
    gap: '1rem', /* Add space between buttons */
    padding: '1rem 2rem',
}));

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#2E8B57', /* Seafoam Green */
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem', /* Adjusted padding for smaller buttons */
    cursor: 'pointer',
    fontSize: '0.875rem', /* Smaller font size */
    transition: 'background-color 0.3s',
    fontFamily: 'Arial, sans-serif', /* Same font as the rest of the page */
    textTransform: 'none', /* Ensure the button text is not all caps */
    '&:hover': {
        backgroundColor: '#276f47',
    },
}));

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
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (error) {
            setOpenSnackbar(true);
        }
    }, [error]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setError(null);
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submission/${userId}`, {
                    headers: {
                        'X-OBSERVATORY-AUTH': localStorage.getItem('token'),
                        'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES))
                    }
                });
                setSubmissions(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setSubmissions([]); // No submissions found, set empty array
                } else {
                    setError(error.response ? error.response.data.message : 'Error fetching submissions. Service is temporarily down.');
                }
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
                headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token'), 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
            });
            setSubmissions(submissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
            setError('Error deleting submission. Service is temporarily down.');
        }
    };

    const handleRun = async (submissionId) => {
        try {
            const response = await axios.get(`http://localhost:3002/submission/cost/${submissionId}`, {
                headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token'), 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
            });
            setCost(response.data.cost);
            setCurrentSubmissionId(submissionId);
            setShowModal(true);
        } catch (error) {
            console.error('Error running problem:', error);
            setError('Error running problem. Service is temporarily down.');
        }
    };

    const handleViewResults = (submissionId) => {
        router.push(`/submissions/${userId}/${submissionId}/results`);
    };

    const handleContinue = async () => {
        try {
            const response = await axios.post(`http://localhost:3002/submission/run`, { problemId: currentSubmissionId }, {
                headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token'), 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
            });
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
            <Header isAdmin={false} />
            <div className={styles.container}>
                <h1 className={styles.title}>Submissions</h1>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    {error && (
                        <Alert severity="error" onClose={handleCloseSnackbar} style={{ marginBottom: '20px' }}>
                            {error}
                        </Alert>
                    )}
                </Snackbar>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {(
                            <>
                                {submissions.length === 0 ? (
                                    <p>No submissions found</p>
                                ) : (
                                    <div className={styles.tableContainer}>
                                        <table className={styles.table}>
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
                                                    <td>
                                                        {submission.status === 'completed' && 'Problem executed successfully'}
                                                        {submission.status === 'failed' && 'Problem execution failed'}
                                                        {submission.status === 'ready' && 'Problem ready to execute'}
                                                        {submission.status === 'not_ready' && 'Problem not ready to execute'}
                                                        {submission.status === 'in_progress' && 'Problem execution in progress'}
                                                    </td>
                                                    <td>{submission.submissionTimestamp ? new Date(submission.submissionTimestamp).toLocaleString() : 'N/A'}</td>
                                                    <td>
                                                        <button className={`${styles.button} ${styles.viewButton}`} onClick={() => handleViewSubmission(submission._id)}>View</button>
                                                        {submission.status === 'ready' && <button className={`${styles.button} ${styles.runButton}`} onClick={() => handleRun(submission._id)}>Run</button>}
                                                        {submission.status === 'completed' && <button className={`${styles.button} ${styles.resultsButton}`} onClick={() => handleViewResults(submission._id)}>View Results</button>}
                                                        <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDelete(submission._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}

                        <button className={`${styles.button} ${styles.createProblemButton}`} onClick={() => router.push(`/submissions/${userId}/create`)}>Create New Problem</button>
                    </>
                )}
                <CustomDialog
                    open={showModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCancel}
                    classes={{ paper: styles.dialogPaper }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <CustomDialogTitle className={styles.dialogTitle}>{"Problem Execution Cost"}</CustomDialogTitle>
                    <CustomDialogContent className={styles.dialogContent}>
                        <DialogContentText id="alert-dialog-slide-description">
                            The cost to execute this problem is {cost} credits.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you want to continue?
                        </DialogContentText>
                        {creditsError ? (
                            <>
                                <p style={{ color: 'red' }}>{creditsError}</p>
                                <CustomButton onClick={handleAddCredits} className={styles.dialogButton}>Add Credits</CustomButton>
                            </>
                        ) : (
                            <>
                                {error && !creditsError && <p style={{ color: 'red' }}>{error}</p>}
                            </>
                        )}
                    </CustomDialogContent>
                    <CustomDialogActions className={styles.dialogActions}>
                        <CustomButton onClick={handleCancel} className={styles.dialogButtonCancel}>Cancel</CustomButton>
                        {!creditsError && <CustomButton onClick={handleContinue} className={styles.dialogButton}>Continue</CustomButton>}
                    </CustomDialogActions>
                </CustomDialog>
            </div>
            <Footer />
        </div>
    );
};

export default withAuth(UserSubmissions);