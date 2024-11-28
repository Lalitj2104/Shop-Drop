import { useEffect, useState } from "react";
import "../../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, registerUser } from "../../redux/Actions/userActions";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const AddAddress = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [address, setAddress] = useState({
		label: "",
		street: "",
		city: "",
		state: "",
		postalCode: "",
		country: "",
		phoneNumber: "",
	});

	const { loading, message, error, id, isAuthenticated } = useSelector(
		(state) => state.userAuth
	);
	const handleChange = (e) => {
		const { name, value } = e.target;

		setAddress({
			...address,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(address);
		dispatch(addUserAddress(address));
	};

	useEffect(() => {
		console.log(address);
		if (message) {
			// console.log(message);
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate("/");
		}
		if (error) {
			// console.log(error);
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, isAuthenticated, navigate, address, id]);

	return (
		<section>
			<div className="signup-cont">
				<div className="signin">
					<div className="content">
						<h2>Add Address</h2>
						<form className="form" onSubmit={handleSubmit}>
							<div className="inputGrid">
								<i>Label</i>
								<div className="inputBx">
									<input
										type="text"
										name="label"
										value={address.label}
										onChange={handleChange}
										required
									/>
								</div>
								<i>House/Apartment</i>
								<div className="inputBx">
									<input
										type="text"
										name="house"
										value={address.house}
										onChange={handleChange}
										required
									/>
								</div>
								<i>Street</i>
								<div className="inputBx">
									<input
										type="text"
										name="street"
										value={address.street}
										onChange={handleChange}
									/>
								</div>
								<i>Area/Colony</i>
								<div className="inputBx">
									<input
										type="text"
										name="area"
										value={address.area}
										onChange={handleChange}
									/>
								</div>
								<i>City</i>
								<div className="inputBx">
									<input
										type="text"
										name="city"
										value={address.city}
										onChange={handleChange}
										required
									/>
								</div>
								<i>State</i>
								<div className="inputBx">
									<input
										type="String"
										name="state"
										value={address.state}
										onChange={handleChange}
										required
									/>
								</div>
								<i>Postal Code</i>
								<div className="inputBx">
									<input
										type="Number"
										name="postalCode"
										value={address.postalCode}
										onChange={handleChange}
										required
									/>
								</div>
								<i>Country</i>
								<div className="inputBx">
									<input
										type="String"
										name="country"
										value={address.country}
										onChange={handleChange}
										required
									/>
								</div>
								<i>Phone Number</i>
								<div className="inputBx">
									<input
										type="String"
										name="phoneNumber"
										value={address.phoneNumber}
										minLength={8}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div className="inputBx">
								<button type="submit" disabled={loading}>
									{loading === true ? <span className="spinner"></span> : "Add"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AddAddress;
