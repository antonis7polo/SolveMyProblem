// app/page.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Landing from './landing/page';

const HomePage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime();

        if (token && tokenExpiration && currentTime < tokenExpiration) {
            const userId = localStorage.getItem('userId');
            router.push(`/submissions/${userId}`);
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return null; // Render nothing while checking
    }

    return <Landing />;
};

export default HomePage;
