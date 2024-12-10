import React, { useEffect } from "react";
import "../../styles/Paymentsuccess.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/Actions/orderAction";

const PaymentSuccess=()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, message, error, cart} = useSelector(state => state.cartAuth);

  const{address} = useSelector(state => state.userAuth);

  const defaultAddress = address?.find((addr) => addr.isDefault);
	console.log("Address Array:", address); // Log the full address array
	console.log("Default Address:", defaultAddress); // Log the found default address

	const shippingAddress=defaultAddress?.house+", "+defaultAddress?.street+", "+defaultAddress?.area+", "+
		defaultAddress?.city+", " +defaultAddress?.state+", "+
		defaultAddress?.country+", "+defaultAddress?.postalCode

    const calculateTotal = () =>
      cart?.products?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(()=>{
    dispatch(addOrder("Paid", "Card", shippingAddress, calculateTotal()))
  })

  return (
    <div className="card-container">
      <div className="card">
        <div className="icon">
          <span>&#10004;</span>
        </div>
        <h1>Payment succeeded!</h1>
        <p>Thank you for processing your most recent payment.</p>
        <p><strong>Happy Shopping</strong>.</p>
        <button className="Home-btn" onClick={() => navigate('/')}>Your Home page</button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
