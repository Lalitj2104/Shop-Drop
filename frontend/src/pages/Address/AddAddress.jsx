import { useState, useEffect } from "react";
import "../../styles/AddAddress.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from ".././../constants/toast";
import { useNavigate } from "react-router-dom";
import { addUserAddress } from "../../redux/Actions/userActions";

const AddAddress = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [address, setAddress] = useState({
		label: "",
		house:"",
		street: "",
		area:"",
		city: "",
		state: "",
		postalCode: "",
		country: "",
		phoneNumber: "",
	});

	const { loading, message, error } = useSelector((state) => state.userAuth);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAddress({
			...address,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addUserAddress(address));
		navigate("/");
	};

	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate("/yourAddress");
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, navigate]);

	return (
		<div className="modal-overlay">
			<section>
				<div className="add-address-cont">
					<div className="add-address">
						<div className="content">
							<h2>Add Address</h2>
							<form className="form" onSubmit={handleSubmit}>
								<div className="inputGrid">
									<div className="inputBx">
										<input
											type="text"
											name="label"
											value={address.label}
											onChange={handleChange}
											required
										/>
										<i>Label</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="house"
											value={address.house}
											onChange={handleChange}
											required
										/>
										<i>House/Apartment</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="street"
											value={address.street}
											onChange={handleChange}
											required
										/>
										<i>Street</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="area"
											value={address.area}
											onChange={handleChange}
											required
										/>
										<i>Area/Colony</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="city"
											value={address.city}
											onChange={handleChange}
											required
										/>
										<i>City</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="state"
											value={address.state}
											onChange={handleChange}
											required
										/>
										<i>State</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="postalCode"
											value={address.postalCode}
											onChange={handleChange}
											required
										/>
										<i>Postal Code</i>
									</div>
									<div className="inputBx">
										<input
											type="text"
											name="country"
											value={address.country}
											onChange={handleChange}
											required
										/>
										<i>Country</i>
									</div>
									<div className="inputBx">
										<input
											type="tel"
											name="phoneNumber"
											value={address.phone}
											onChange={handleChange}
											required
										/>
										<i>Phone Number</i>
									</div>
								</div>

								<div className="inputBx">
									<button type="submit" disabled={loading}>
										{loading ? (
											<span className="spinner"></span>
										) : (
											"Add Address"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AddAddress;
