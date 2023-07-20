import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/paymentResult.css';

function Cancel() {
  return (
    <div className="payment-container d-flex flex-column justify-content-center align-items-center">
      <h4>Oops! Your payment has been cancelled.</h4>
      <p className="mt-2">
        We appreciate your business! If you have any questions, please email us
        at <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
      <div className="mt-4">
        <Link className="button" to="/">
          Go to Home page
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
