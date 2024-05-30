"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header isAdmin={isAdmin} />
            <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', flex: '1' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Privacy Policy</Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    Your privacy is important to us. This privacy policy document outlines the types of personal information
                    that is received and collected by SolveMyProblem and how it is used.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    We may collect personal identification information from Users in a variety of ways, including, but not limited
                    to, when Users visit our site, register on the site, place an order, and in connection with other activities,
                    services, features or resources we make available on our Site.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    We will collect personal identification information from Users only if they voluntarily submit such information
                    to us. Users can always refuse to supply personally identification information, except that it may prevent
                    them from engaging in certain Site-related activities.
                </Typography>
                <Typography variant="body1">
                    If you have any questions about this Privacy Policy, please contact us.
                </Typography>
            </Box>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
