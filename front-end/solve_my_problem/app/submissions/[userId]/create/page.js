"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../../utils/withAuth';


const CreateProblem = ({ params }) => {
    const { userId } = params;
    const [name, setName] = useState('');
    const [numVehicles, setNumVehicles] = useState('');
    const [depot, setDepot] = useState('');
    const [maxDistance, setMaxDistance] = useState('');
    const [pythonFile, setPythonFile] = useState(null);
    const [jsonFile, setJsonFile] =useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e) => {
        if (e.target.name === 'pythonFile') {
            setPythonFile(e.target.files[0]);
        } else if (e.target.name === 'jsonFile') {
            setJsonFile(e.target.files[0]);
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
            console.log('Form data:', formData);
            await axios.post('http://localhost:3001/submission/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            router.push(`/submissions/${userId}`);
        } catch (error) {
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
            <h1>Create New Problem</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Submission Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Number of Vehicles</label>
                    <input
                        type="number"
                        value={numVehicles}
                        onChange={(e) => setNumVehicles(e.target.value)}
                    />
                </div>
                <div>
                    <label>Depot</label>
                    <input
                        type="number"
                        value={depot}
                        onChange={(e) => setDepot(e.target.value)}
                    />
                </div>
                <div>
                    <label>Max Distance</label>
                    <input
                        type="number"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(e.target.value)}
                    />
                </div>
                <div>
                    <label>Python File</label>
                    <input
                        type="file"
                        name="pythonFile"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label>JSON File</label>
                    <input
                        type="file"
                        name="jsonFile"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default withAuth(CreateProblem);