import { useEffect, useState } from "react";
import "../../../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/Actions/userActions";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";

const Register = () => {
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
		dispatch(registerUser(details));
	};

	useEffect(() => {
		if (isAuthenticated) {
			return navigate("/");
		}
		console.log(details);
		if (message) {
			// console.log(message);
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate(`/verify/${id}`);
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
						<h2>Register</h2>
						{details.avatar && (
							<div className="profile-picture-container">
								<img
									src={details.avatar}
									alt="Profile Picture"
									className="profile-picture"
								/>
							</div>
						)}
						<form className="form" onSubmit={handleSubmit}>
							<div className="inputGrid">
								<div className="inputBx">
									<input
										type="text"
										name="firstName"
										value={details.firstName}
										onChange={handleChange}
										required
									/>
									<i>First Name</i>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="middleName"
										value={details.middleName}
										onChange={handleChange}
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
									/>
									<i>Last Name</i>
								</div>
								<div className="inputBx">
									<input
										type="date"
										name="dob"
										value={details.dob}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="inputBx">
									<input
										type="text"
										name="username"
										value={details.username}
										onChange={handleChange}
										required
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
									/>
									<i>Email</i>
								</div>
								<div className="inputBx">
									<input
										type="password"
										name="password"
										value={details.password}
										minLength={8}
										onChange={handleChange}
										required
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
									>
										<option value="" disabled selected>
											Gender
										</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>

							<div className="links">
								<Link to="/login">Already have an account ?</Link>
							</div>
							<div className="inputBx">
								<button type="submit" disabled={loading}>
									{loading === true ? (
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

export default Register;
