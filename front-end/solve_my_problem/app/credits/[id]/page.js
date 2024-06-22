"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import styles from '../../styles/Credits.module.css';
import withAuth from '../../utils/withAuth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { encrypt } from "../../utils/encrypt";

require('dotenv').config();

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#E8F5E9', /* Light green background */
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '500px', /* Adjust the width as needed */
  }
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#2E8B57', /* Seafoam Green */
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif', /* Same font as the rest of the page */
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  color: '#2E8B57', /* Seafoam Green */
  textAlign: 'center',
  fontSize: '1.2rem',
  fontFamily: 'Arial, sans-serif', /* Same font as the rest of the page */
}));

const CustomDialogActions = styled(DialogActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end', /* Align items to the end */
  gap: '1rem', /* Add space between buttons */
  padding: '1rem 2rem',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2E8B57', /* Seafoam Green */
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '0.5rem 1rem', /* Adjusted padding for smaller buttons */
  cursor: 'pointer',
  fontSize: '0.875rem', /* Smaller font size */
  transition: 'background-color 0.3s',
  fontFamily: 'Arial, sans-serif', /* Same font as the rest of the page */
  textTransform: 'none', /* Ensure the button text is not all caps */
  '&:hover': {
    backgroundColor: '#276f47',
  },
}));

