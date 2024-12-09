import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AddressCard.css";

const AddressCard = ({ firstName, lastName,address, onEdit, onRemove }) => {
  return (
    <div className="address-card">
      <div className="address-details">
        <p><strong>Name:</strong> {firstName} {lastName}</p>
        <p><strong>Address:</strong> {address?.house} {address?.street} {address?.area}</p>
        <p><strong>City:</strong> {address?.city}</p>
        <p><strong>State:</strong> {address?.state}</p>
        <p><strong>Pincode:</strong> {address?.postalCode}</p>
        <p><strong>Phone:</strong> {address?.phoneNumber}</p>
      </div>
      <div className="address-actions">
        <button onClick={() => onEdit(address._id)} className="edit-button">set default</button>
        <button onClick={() => onRemove(address._id)} className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default AddressCard;
