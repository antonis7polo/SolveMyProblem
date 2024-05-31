"use client";

import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header'; 
import styles from '../styles/LandingPage.module.css';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';  // Import the Alert component

const LandingPage = () => {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('sessionExpired')) {
      setSessionExpired(true);
      localStorage.removeItem('sessionExpired');
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header isNoUser={true}/>
      {sessionExpired && (
          <Alert severity="error" className={styles.expiredMessage}>Your session has expired. Please log in again.</Alert>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Welcome to SolveMyProblem!</h1>
          <div className={styles.content}>
            <div className={styles.textContainer}>
              <p className={styles.description}>
                SolveMyProblem is a web-based application that helps users solve complex problems requiring high computational resources and specialized software, without the need to own them. 
              </p>
              <p className={styles.description}>
                Examples include simulations, optimizations, and forecasts, all handled by our cloud infrastructure. Users only pay based on the resources they use.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <img src="/landing.png" alt="Illustration of problem-solving" className={styles.image} />
            </div>
          </div>
          <div className={styles.ctaButtons}>
            <Link href="/signup" className={styles.button}>Get Started</Link>
            <Link href="/login" className={styles.button}>Sign In</Link>
          </div>
        </div>
      </div>
      <Footer className={styles.footer}/>
    </div>
  );
};

export default LandingPage;
