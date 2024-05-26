"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Landing.module.css';

const Landing = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3005/user/${userId}`, {
          headers: { 'X-OBSERVATORY-AUTH': token },
        });
        setUserData(response.data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleAddCredits = () => {
    router.push(`/credits/${userData._id}`);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>solveME</h1>
        <div className={styles.userInfo}>
          <span>{userData.username}</span>
          <span>{`Credits: ${userData.credits}`}</span>
          <button onClick={handleAddCredits}>Add Credits</button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.logoArea}>big solveME photo</div>
      </div>
      <div className={styles.footer}>footer: solveME stuff (legal, etc)</div>
    </div>
  );
};

export default Landing;
