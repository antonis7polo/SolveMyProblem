"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
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
      const response = await axios.post('http://localhost:3005/signup', formData);
      if (response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        router.push('/landing'); // Redirect to landing page
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
      <h1 className={styles.heading}>Signup</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="repassword"
          placeholder="Confirm your password"
          value={formData.repassword}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Signup</button>
      </form>
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index} className={styles.error}>{error.msg}</li>
          ))}
        </ul>
      )}
      <p>Already have an account? <Link href="/login" className={styles.link}>Login</Link></p>
    </div>
  );
};

export default Signup;
