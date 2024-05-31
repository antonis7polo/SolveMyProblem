"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { encrypt } from "../utils/encrypt";
import styles from '../styles/Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/login', formData, {
        headers: {
          'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)),
        }
      });
      if (response.data.token) {
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', expirationTime);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('isAdmin', response.data.user.isAdmin);
        if (response.data.user.isAdmin) {
          router.push('/submissions');
        } else {
          router.push(`/submissions/${response.data.user.id}`);
        }
      } else if (response.data.errors) {
        setErrors(response.data.errors);
      } else if (response.data.message) {
        setErrors([{ msg: response.data.message }]);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrors([{ msg: error.response.data.message }]);
      } else {
        setErrors([{ msg: 'An error occurred. Please try again.' }]);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header isNoUser={true}/>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1 className={styles.heading}>Sign In</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>Sign in</button>
            </form>
            {errors.length > 0 && (
              <ul className={styles.errorList}>
                {errors.map((error, index) => (
                  <li key={index} className={styles.error}>{error.msg}</li>
                ))}
              </ul>
            )}
            <p>Don't have an account? <Link href="/signup" className={styles.link}>Create an account</Link></p>
          </div>
          <div className={styles.imageContainer}>
            <img src="/login.png" alt="Login illustration" className={styles.image} />
          </div>
        </div>
      </div>
      <Footer className={styles.footer}/>
    </div>
  );
};

export default Login;
