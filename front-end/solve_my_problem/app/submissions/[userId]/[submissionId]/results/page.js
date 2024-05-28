"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import withAuth from '../../../../utils/withAuth';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewResults = ({ params }) => {
    const { userId, submissionId } = params;
    const [result, setResult] = useState(null);
    const [metadata, setMetadata] = useState({ numVehicles: 0, totalDistance: 0, distances: [] });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('isAdmin') === 'true';

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/result/${submissionId}`);
                setResult(response.data);
                const parsedMetadata = parseResults(response.data.results);
                setMetadata(parsedMetadata);
            } catch (error) {
                console.error('Error fetching result:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [submissionId]);

    const parseResults = (results) => {
        const lines = results.split('\n');
        let numVehicles = 0;
        let totalDistance = 0;
        const distances = [];

        lines.forEach(line => {
            if (line.startsWith('Route for vehicle')) {
                numVehicles += 1;
            } else if (line.startsWith('Distance of the route:')) {
                const distance = parseFloat(line.split('Distance of the route: ')[1]);
                distances.push(distance);
                totalDistance += distance;
            }
        });

        return { numVehicles, totalDistance, distances };
    };

    const generateDownloadLink = () => {
        let fileContent = `Objective: ${metadata.objective || 'N/A'}\n\n`;

        result.results.split('\n').forEach(line => {
            fileContent += `${line}\n`;
        });

        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        return url;
    };

    const handleGoBack = () => {
        if (isAdmin) {
            router.push(`/submissions`);
        } else {
            router.push(`/submissions/${userId}`);
        }
    };

    const data = {
        labels: Array.from({ length: metadata.numVehicles }, (_, i) => `Vehicle ${i}`),
        datasets: [
            {
                label: 'Distance (m)',
                data: metadata.distances,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distance Traveled by Each Vehicle',
            },
        },
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!result) {
        return <p>Result not found</p>;
    }

    return (
        <div>
            <h1>Submission Results</h1>
            <div>
                <h2>Result Info</h2>
                <p><strong>ID:</strong> {result._id}</p>
                <p><strong>Name:</strong> {result.name}</p>
                <p><strong>User ID:</strong> {result.userId}</p>
                <p><strong>Submission ID:</strong> {result.submissionId}</p>
                <p><strong>Created At:</strong> {new Date(result.createdAt).toLocaleString()}</p>
                <p><strong>Submitted At:</strong> {new Date(result.submissionTimestamp).toLocaleString()}</p>
                <p><strong>Completed At:</strong> {new Date(result.updatedAt).toLocaleString()}</p>
                <h2>Metadata</h2>
                <p><strong>Number of Vehicles:</strong> {metadata.numVehicles}</p>
                <p><strong>Total Distance:</strong> {metadata.totalDistance}m</p>
                <div>
                    <Bar data={data} options={options} />
                </div>
                <a href={generateDownloadLink()} download="results.txt">Download Results</a>
            </div>
            <button onClick={handleGoBack}>Back to Submissions</button>
        </div>
    );
};

export default withAuth(ViewResults);
