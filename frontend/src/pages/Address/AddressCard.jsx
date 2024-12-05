import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AddressCard.css";

const AddressCard = ({ address, onEdit, onRemove }) => {
  return (
    <div className="address-card">
      <div className="address-details">
        <p><strong>Name:</strong> {address.name}</p>
        <p><strong>Address:</strong> {address.address}</p>
        <p><strong>City:</strong> {address.city}</p>
        <p><strong>Pincode:</strong> {address.pincode}</p>
        <p><strong>Phone:</strong> {address.phone}</p>
        <p><strong>Delivery Instructions:</strong> {address.deliveryInstructions || "None"}</p>
      </div>
      <div className="address-actions">
        <button onClick={() => onEdit(address.id)} className="edit-button">Edit</button>
        <button onClick={() => onRemove(address.id)} className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default AddressCard;
