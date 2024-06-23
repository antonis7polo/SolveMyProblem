import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#2E8B57', color: 'white', padding: '10px' }}>
            <Divider sx={{ backgroundColor: 'white', marginBottom: '10px' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Box sx={{ marginBottom: '10px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '5px' }}>SolveMyProblem</Typography>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} SolveMyProblem. All rights reserved.
                    </Typography>
                    <Typography variant="body2">
                        <Link href="/privacy-policy" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Link> |
                        <Link href="/terms-of-service" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}> Terms of Service</Link>
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: '10px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '5px' }}>Contact Us</Typography>
                    <Typography variant="body2">Email: <Link href="mailto:support@solvemyproblem.com" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>support@solvemyproblem.com</Link></Typography>
                    <Typography variant="body2">Phone: (123) 456-7890</Typography>
                    <Typography variant="body2">Address: 123 SolveMyProblem St, Tech City, USA</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
