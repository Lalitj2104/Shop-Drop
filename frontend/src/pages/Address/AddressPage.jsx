import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard";
import "../../styles/AddressPage.css";
import {
	removeUserAddress,
	setUserDefaultAddress,
} from "../../redux/Actions/userActions";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";
import Header from "../../components/Header/Header";

const AddressPage = () => {
	const dispatch = useDispatch();
	const { user, message } = useSelector((state) => state.userAuth);

	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
		}
	}, [message]);

	const handleEditAddress = (id) => {
		dispatch(setUserDefaultAddress(id));
	};

	const handleRemoveAddress = (id) => {
		dispatch(removeUserAddress(id));
	};

	return (
		<>
			<Header />
			<div className="address-page">
				<h1>Choose Your Location</h1>
				<p>
					Select a delivery location to see product availability and delivery
					options.
				</p>

				<div className="address-container">
					{user?.address?.length === 0 ? (
						<p className="no-address">No addresses added. Add one below.</p>
					) : (
						<div className="address-grid">
							{user?.address.map((address) => (
								<AddressCard
									key={address._id}
									address={address}
									firstName={user?.firstName}
									lastName={user?.lastName}
									onEdit={handleEditAddress}
									onRemove={handleRemoveAddress}
								/>
							))}
						</div>
					)}

					{/* Add Address or Pickup-Point card */}
					<Link to="/AddAddress" className="add-address-card">
						<i className="fas fa-plus-circle"></i>
						<span>Add Address or Pickup-Point</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default AddressPage;
