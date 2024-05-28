"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './Credits.module.css';
import withAuth from '../../utils/withAuth';

require('dotenv').config();

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Credits = ({ params }) => {
  const [credits, setCredits] = useState(null);
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
        console.log('Fetching user data:', id, token);
        const response = await axios.get(`http://localhost:3005/user/${id}`, {
          headers: { 'X-OBSERVATORY-AUTH': token },
        });
        setCredits(response.data.userData.credits);
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

  if (credits === null) {
    return <p>Loading...</p>;
  }

  return (
      <Elements stripe={stripePromise}>
        <div className={styles.container}>
          <h1>Add Credits</h1>
          <div className={styles.balanceInfo}>
            <div>Current Balance: {credits}</div>
            <input
                type="number"
                value={creditsChange}
                onChange={handleCreditsChange}
                placeholder="Enter credits to add"
            />
            <div>New Balance: {Number(credits) + Number(creditsChange)}</div>
            <div className={styles.cost}>Cost: ${Number(creditsChange)}</div>
            <StripePaymentForm id={id} creditsChange={creditsChange} />
            <button onClick={() => router.push(`/submissions/${id}`)}>Cancel</button>
          </div>
        </div>
      </Elements>
  );
};

const StripePaymentForm = ({ id, creditsChange }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState('');

  const handleConfirm = async (event) => {
    event.preventDefault();

    if (!confirm) {
      setConfirm(true);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      setMessage('Payment failed. Please try again.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:3004/credits/add',
          { id, amount: Number(creditsChange), paymentMethodId: paymentMethod.id },
          {
            headers: { 'X-OBSERVATORY-AUTH': token },
          }
      );

      if (response.data.requiresAction) {
        const { error: confirmError } = await stripe.confirmCardPayment(response.data.clientSecret);
        if (confirmError) {
          console.error('Error confirming card payment:', confirmError);
          setMessage('Payment failed. Please try again.');
          return;
        }
      }

      if (response.data.message) {
        console.log('Credits updated successfully:', response.data.message);
        setMessage('Payment successful!');
        setTimeout(() => {
          router.push(`/submissions/${id}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating credits:', error);
      setMessage('Payment failed. Please try again.');
    }
  };

  return (
      <form onSubmit={handleConfirm} className={styles.paymentForm}>
        <div className={styles.input}>
          <label htmlFor="card">Card Details</label>
          <CardElement className={styles.cardElement} />
        </div>
        <button type="submit" disabled={!stripe} className={styles.button}>
          {confirm ? 'Confirm Payment' : 'Proceed to Payment'}
        </button>
        {message && <div className={styles.message}>{message}</div>}
      </form>
  );
};

export default withAuth(Credits);