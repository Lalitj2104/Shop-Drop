import { useEffect, useState } from "react";
import "../../../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";
import { registerRetailer } from "../../../redux/Actions/retailerActions";

const RetailerRegister = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [details, setDetails] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		dob: "",
		email: "",
		password: "",
		username: "",
		gender: "",
		mobile: "",
		gstNumber: "",
		companyName: "",
	});

	const { rloading, message, error, id, isRetailerAuthenticated } = useSelector(
		(state) => state.retailerAuth
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
		dispatch(registerRetailer(details));
	};

	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate(`/retailer/verify/${id}`);
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
		if (isRetailerAuthenticated) {
			navigate("/retailerDashboard");
		}
	}, [dispatch, message, error, isRetailerAuthenticated, navigate]);

	return (
		<section>
			<div className="register-cont">
				<div className="signin">
					<div className="content">
						<h2>Retailer Register</h2>
						<form className="form" onSubmit={handleSubmit}>
							<div className="inputGrid">
								<div className="inputBx">
									<input
										type="text"
										name="firstName"
										value={details.firstName}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>First Name</i>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="middleName"
										value={details.middleName}
										onChange={handleChange}
										placeholder=""
									/>
									<i>Middle Name</i>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="lastName"
										value={details.lastName}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Last Name</i>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="gstNumber"
										value={details.gstNumber}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>GST Number</i>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="companyName"
										value={details.companyName}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Company Name</i>
								</div>
								<div className="inputBx">
									<input
										type="date"
										name="dob"
										value={details.dob}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Date of Birth</i>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="username"
										value={details.username}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Username</i>
								</div>
								<div className="inputBx">
									<input
										type="email"
										name="email"
										value={details.email}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Email</i>
								</div>
								<div className="inputBx">
									<input
										type="password"
										name="password"
										value={details.password}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Password</i>
								</div>
								<div className="inputBx">
									<input
										type="number"
										name="mobile"
										value={details.mobile}
										onChange={handleChange}
										required
										placeholder=""
									/>
									<i>Mobile</i>
								</div>
								<div className="inputBx">
									<select
										className="gender-select"
										name="gender"
										value={details.gender}
										onChange={handleChange}
										required
										placeholder=""
									>
										<option value="" disabled>
											Gender
										</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>

							<div className="links">
								<Link to="/retailerLogin">Already have an account?</Link>
							</div>
							<div className="inputBx">
								<button type="submit" disabled={rloading}>
									{rloading === true ? (
										<span className="spinner"></span>
									) : (
										"Register"
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

export default RetailerRegister;
