import React from "react";
import "../../styles/Paymentsuccess.css";

const PaymentSuccess=()=>{
  return (
    <div className="card-container">
      <div className="card">
        <div className="icon">
          <span>&#10004;</span>
        </div>
        <h1>Payment succeeded!</h1>
        <p>Thank you for processing your most recent payment.</p>
        <p><strong>Happy Shopping</strong>.</p>
        <button className="Home-btn">Your Home page</button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
