import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Divider, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { encrypt } from '../utils/encrypt';

const Header = ({ isAdmin, isNoUser }) => {
    const router = useRouter();
    const [dateTime, setDateTime] = useState(new Date());
    const [clientSide, setClientSide] = useState(false);
    const [systemHealth, setSystemHealth] = useState('Checking...');
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [credits, setCredits] = useState(null);

    const healthCheckUrls = [
        { url: 'http://localhost:3000/health', name: 'Submissions Microservice' },
        { url: 'http://localhost:3001/submission/health', name: 'Modify Submissions Microservice' },
        { url: 'http://localhost:3002/submission/health', name: 'Problem Issue Microservice' },
        { url: 'http://localhost:3003/health', name: 'Results Management Microservice' },
        { url: 'http://localhost:3004/credits/health', name: 'Add Credits Microservice' },
        { url: 'http://localhost:3005/health', name: 'Accounts Microservice' },
        { url: 'http://localhost:3006/health', name: 'Solver Microservice' },
        { url: 'http://localhost:3007/health', name: 'Log Management Microservice' },
        { url: 'http://localhost:3008/health', name: 'Solver Wrapper Microservice' },

    ];

    useEffect(() => {
        setClientSide(true);
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        const checkHealth = async () => {
            try {
                const headers = {
                    'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES))
                };
                const healthChecks = await Promise.all(healthCheckUrls.map(item => axios.get(item.url, { headers }).catch(() => null)));
                const unhealthyServices = healthChecks
                    .map((response, index) => (!response || response.status !== 200 ? healthCheckUrls[index].name : null))
                    .filter(service => service !== null);

                setSystemHealth(unhealthyServices.length === 0 ? 'All services are healthy' : `Unhealthy: ${unhealthyServices.join(', ')}`);
            } catch (error) {
                setSystemHealth('Error checking health');
            }
        };

        checkHealth();
        const healthCheckInterval = setInterval(checkHealth, 30000); // Repeat health check every 30 seconds

        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            setUserId(userId);
            setUsername(username);

            if (!isAdmin && !isNoUser && userId) {
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
        } else {
            // No user logged in scenario
            setUserId(null);
            setUsername(null);
        }

        return () => {
            clearInterval(timer);
            clearInterval(healthCheckInterval);
        };
    }, [isAdmin, isNoUser]);

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

    const noUserMenuItems = [
        { key: 'home', label: 'Home', link: '/' },
        { key: 'signin', label: 'Sign In', link: '/login' },
        { key: 'signup', label: 'Sign Up', link: '/signup' },
    ];

    const menuItems = isNoUser ? noUserMenuItems : (isAdmin ? adminMenuItems : customerMenuItems);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2E8B57', height: 'auto' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <img src="/logo.png" alt="SolveMe Logo" style={{ height: '50px', width: '200px', marginRight: '30px' }} />
                        {!isNoUser && (
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
                        )}
                    </Box>
                    {isNoUser && (
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
                    )}
                    {!isNoUser && (
                        <IconButton sx={{ color: 'white' }} onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    )}
                </Box>
                {isNoUser ? (
                    <>
                        <Divider sx={{ backgroundColor: 'white', margin: '10px 0' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {clientSide && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'white', textAlign: 'right' }}>
                                        {dateTime.toLocaleDateString('en-US')} {dateTime.toLocaleTimeString()}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </>
                ) : (
                    <>
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
                                        <Typography variant="body2" sx={{ color: 'white', textAlign: 'right', fontWeight: 'bold' }}>System Health: {systemHealth}</Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
