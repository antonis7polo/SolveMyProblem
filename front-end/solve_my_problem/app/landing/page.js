// app/landing/page.js
"use client";

import { useRouter } from 'next/navigation';
import styles from './Landing.module.css';

const Landing = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>solveME</h1>
          <button onClick={handleLoginClick} className={styles.loginButton}>Login</button>
        </div>
        <div className={styles.content}>
          <div className={styles.logoArea}>
            <img src="/big-solveme-photo.png" alt="solveME Logo" className={styles.logo} />
          </div>
        </div>
        <div className={styles.footer}>
          <p>footer: solveME stuff (legal, etc)</p>
        </div>
      </div>
  );
};

export default Landing;
