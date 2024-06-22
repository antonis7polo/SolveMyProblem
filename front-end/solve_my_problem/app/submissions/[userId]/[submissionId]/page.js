"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import withAuth from '../../../utils/withAuth';
import { encrypt } from "../../../utils/encrypt";
import styles from '../../../styles/ViewSubmission.module.css';
import Alert from '@mui/material/Alert';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const ViewEditSubmission = ({ params }) => {
    const { userId, submissionId } = params;
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [numVehicles, setNumVehicles] = useState('');
    const [depot, setDepot] = useState('');
    const [maxDistance, setMaxDistance] = useState('');
    const [solverFile, setSolverFile] = useState(null);
    const [parametersFile, setParametersFile] = useState(null);
    const [solverMetadata, setSolverMetadata] = useState({ size: null, type: null });
    const [parametersMetadata, setParametersMetadata] = useState({
        size: null,
        type: null,
        locationsCount: 0,
        bounds: { minLatitude: null, maxLatitude: null, minLongitude: null, maxLongitude: null }
    });
    const [error, setError] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const router = useRouter();
    const solverFileInputRef = useRef(null);
    const parametersFileInputRef = useRef(null);
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('isAdmin') === 'true';

    useEffect(() => {
        const fetchSubmissionData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submission/data/${submissionId}`, {
                    headers: { 'X-OBSERVATORY-AUTH': localStorage.getItem('token'), 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
                });
                const submissionData = response.data;
                setSubmission(submissionData);
                setName(submissionData.name);
                setNumVehicles(submissionData.inputData?.numVehicles || '');
                setDepot(submissionData.inputData?.depot !== undefined ? submissionData.inputData.depot : '');
                setMaxDistance(submissionData.inputData?.maxDistance || '');
                setSolverFile(null);
                setParametersFile(null);
                setSolverMetadata(submissionData.inputData?.solverMetadata || { size: null, type: null });
                if (submissionData.inputData?.parameters) {
                    const parameters = JSON.parse(new TextDecoder().decode(new Uint8Array(submissionData.inputData.parameters.data)));
                    setParametersMetadata({
                        size: submissionData.inputData.parametersMetadata.size,
                        type: submissionData.inputData.parametersMetadata.type,
                        locationsCount: parameters?.Locations?.length || 0,
                        bounds: calculateBounds(parameters.Locations)
                    });
                } else {
                    setParametersMetadata({
                        size: null,
                        type: null,
                        locationsCount: 0,
                        bounds: { minLatitude: null, maxLatitude: null, minLongitude: null, maxLongitude: null }
                    });
                }
            } catch (error) {
                console.error('Error fetching submission data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissionData();
    }, [submissionId]);

    const handleSolverFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = file ? file.name : '';
        const fileExtension = fileName.split('.').pop();

        if (file && (fileExtension !== 'py')) {
            setError('Upload a valid Python file');
            setShowErrorAlert(true);
            setSolverFile(null);
            setSolverMetadata({
                size: null,
                type: null,
                locationsCount: 0,
                bounds: { minLatitude: null, maxLatitude: null, minLongitude: null, maxLongitude: null }
            });
            solverFileInputRef.current.value = null; // Reset the file input
        } else {
            setError('');
            setShowErrorAlert(false);
            setSolverFile(file);
            if (file) {
                setSolverMetadata({
                    size: file.size,
                    type: file.type,
                    locationsCount: 0,
                    bounds: { minLatitude: null, maxLatitude: null, minLongitude: null, maxLongitude: null }
                });
            }
        }
    };

    const handleParametersFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = file ? file.name : '';
        const fileExtension = fileName.split('.').pop();

        if (file && (fileExtension !== 'json')) {
            setError('Upload a valid JSON file');
            setShowErrorAlert(true);
            setParametersFile(null);
            setParametersMetadata({
                size: null,
                type: null,
                locationsCount: 0,
                bounds: { minLatitude: null, maxLatitude: null, minLongitude: null, maxLongitude: null }
            });
            parametersFileInputRef.current.value = null; // Reset the file input
        } else {
            setError('');
            setShowErrorAlert(false);
            setParametersFile(file);
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const parameters = JSON.parse(e.target.result);
                    setParametersMetadata({
                        size: file.size,
                        type: file.type,
                        locationsCount: parameters?.Locations?.length || 0,
                        bounds: calculateBounds(parameters.Locations)
                    });
                };
                reader.readAsText(file);
            }
        }
    };

    const calculateBounds = (locations) => {
        if (!locations || locations.length === 0) {
            return { minLatitude: "N/A", maxLatitude: "N/A", minLongitude: "N/A", maxLongitude: "N/A" };
        }
        const latitudes = locations.map(loc => loc.Latitude);
        const longitudes = locations.map(loc => loc.Longitude);
        return {
            minLatitude: Math.min(...latitudes),
            maxLatitude: Math.max(...latitudes),
            minLongitude: Math.min(...longitudes),
            maxLongitude: Math.max(...longitudes)
        };
    };

    const handleNumVehiclesChange = (e) => {
        const value = e.target.value;
        // Only allow digits
        if (/^\d*$/.test(value)) {
            setNumVehicles(value);
        }
    };

    const handleDepotChange = (e) => {
        const value = e.target.value;
        // Only allow digits
        if (/^\d*$/.test(value)) {
            setDepot(value);
        }
    };

    const handleMaxDistanceChange = (e) => {
        const value = e.target.value;
        // Only allow digits
        if (/^\d*$/.test(value)) {
            setMaxDistance(value);
        }
    };

    const handleUpdate = async () => {
        if (error) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('id', submissionId);
            formData.append('name', name);
            formData.append('userId', userId);
            formData.append('numVehicles', numVehicles);
            formData.append('depot', depot);
            formData.append('maxDistance', maxDistance);

            // Append new files if they exist
            if (solverFile) {
                formData.append('pythonFile', solverFile);
            }
            if (parametersFile) {
                formData.append('jsonFile', parametersFile);
            }

            await axios.post(`http://localhost:3001/submission/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-OBSERVATORY-AUTH': localStorage.getItem('token'),
                    'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)),
                }
            });

            router.push(`/submissions/${userId}`);
        } catch (error) {
            console.error('Error updating submission:', error);
            if (error.response) {
                setError('Error updating submission. Please try again.');
            } else if (error.request) {
                setError('Error updating submission. Service is temporarily down.');
            } else {
                setError('An unknown error occurred.');
            }
            setShowErrorAlert(true);
        }
    };
    const handleGoBack = () => {
        if (isAdmin) {
            router.push(`/submissions`);
        } else {
            router.push(`/submissions/${userId}`);
        }
    };

    const downloadFile = (fileData, fileName, fileType) => {
        const blob = new Blob([new Uint8Array(fileData.data)], { type: fileType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!submission) {
        return <p>Submission not found</p>;
    }

    const isUpdateEnabled = !isAdmin && (submission.status === 'ready' || submission.status === 'not_ready');

    return (
        <div>
            <Header isAdmin={isAdmin} />
            <div className={styles.container}>
                <div className={styles.submissionsInfo}>
                    <h1 className={styles.title}>{isAdmin ? 'View' : 'View/Edit'} Submission</h1>
                    {showErrorAlert && (
                        <Alert severity="error" onClose={() => setShowErrorAlert(false)}>{error}</Alert>
                    )}
                    <div className={styles.section}>
                        <h2>Submission Info</h2>
                        <p><strong>ID:</strong> {submission._id}</p>
                        <div>
                            <label><strong>Submission Name: </strong></label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isUpdateEnabled}
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <p><strong>Status: </strong>
                                {submission.status === 'completed' && 'Problem executed successfully'}
                                {submission.status === 'failed' && 'Problem execution failed'}
                                {submission.status === 'ready' && 'Problem ready to execute'}
                                {submission.status === 'not_ready' && 'Problem not ready to execute'}
                                {submission.status === 'in_progress' && 'Problem execution in progress'}
                            </p>
                        </div>
                        <p><strong>Creator:</strong> {submission.username}</p>
                        <p><strong>Created At:</strong> {new Date(submission.createdAt).toLocaleString()}</p>
                        {submission.submissionTimestamp && (
                            <p><strong>Submitted At:</strong> {new Date(submission.submissionTimestamp).toLocaleString()}</p>
                        )}
                    </div>
                    <div className={styles.section}>
                        <h2>Input Data</h2>
                        <div>
                            <p><strong>Solver (Python File):</strong> {submission.inputData?.solver ? 'Uploaded' : 'Not Uploaded'}</p>
                            {submission.inputData?.solver && (
                                <button onClick={() => downloadFile(submission.inputData.solver, 'solver.py', solverMetadata.type)} className={styles.button}>Download Solver File</button>
                            )}
                            <input
                                type="file"
                                ref={solverFileInputRef}
                                onChange={handleSolverFileChange}
                                disabled={!isUpdateEnabled}
                                className={styles.inputFile}
                            />
                            {solverMetadata.size && (
                                <p>
                                    <strong>File Size:</strong> {solverMetadata.size} bytes<br />
                                    <strong>File Type:</strong> {solverMetadata.type}
                                </p>
                            )}
                        </div>
                        <div>
                            <p><strong>Parameters (JSON File):</strong> {submission.inputData?.parameters ? 'Uploaded' : 'Not Uploaded'}</p>
                            {submission.inputData?.parameters && (
                                <button onClick={() => downloadFile(submission.inputData.parameters, 'parameters.json', parametersMetadata.type)} className={styles.button}>Download Parameters File</button>
                            )}
                            <input
                                type="file"
                                ref={parametersFileInputRef}
                                onChange={handleParametersFileChange}
                                disabled={!isUpdateEnabled}
                                className={styles.inputFile}
                            />
                            {parametersMetadata.size && (
                                <p>
                                    <strong>File Size:</strong> {parametersMetadata.size} bytes<br />
                                    <strong>File Type:</strong> {parametersMetadata.type}<br />
                                    <strong>Number of Locations:</strong> {parametersMetadata.locationsCount}<br />
                                    {parametersMetadata.bounds && (
                                        <>
                                            <strong>Bounds:</strong> <br />
                                            - Min Latitude: {parametersMetadata.bounds.minLatitude}<br />
                                            - Max Latitude: {parametersMetadata.bounds.maxLatitude}<br />
                                            - Min Longitude: {parametersMetadata.bounds.minLongitude}<br />
                                            - Max Longitude: {parametersMetadata.bounds.maxLongitude}
                                        </>
                                    )}
                                </p>
                            )}
                        </div>
                        <p><strong>Number of Vehicles:</strong></p>
                        <input
                            type="text"
                            value={numVehicles}
                            onChange={handleNumVehiclesChange}
                            disabled={!isUpdateEnabled}
                            className={styles.input}
                        />
                        <p><strong>Depot:</strong></p>
                        <input
                            type="text"
                            value={depot}
                            onChange={handleDepotChange}
                            disabled={!isUpdateEnabled}
                            className={styles.input}
                        />
                        <p><strong>Max Distance:</strong></p>
                        <input
                            type="text"
                            value={maxDistance}
                            onChange={handleMaxDistanceChange}
                            disabled={!isUpdateEnabled}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.buttons}>
                        {!isAdmin && (
                            <button onClick={handleUpdate} disabled={!isUpdateEnabled} className={styles.button}>Update Submission</button>
                        )}
                        <button onClick={handleGoBack} className={`${styles.button} ${styles.buttonRed}`}>Back to Submissions</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default withAuth(ViewEditSubmission);
