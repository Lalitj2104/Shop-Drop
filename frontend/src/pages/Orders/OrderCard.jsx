import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/OrderCard.css";

const OrderCard = ({ order }) => {
  if (!order) return null;
  const navigate=useNavigate();
  const buttonhandler=()=>{
      navigate(`/order/${order?._id}`);
  }
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-phone">
          <i className="fas fa-phone-alt"></i>
          <span>{order?.phoneNumber || "N/A"}</span>
        </div>
        <div>
          <strong>Order No:</strong> {order?._id || "Unknown"}
        </div>
      </div>
      <div className="order-info">
        <p>
          <strong>Placed On:</strong> {new Date(order?.createdAt).toISOString().split("T")[0] || "Unknown"}
        </p>
        <p>
          <strong>Amount:</strong> ₹{order?.totalAmount || "0"}
        </p>
        <p>
          <strong>Items Ordered:</strong> {order?.products?.length || "0"}
        </p>
        <p>
          <strong>Order Status:</strong> {order?.status || "Unknown"}
        </p>
        <p>
          <strong>Payment Status:</strong> {order?.paymentStatus || "Unknown"}
        </p>
      </div>
      <div className="order-actions">
        <button className="track-button">Track Order</button>
        <button onClick={buttonhandler} className="details-button">
          Order Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
