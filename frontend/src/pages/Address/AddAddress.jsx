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
	const [details, setDetails] = useState({
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

		setDetails({
			...details,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(details);
		dispatch(addUserAddress(details));
	};

	useEffect(() => {
		
		console.log(details);
		if (message) {
			// console.log(message);
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
		}
		if (error) {
			// console.log(error);
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [dispatch, message, error, isAuthenticated, navigate, details, id]);

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
										value={details.label}
										onChange={handleChange}
										required
									/>
									
								</div>
								<i>House/Apartment</i>
								<div className="inputBx">
                                
									<input
										type="text"
										name="house"
										value={details.house}
										onChange={handleChange}
										required
									/>
									
								</div>
                                <i>Street</i>
								<div className="inputBx">
									<input
										type="text"
										name="street"
										value={details.street}
										onChange={handleChange}
									/>
									
								</div>
								<i>Area/Colony</i>
								<div className="inputBx">
									<input
										type="text"
										name="area"
										value={details.area}
										onChange={handleChange}
									/>
									
								</div>
                                <i>City</i>
								<div className="inputBx">
									<input
										type="text"
										name="city"
										value={details.city}
										onChange={handleChange}
										required
									/>
									
								</div>
                                <i>State</i>
								<div className="inputBx">
									<input
										type="String"
										name="state"
										value={details.state}
										onChange={handleChange}
										required
									/>
								</div>
                                <i>Postal Code</i>
								<div className="inputBx">
									<input
										type="Number"
										name="postalCode"
										value={details.postalCode}
										onChange={handleChange}
										required
									/>
									
								</div>
                                <i>Country</i>
								<div className="inputBx">
									<input
										type="String"
										name="country"
										value={details.country}
										onChange={handleChange}
										required
									/>
									
								</div>
                                <i>Phone Number</i>
								<div className="inputBx">
									<input
										type="String"
										name="phoneNumber"
										value={details.phoneNumber}
										minLength={8}
										onChange={handleChange}
										required
									/>
									
								</div>
								
							</div>
							<div className="inputBx">
								<button type="submit" disabled={loading}>
									{loading === true ? (
										<span className="spinner"></span>
									) : (
										"Add"
									)}
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
