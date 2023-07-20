import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/paymentResult.css';

const Success = () => {
  return (
    <>
      <div className="payment-container d-flex flex-column justify-content-center align-items-center">
        <h2>Thanks for your order!</h2>
        <h4>Your payment is successful.</h4>
        <p className="mt-2">
          We appreciate your business! If you have any questions, please email
          us at
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div className="mt-4">
          <Link className="button " to="/">
            Go to Home page
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
