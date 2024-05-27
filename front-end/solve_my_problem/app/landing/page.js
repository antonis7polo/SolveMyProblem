"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('sessionExpired')) {
      setSessionExpired(true);
      localStorage.removeItem('sessionExpired');
    }
  }, []);

  return (
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>SolveMyProblem</div>
          <div className={styles.authLinks}>
            <Link href="/login" className={styles.loginButton}>Log in</Link>
            <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
          </div>
        </nav>
        {sessionExpired && (
            <p className={styles.expiredMessage}>Your session has expired. Please log in again.</p>
        )}
        <div className={styles.mainContent}>
          <div className={styles.textContent}>
            <h1>Improve outbound calls today</h1>
            <p>We help call centers boost KPIs, make better decisions based on insights, and manage contacts more wisely.</p>
            <div className={styles.buttons}>
              <button className={styles.primaryButton}>Start a free trial</button>
              <button className={styles.secondaryButton}>Watch the demo</button>
            </div>
          </div>
          <div className={styles.imageContent}>
            <img src="/landing.png" alt="Landing illustration" />
          </div>
        </div>
      </div>
  );
};

export default LandingPage;
