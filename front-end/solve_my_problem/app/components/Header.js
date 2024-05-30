import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Divider, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { encrypt } from '../utils/encrypt';

const Header = ({ isAdmin }) => {
    const router = useRouter();
    const [dateTime, setDateTime] = useState(new Date());
    const [clientSide, setClientSide] = useState(false);
    const [systemHealth, setSystemHealth] = useState('Checking...');
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        setClientSide(true);
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        // Simulate health check
        setTimeout(() => {
            setSystemHealth('Good'); // Replace with real health check logic
        }, 2000);

        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            setUserId(userId);
            setUsername(username);

            if (!isAdmin && userId) {
                const token = localStorage.getItem('token');
                axios.get(`http://localhost:3005/user/${userId}`, {
                    headers: {
                        'X-OBSERVATORY-AUTH': token,
                        'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES))
                    }
                }).then(response => {
                    setCredits(response.data.userData.credits);
                }).catch(error => {
                    console.error('Error fetching user credits:', error);
                });
            }
        }

        return () => clearInterval(timer);
    }, [isAdmin]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        router.push('/');
    };

    const adminMenuItems = [
        { key: 'submissions', label: 'Submissions', link: '/submissions' },
        { key: 'logs', label: 'Logs', link: '/logs' },
        { key: 'analytics', label: 'Analytics', link: '/analytics' },
    ];

    const customerMenuItems = [
        { key: 'submissions', label: 'My Submissions', link: `/submissions/${userId}` },
        { key: 'create-submission', label: 'Create Submission', link: `/submissions/${userId}/create` },
        { key: 'add-credits', label: 'Add Credits', link: `/credits/${userId}` },
    ];

    const menuItems = isAdmin ? adminMenuItems : customerMenuItems;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2E8B57', height: 'auto' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <img src="/logo.png" alt="SolveMe Logo" style={{ height: '100px', width: '150px', marginRight: '30px' }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            {menuItems.map((item) => (
                                <Typography
                                    key={item.key}
                                    variant="body2"
                                    sx={{
                                        color: 'white',
                                        marginRight: '20px',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        padding: '10px 15px',
                                        borderRadius: '5px',
                                        transition: 'background-color 0.3s',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly different background color
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change background color on hover
                                        },
                                    }}
                                    onClick={() => router.push(item.link)}
                                >
                                    {item.label}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <IconButton sx={{ color: 'white' }} onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: 'white', margin: '10px 0' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        {clientSide && (
                            <Typography variant="body2" sx={{ color: 'white', fontSize: '1.2rem' }}>{username}</Typography>
                        )}
                        {!isAdmin && clientSide && (
                            <Typography variant="body2" sx={{ color: 'white', fontSize: '1.2rem', marginLeft: '20px' }}>
                                Credits: {credits !== null ? credits : 'Loading...'}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                        {clientSide && (
                            <>
                                <Typography variant="body2" sx={{ color: 'white', textAlign: 'right' }}>
                                    {dateTime.toLocaleDateString('en-US')} {dateTime.toLocaleTimeString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'white', textAlign: 'right', fontWeight: 'bold' }}>Health: {systemHealth}</Typography>
                            </>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
