import React from 'react';
import "../../styles/Paymentfailure.css";

const PaymentFailure = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="icon">
          <span className="icon-text">!</span>
        </div>
        <h1 className="title">Payment Failed</h1>
        <p className="message">
          Hey there. We tried to charge your card but, something went wrong. Please update your payment method below to continue.
        </p>
        <button className="button">Update Payment Method</button>
        <button className="button">Redirect to cart</button>
        <p className="footer">
          Have a question? <a href="/contact-support" className="link">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;
