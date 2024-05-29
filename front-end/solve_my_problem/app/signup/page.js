"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/Signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { encrypt } from "../utils/encrypt";
require('dotenv').config();


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    isAdmin: false,
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
    if (formData.password !== formData.repassword) {
      setErrors([{ msg: 'Passwords do not match' }]);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/signup', formData, {
        headers: {
          'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)),
        }
      });
      if (response.data.user) {
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', expirationTime);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        router.push(`/submissions/${response.data.user.id}`);
      } else if (response.data.errors) {
        setErrors(response.data.errors);
      } else if (response.data.message) {
        setErrors([{ msg: response.data.message }]);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrors([{ msg: error.response.data.message }]);
      } else {
        setErrors([{ msg: 'An error occurred. Please try again.' }]);
      }
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Sign up</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <input
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                  type="password"
                  name="repassword"
                  placeholder="Repeat your password"
                  value={formData.repassword}
                  onChange={handleChange}
                  required
                  className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>Register</button>
          </form>
          {errors.length > 0 && (
              <ul className={styles.errorList}>
                {errors.map((error, index) => (
                    <li key={index} className={styles.error}>{error.msg}</li>
                ))}
              </ul>
          )}
        </div>
        <div className={styles.imageContainer}>
          <img src="/signup.png" alt="Signup illustration" className={styles.image} />
          <p className={styles.memberLink}>
            <Link href="/login" className={styles.link}>I already have an account</Link>
          </p>
        </div>
      </div>
  );
};

export default Signup;
