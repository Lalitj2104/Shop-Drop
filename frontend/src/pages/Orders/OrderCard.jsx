import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/OrderCard.css";

const OrderCard = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Order status options (enum from the schema)
  const orderStatusEnum = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Picked Up",
  ];

  // Determine the active step based on the order's current status
  const activeStep = orderStatusEnum.indexOf(order?.status);

  // Open modal when track order is clicked
  const handleTrackOrder = () => {
    setIsModalOpen(true); // Show modal
  };

  // Close modal when close button is clicked
  const handleCloseModal = () => {
    setIsModalOpen(false); // Hide modal
  };

  // Navigate to order details
  const handleOrderDetails = () => {
    navigate(`/order/${order?._id}`);
  };

  if (!order) return null;

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
          <strong>Placed On:</strong>{" "}
          {new Date(order?.createdAt).toISOString().split("T")[0] || "Unknown"}
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
        <button onClick={handleTrackOrder} className="track-button">
          Track Order
        </button>
        <button onClick={handleOrderDetails} className="details-button">
          Order Details
        </button>
      </div>

      {/* Modal for tracking order */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Track Your Order</h3>
            <div className="progress-bar">
              {orderStatusEnum.map((status, index) => (
                <div key={index} className="progress-segment">
                  <p className="status-label">{status}</p>
                  <div
                    className={`circle ${
                      index <= activeStep ? "completed" : "not-completed"
                    }`}
                  >
                    {index <= activeStep && "✔"}
                  </div>
                </div>
              ))}
              {/* Progress line */}
              <div
                className="progress-line"
                style={{
                  background: `linear-gradient(
                    to right,
                    green ${((activeStep + 1) / orderStatusEnum.length) * 100}%,
                    grey ${((activeStep + 1) / orderStatusEnum.length) * 100}%,
                    grey 100%
                  )`,
                }}
              ></div>
            </div>
            <button onClick={handleCloseModal} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
