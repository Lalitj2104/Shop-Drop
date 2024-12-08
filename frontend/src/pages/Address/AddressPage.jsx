import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard"; // Import your AddressCard component
import "../../styles/AddressPage.css";
import staticAddresses from "../../data/staticAddresses"; // Static data
import {  removeUserAddress, setUserDefaultAddress } from "../../redux/Actions/userActions";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const AddressPage = () => {
  const [addresses, setAddresses] = useState(staticAddresses); // Static address data for now

	const dispatch= useDispatch();
	const {user,message}=useSelector(state=>state.userAuth);

	useEffect(()=>{
		if(message){
			toast.success(message,toastOptions);
			dispatch("CLEAR_MESSAGE");
		}
	},[message])

  const handleEditAddress = (id) => {
    dispatch(setUserDefaultAddress(id))	
  }

  const handleRemoveAddress = (id) => {
    dispatch(removeUserAddress(id));
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
					{user?.address?.length === 0 ? (
						<p>No addresses added. Add one below.</p>
					) : (
						user?.address.map((address) => (
							<AddressCard
								key={address?._id}
								address={address}
								firstName={user?.firstName }
								lastName={user?.lastName}
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
