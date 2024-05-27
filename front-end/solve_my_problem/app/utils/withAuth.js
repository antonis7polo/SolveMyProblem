import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            const currentTime = new Date().getTime();

            if (!token || !tokenExpiration || currentTime > tokenExpiration) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.setItem('sessionExpired', 'true');
                router.push('/');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
