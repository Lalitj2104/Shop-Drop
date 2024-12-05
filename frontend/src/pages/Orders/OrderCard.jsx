import React from "react";
import { Link } from "react-router-dom";
import "../../styles/OrderCard.css";

const OrderCard = ({ order }) => {
  if (!order) return null;

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-phone">
          <i className="fas fa-phone-alt"></i>
          <span>{order.phone || "N/A"}</span>
        </div>
        <div>
          <strong>Order No:</strong> {order.orderNo || "Unknown"}
        </div>
      </div>
      <div className="order-info">
        <p>
          <strong>Placed On:</strong> {order.placedOn || "Unknown"}
        </p>
        <p>
          <strong>Amount:</strong> ₹{order.amount || "0"}
        </p>
        <p>
          <strong>Items Ordered:</strong> {order.itemsCount || "0"}
        </p>
        <p>
          <strong>Order Status:</strong> {order.orderStatus || "Unknown"}
        </p>
        <p>
          <strong>Payment Status:</strong> {order.paymentStatus || "Unknown"}
        </p>
      </div>
      <div className="order-actions">
        <button className="track-button">Track Order</button>
        <Link to={`/order/${order.orderNo}`} className="details-button">
          Order Details
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
