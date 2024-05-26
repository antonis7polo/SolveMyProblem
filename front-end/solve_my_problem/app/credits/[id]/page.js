"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Credits.module.css';

const Credits = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [creditsChange, setCreditsChange] = useState(0);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token || !id) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3005/user/${id}`, {
          headers: { 'X-OBSERVATORY-AUTH': token },
        });
        setUserData(response.data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [id, router]);

  const handleCreditsChange = (e) => {
    setCreditsChange(e.target.value);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:3005/credits',
        { userId: id, creditsChange: Number(creditsChange) },
        {
          headers: { 'X-OBSERVATORY-AUTH': token },
        }
      );

      if (response.data.message) {
        router.push('/landing');
      }
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Add Credits</h1>
      <div className={styles.balanceInfo}>
        <div>Current Balance: {userData.credits}</div>
        <input
          type="number"
          value={creditsChange}
          onChange={handleCreditsChange}
          placeholder="Enter credits to add"
        />
        <div>New Balance: {Number(userData.credits) + Number(creditsChange)}</div>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => router.push('/landing')}>Cancel</button>
      </div>
    </div>
  );
};

export default Credits;
