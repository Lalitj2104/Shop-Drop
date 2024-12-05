import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddressCard from "./AddressCard"; // Import your AddressCard component
import "../../styles/AddressPage.css";
import staticAddresses from "../../data/staticAddresses"; // Static data

const AddressPage = () => {
  const [addresses, setAddresses] = useState(staticAddresses); // Static address data for now

  const handleEditAddress = (id) => {
    console.log(`Edit Address ID: ${id}`);
    // Logic to edit address
  };

  const handleRemoveAddress = (id) => {
    console.log(`Remove Address ID: ${id}`);
    // Logic to remove address
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
		<div className="address-page">
			<h1>Choose Your Location</h1>
			<p>
				Select a delivery location to see product availability and delivery
				options
			</p>

			<div className="address-container">
				<div className="address-grid">
					{addresses.length === 0 ? (
						<p>No addresses added. Add one below.</p>
					) : (
						addresses.map((address) => (
							<AddressCard
								key={address.id}
								address={address}
								onEdit={handleEditAddress}
								onRemove={handleRemoveAddress}
							/>
						))
					)}
				</div>

				{/* Add Address or Pickup-Point card */}
				<Link to="/AddAddress" className="add-address-card">
					<div className="add-address-content">
						<i className="fas fa-plus-circle"></i>
						<p>Add Address or Pickup-Point</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default AddressPage;
