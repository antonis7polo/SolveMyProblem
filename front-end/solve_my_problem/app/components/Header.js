import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import styles from '../styles/Header.module.css';

const Header = ({ isAdmin }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
    const [clientSide, setClientSide] = useState(false);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

    useEffect(() => {
        setClientSide(true);
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        router.push('/');
    };

    const adminMenuItems = [
        <MenuItem key="submissions" onClick={() => router.push('/submissions')} className={styles.menuItem}>Submissions</MenuItem>,
        <MenuItem key="logs" onClick={() => router.push('/logs')} className={styles.menuItem}>Logs</MenuItem>,
        <MenuItem key="analytics" onClick={() => router.push('/analytics')} className={styles.menuItem}>Analytics</MenuItem>,
    ];

    const customerMenuItems = [
        <MenuItem key="submissions" onClick={() => router.push(`/submissions/${userId}`)} className={styles.menuItem}>My Submissions</MenuItem>,
        <MenuItem key="create-submission" onClick={() => router.push(`/submissions/${userId}/create`)} className={styles.menuItem}>Create Submission</MenuItem>,
        <MenuItem key="add-credits" onClick={() => router.push(`/credits/${userId}`)} className={styles.menuItem}>Add Credits</MenuItem>,
    ];

    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <Box className={styles.topSection}>
                    <IconButton edge="start" className={styles.menuIcon} aria-label="menu" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Box className={styles.logoSection}>
                        <img src="/logo.png" alt="SolveMe Logo" className={styles.logoImage} />
                    </Box>
                    <IconButton className={styles.logoutButton} onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    className={styles.menu}
                >
                    {isAdmin ? adminMenuItems : customerMenuItems}
                </Menu>
                <Divider className={styles.divider} />
                <Box className={styles.bottomSection}>
                    <Box className={styles.usernameSection}>
                        {clientSide && username ? (
                            <Typography variant="body2" className={styles.username}>{username}</Typography>
                        ) : (
                            <Button className={styles.loginButton} onClick={() => router.push('/login')}>Login</Button>
                        )}
                    </Box>
                    <Box className={styles.systemInfoSection}>
                        {clientSide && dateTime && (
                            <>
                                <Typography variant="body2" className={styles.systemInfo}>
                                    {dateTime.toLocaleDateString('en-US')} {dateTime.toLocaleTimeString()}
                                </Typography>
                                <Typography variant="body2" className={styles.systemInfoHealth}>Health: Good</Typography>
                            </>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
