"use client";

import { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../../utils/withAuth';
import { encrypt } from "../../../utils/encrypt";
import styles from '../../../styles/CreateSubmissions.module.css';
import Alert from '@mui/material/Alert';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const CreateProblem = ({ params }) => {
    const { userId } = params;
    const [name, setName] = useState('');
    const [numVehicles, setNumVehicles] = useState('');
    const [depot, setDepot] = useState('');
    const [maxDistance, setMaxDistance] = useState('');
    const [pythonFile, setPythonFile] = useState(null);
    const [jsonFile, setJsonFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const pythonFileInputRef = useRef(null);
    const jsonFileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = file ? file.name : '';
        const fileExtension = fileName.split('.').pop();

        if (e.target.name === 'pythonFile') {
            if (file && fileExtension !== 'py') {
                setError('Upload a valid Python file');
                setPythonFile(null);
                pythonFileInputRef.current.value = null;
            } else {
                setError(null);
                setPythonFile(file);
            }
        } else if (e.target.name === 'jsonFile') {
            if (file &&  fileExtension !== 'json') {
                setError('Upload a valid JSON file');
                setJsonFile(null);
                jsonFileInputRef.current.value = null;
            } else {
                setError(null);
                setJsonFile(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData();
        const username = localStorage.getItem('username');
        formData.append('pythonFile', pythonFile);
        formData.append('jsonFile', jsonFile);
        formData.append('name', name);
        formData.append('userId', userId);
        formData.append('username', username);
        formData.append('numVehicles', numVehicles);
        formData.append('depot', depot);
        formData.append('maxDistance', maxDistance);

        try {
            await axios.post('http://localhost:3001/submission/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-OBSERVATORY-AUTH': localStorage.getItem('token'),
                    'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES))
                }
            });
            router.push(`/submissions/${userId}`);
        } catch (error) {
            setError('Error creating problem submission');
            console.error('Error creating problem submission:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push(`/submissions/${userId}`);
    };

    return (
        <div>
            <Header isAdmin={false}/>
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Problem</h1>
            {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Submission Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Number of Vehicles</label>
                    <input
                        type="number"
                        value={numVehicles}
                        onChange={(e) => setNumVehicles(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Depot</label>
                    <input
                        type="number"
                        value={depot}
                        onChange={(e) => setDepot(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Max Distance</label>
                    <input
                        type="number"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Python File</label>
                    <input
                        type="file"
                        name="pythonFile"
                        ref={pythonFileInputRef}
                        onChange={handleFileChange}
                        className={styles.inputFile}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>JSON File</label>
                    <input
                        type="file"
                        name="jsonFile"
                        ref={jsonFileInputRef}
                        onChange={handleFileChange}
                        className={styles.inputFile}
                    />
                </div>
                <div className={styles.buttons}>
                    <button type="submit" disabled={loading} className={styles.button}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={handleCancel} className={`${styles.button} ${styles.buttonRed}`}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
            <Footer/>
            </div>
    );
};

export default withAuth(CreateProblem);
