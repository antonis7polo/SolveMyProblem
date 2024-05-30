"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
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
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Terms of Service</Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    These terms and conditions outline the rules and regulations for the use of SolveMyProblem's Website.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use
                    SolveMyProblem if you do not agree to take all of the terms and conditions stated on this page.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
                    and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant
                    to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                    Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.
                </Typography>
                <Typography variant="body1">
                    If you have any questions about these Terms, please contact us.
                </Typography>
            </Box>
            <Footer />
        </div>
    );
};

export default TermsOfService;
