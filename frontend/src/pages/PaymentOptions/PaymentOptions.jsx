import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/PaymentOptions.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Paymentoptions = () => {
  const navigate = useNavigate(); 

  const handleEditPaymentClick = () => {
    navigate("/orders"); 
  };

  return (
    <>
      <Header />
      <div className="payment-options-container">
        <h2>Your Payment Options</h2>
        <p className="subtitle">
          An overview of your payment methods, settings, and subscriptions with Amazon.
        </p>
        <div className="info-box">
          <p>
            <i className="info-icon">ℹ️</i>
            As per new RBI guidelines, some of your saved cards may be removed. Please re-enter card details and save them.
            <a href="#" className="learn-more">Learn more</a>
          </p>
        </div>
        <div className="button-container">
          <button className="payment-button">Manage Kindle Payment Setting</button>
          <button
            className="payment-button"
            onClick={handleEditPaymentClick} 
          >
            Edit payment method for a current order
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Paymentoptions;
