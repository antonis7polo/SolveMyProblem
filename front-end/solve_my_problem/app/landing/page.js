"use client";

import Link from 'next/link';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SolveMyProblem</div>
        <div className={styles.authLinks}>
          <Link href="/login" className={styles.loginButton}>Log in</Link>
          <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
        </div>
      </nav>
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