const Credits = ({ params }) => {
  const [credits, setCredits] = useState(null);
  const [creditsLoadError, setCreditsLoadError] = useState(false); // New state for load error
  const [creditsChange, setCreditsChange] = useState(0);
  const [showZeroCreditsMessage, setShowZeroCreditsMessage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showInvalidCardMessage, setShowInvalidCardMessage] = useState(false);
  const [showMaxCreditsWarning, setShowMaxCreditsWarning] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

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
          headers: { 'X-OBSERVATORY-AUTH': token, 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
        });
        setCredits(response.data.userData.credits);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setCreditsLoadError(true); // Set the error flag
      }
    };

    fetchUserData();
  }, [id, router]);

  const handleCreditsChange = (e) => {
    const value = e.target.value;
    // Only allow digits and restrict to 7 figures
    if (/^\d{0,7}$/.test(value)) {
      setCreditsChange(Number(value));
      setShowMaxCreditsWarning(false); // Hide warning if input is valid
    } else {
      setShowMaxCreditsWarning(true); // Show warning if input exceeds 7 figures
    }
  };

  const handleCloseMaxCreditsWarning = () => {
    setShowMaxCreditsWarning(false);
  };

  const handleClose = () => {
    setShowZeroCreditsMessage(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:3004/credits/add',
          { id, amount: Number(creditsChange), paymentMethodId: paymentMethod.id },
          {
            headers: { 'X-OBSERVATORY-AUTH': token, 'custom-services-header': JSON.stringify(encrypt(process.env.NEXT_PUBLIC_SECRET_STRING_SERVICES)) }
          }
      );

      const { clientSecret, requiresAction } = response.data;

      if (requiresAction) {
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);
        if (confirmError) {
          console.error('Error confirming card payment:', confirmError);
          setMessage('Payment failed. Please try again.');
          setOpenDialog(false);
          setShowErrorAlert(true); // Show error alert
          return;
        }
      }

      if (response.data.message) {
        console.log('Credits updated successfully:', response.data.message);
        setMessage('Payment successful!');
        setOpenDialog(false);
        setShowConfirmationMessage(true); // Show confirmation message
        setTimeout(() => {
          router.push(`/submissions/${id}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating credits:', error);
      setMessage('Payment failed. Service is temporarily down.');
      setOpenDialog(false);
      setShowErrorAlert(true); // Show error alert
    }
  };

  return (
      <div>
        <Header isAdmin={false} />
        <Elements stripe={stripePromise}>
          <div className={styles.container}>
            <h1 className={styles.heading}>Add Credits</h1>
            <Snackbar
                open={showMaxCreditsWarning}
                autoHideDuration={3000}
                onClose={handleCloseMaxCreditsWarning}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ width: '800px' }}  /* Make the Snackbar match the width of balanceInfo */
            >
              <Alert onClose={handleCloseMaxCreditsWarning} severity="warning" sx={{ width: '100%' }}>
                Cannot buy more than 9,999,999 credits at a time.
              </Alert>
            </Snackbar>
            <Snackbar
                open={showZeroCreditsMessage}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ width: '800px' }}  /* Make the Snackbar match the width of balanceInfo */
            >
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Please select the amount of credits you would like to buy.
              </Alert>
            </Snackbar>
            <Snackbar
                open={showInvalidCardMessage}
                autoHideDuration={3000}
                onClose={() => setShowInvalidCardMessage(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ width: '800px' }}  /* Make the Snackbar match the width of balanceInfo */
            >
              <Alert onClose={() => setShowInvalidCardMessage(false)} severity="error" sx={{ width: '100%' }}>
                Please fill in valid card details.
              </Alert>
            </Snackbar>
            <Snackbar
                open={showConfirmationMessage}
                autoHideDuration={3000}
                onClose={() => setShowConfirmationMessage(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ width: '800px' }}  /* Make the Snackbar match the width of balanceInfo */
            >
              <Alert onClose={() => setShowConfirmationMessage(false)} severity="success" sx={{ width: '100%' }}>
                Credits successfully added! Redirecting to submissions...
              </Alert>
            </Snackbar>
            <Snackbar
                open={showErrorAlert}
                autoHideDuration={3000}
                onClose={() => setShowErrorAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ width: '800px' }}  /* Make the Snackbar match the width of balanceInfo */
            >
              <Alert onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
            <div className={styles.balanceInfo}>
              <table className={styles.table}>
                <tbody>
                <tr>
                  <td className={styles.label}>Current Balance:</td>
                  <td className={styles.value}>
                    {creditsLoadError ? 'Unable to load current balance. Service is temporarily down.' : credits}
                  </td>
                </tr>
                <tr>
                  <td className={styles.label}>Credits to add:</td>
                  <td>
                    <input
                        type="text"
                        value={creditsChange === 0 ? '' : creditsChange}
                        onChange={handleCreditsChange}
                        placeholder="Enter credits to add"
                        className={styles.inputCredits} /* Updated class for credits input */
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.label}>New Balance:</td>
                  <td className={styles.value}>
                    {creditsLoadError ? 'N/A' : Number(credits) + Number(creditsChange)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.label}>Cost:</td>
                  <td className={styles.value}>${Number(creditsChange)}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <StripePaymentForm
                id={id}
                creditsChange={creditsChange}
                setOpenDialog={setOpenDialog}
                setShowZeroCreditsMessage={setShowZeroCreditsMessage}
                setMessage={setMessage}
                setPaymentMethod={setPaymentMethod}
                setShowInvalidCardMessage={setShowInvalidCardMessage} // Pass this function
            />
            <CustomDialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
              <CustomDialogTitle>{"Confirm Payment"}</CustomDialogTitle>
              <CustomDialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to proceed with this payment?
                </DialogContentText>
              </CustomDialogContent>
              <CustomDialogActions>
                <CustomButton onClick={handleCloseDialog}>Cancel</CustomButton>
                <CustomButton onClick={handleConfirmPayment}>Confirm</CustomButton>
              </CustomDialogActions>
            </CustomDialog>
          </div>
        </Elements>
        <Footer />
      </div>
  );
};

const StripePaymentForm = ({ id, creditsChange, setOpenDialog, setShowZeroCreditsMessage, setMessage, setPaymentMethod, setShowInvalidCardMessage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handlePayClick = async () => {
    if (creditsChange === 0) {
      setShowZeroCreditsMessage(true);
      return;
    }

    if (!elements || !stripe) {
      setMessage('Stripe has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage('Please fill in your card details.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setShowInvalidCardMessage(true); // Show invalid card message
      return;
    }

    setPaymentMethod(paymentMethod); // Set the payment method
    setOpenDialog(true);
  };

  return (
      <form className={styles.paymentForm}>
        <div className={styles.input}>
          <label htmlFor="card">Card Details</label>
          <div className={styles.cardElementContainer}>
            <CardElement className={styles.cardElement} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={handlePayClick}>
            Proceed to payment
          </button>
          <button type="button" className={styles.button} onClick={() => router.push(`/submissions/${id}`)}>Cancel</button>
        </div>
      </form>
  );
};

export default withAuth(Credits);